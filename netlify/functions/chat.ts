import type { Handler, HandlerEvent } from "@netlify/functions";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface RequestBody {
  botId: string;
  messages: Message[];
}

const SYSTEM_PROMPT = `Tu es l'assistant virtuel de Linky, un cabinet de conseil spécialisé en organisation, processus et transformation digitale pour les PME et ETI françaises.

Ton rôle est d'informer les visiteurs du site sur les services de Linky, répondre aux questions fréquentes, qualifier les besoins, et orienter vers un contact humain si nécessaire.

À propos de Linky : Linky accompagne les entrepreneurs et dirigeants dans la structuration et l'optimisation de leur activité. Fondé par Enzo Monnier et Gwendoline Vanelle.

Services : Diagnostic & Stratégie, Optimisation des Processus, Accompagnement Long Terme.

Règles : réponds toujours en français, sois concis (2-3 phrases max), redirige vers /contact pour les devis, ne donne jamais de tarifs précis.`;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

export const handler: Handler = async (event: HandlerEvent) => {
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

  if (botId !== "linky") {
    return { statusCode: 404, headers: corsHeaders, body: JSON.stringify({ error: "Bot not found" }) };
  }

  const ollamaUrl = process.env.OLLAMA_URL ?? "http://localhost:11434";
  const apiKey = process.env.OLLAMA_API_KEY;
  const model = process.env.OLLAMA_MODEL ?? "llama3.2";

  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (apiKey) headers["Authorization"] = `Bearer ${apiKey}`;

  try {
    const res = await fetch(`${ollamaUrl}/v1/chat/completions`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        model,
        stream: false,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages.slice(-20).map((m) => ({ role: m.role, content: m.content })),
        ],
      }),
    });

    const raw = await res.text();

    if (!res.ok) {
      console.error("Ollama error:", res.status, raw);
      return {
        statusCode: 500,
        headers: corsHeaders,
        body: JSON.stringify({ error: `Ollama ${res.status}: ${raw.slice(0, 200)}` }),
      };
    }

    const json = JSON.parse(raw);
    const text = json.choices?.[0]?.message?.content ?? "";

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
