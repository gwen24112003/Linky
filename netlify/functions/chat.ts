import type { Handler, HandlerEvent } from "@netlify/functions";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface RequestBody {
  botId: string;
  messages: Message[];
}

// Bot configs (provider + system prompt)
const BOTS: Record<string, { systemPrompt: string; provider: "ollama" | "claude" | "openai"; model: string }> = {
  linky: {
    provider: "ollama",
    model: process.env.OLLAMA_MODEL ?? "qwen2.5:7b",
    systemPrompt: `Tu es l'assistant virtuel de Linky, un cabinet de conseil spécialisé en organisation, processus et transformation digitale pour les PME et ETI françaises.

Ton rôle est d'informer les visiteurs du site sur les services de Linky, répondre aux questions fréquentes, qualifier les besoins, et orienter vers un contact humain si nécessaire.

## À propos de Linky
Linky accompagne les entrepreneurs et dirigeants dans la structuration et l'optimisation de leur activité. Le cabinet est fondé par Enzo Monnier et Gwendoline Vanelle, deux consultants seniors passionnés par la performance opérationnelle.

## Services proposés
1. **Diagnostic & Stratégie** — Audit complet de l'organisation, identification des freins à la croissance, feuille de route prioritaire.
2. **Optimisation des Processus** — Cartographie et refonte des workflows, automatisation des tâches répétitives, mise en place d'outils adaptés.
3. **Accompagnement Long Terme** — Partenariat mensuel avec suivi régulier, pilotage des actions et adaptation continue.

## Réseau d'experts
Linky dispose d'un réseau de +50 experts certifiés disponibles pour des missions ponctuelles ou longues durées.

## Comportement
- Réponds toujours en français, avec un ton professionnel mais chaleureux.
- Sois concis : préfère 2-3 phrases percutantes à un long paragraphe.
- Si le visiteur est intéressé, guide-le vers /contact ou /experts-contact.
- Ne donne jamais de tarifs précis — invite à prendre contact.
- Si tu ne sais pas quelque chose, dis-le honnêtement.`,
  },
};

// ── Ollama streaming via fetch ─────────────────────────────────────────────

async function streamOllama(
  messages: Message[],
  systemPrompt: string,
  model: string
): Promise<ReadableStream<Uint8Array>> {
  const ollamaUrl = process.env.OLLAMA_URL ?? "http://localhost:11434";

  const res = await fetch(`${ollamaUrl}/v1/chat/completions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model,
      stream: true,
      messages: [
        { role: "system", content: systemPrompt },
        ...messages.map((m) => ({ role: m.role, content: m.content })),
      ],
    }),
  });

  if (!res.ok || !res.body) {
    throw new Error(`Ollama error: ${res.status}`);
  }

  return res.body;
}

// ── Claude streaming via fetch (no SDK dep needed) ────────────────────────

async function streamClaude(
  messages: Message[],
  systemPrompt: string,
  model: string
): Promise<ReadableStream<Uint8Array>> {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY ?? "",
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model,
      max_tokens: 1024,
      stream: true,
      system: systemPrompt,
      messages: messages.map((m) => ({ role: m.role, content: m.content })),
    }),
  });

  if (!res.ok || !res.body) {
    throw new Error(`Claude error: ${res.status}`);
  }

  return res.body;
}

// ── Pipe upstream SSE → our SSE format ───────────────────────────────────

async function pipeToSSE(
  upstream: ReadableStream<Uint8Array>,
  provider: "ollama" | "claude" | "openai"
): Promise<string> {
  const reader = upstream.getReader();
  const decoder = new TextDecoder();
  let result = "";
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";

    for (const line of lines) {
      if (!line.startsWith("data: ")) continue;
      const data = line.slice(6).trim();
      if (data === "[DONE]") continue;

      try {
        const json = JSON.parse(data);
        let text = "";

        if (provider === "claude") {
          // Anthropic SSE format
          if (json.type === "content_block_delta" && json.delta?.type === "text_delta") {
            text = json.delta.text ?? "";
          }
        } else {
          // OpenAI-compatible (Ollama, OpenAI)
          text = json.choices?.[0]?.delta?.content ?? "";
        }

        if (text) result += text;
      } catch {
        // skip malformed
      }
    }
  }

  return result;
}

// ── Netlify Handler ───────────────────────────────────────────────────────

export const handler: Handler = async (event: HandlerEvent) => {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers: corsHeaders, body: "" };
  }

  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers: corsHeaders, body: "Method Not Allowed" };
  }

  let body: RequestBody;
  try {
    body = JSON.parse(event.body ?? "{}");
  } catch {
    return { statusCode: 400, headers: corsHeaders, body: JSON.stringify({ error: "Invalid JSON" }) };
  }

  const { botId, messages } = body;

  if (!botId || !Array.isArray(messages)) {
    return { statusCode: 400, headers: corsHeaders, body: JSON.stringify({ error: "Missing botId or messages" }) };
  }

  const config = BOTS[botId];
  if (!config) {
    return { statusCode: 404, headers: corsHeaders, body: JSON.stringify({ error: "Bot not found" }) };
  }

  try {
    const trimmed = messages.slice(-20);
    let upstream: ReadableStream<Uint8Array>;

    if (config.provider === "claude") {
      upstream = await streamClaude(trimmed, config.systemPrompt, config.model);
    } else {
      // ollama or openai compatible
      upstream = await streamOllama(trimmed, config.systemPrompt, config.model);
    }

    const text = await pipeToSSE(upstream, config.provider);

    // Return the full response (Netlify Functions don't support streaming responses)
    return {
      statusCode: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Chat error:", message);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ error: message }),
    };
  }
};
