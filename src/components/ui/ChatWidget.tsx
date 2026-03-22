import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Loader2, Bot } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatWidgetProps {
  botId?: string;
}

const PRIMARY = '#0f766e';

export const ChatWidget: React.FC<ChatWidgetProps> = ({ botId = 'linky' }) => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [streaming, setStreaming] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  // Welcome message on first open
  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([
        {
          role: 'assistant',
          content: 'Bonjour ! Je suis l\'assistant Linky. Comment puis-je vous aider ?',
        },
      ]);
    }
  }, [open, messages.length]);

  // Scroll to bottom on new message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when opened
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300);
  }, [open]);

  const sendMessage = useCallback(async () => {
    const text = input.trim();
    if (!text || streaming) return;

    setInput('');
    const newMessages: Message[] = [...messages, { role: 'user', content: text }];
    setMessages(newMessages);
    setStreaming(true);

    // Placeholder while waiting
    setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const res = await fetch('/.netlify/functions/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ botId, messages: newMessages }),
        signal: controller.signal,
      });

      const json = await res.json();

      if (!res.ok || json.error) throw new Error(json.error ?? 'Erreur serveur');

      setMessages((prev) => {
        const updated = [...prev];
        const last = updated[updated.length - 1];
        if (last.role === 'assistant') {
          return [...updated.slice(0, -1), { ...last, content: json.text ?? '' }];
        }
        return updated;
      });
    } catch (err) {
      if ((err as Error).name !== 'AbortError') {
        setMessages((prev) => {
          const updated = [...prev];
          const last = updated[updated.length - 1];
          if (last.role === 'assistant' && last.content === '') {
            const msg = err instanceof Error ? err.message : 'Erreur inconnue';
            return [
              ...updated.slice(0, -1),
              { role: 'assistant', content: `[DEBUG] ${msg}` },
            ];
          }
          return updated;
        });
      }
    } finally {
      setStreaming(false);
      abortRef.current = null;
    }
  }, [input, messages, streaming, botId]);

  const handleKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleClose = () => {
    abortRef.current?.abort();
    setOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-4">
      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="w-[360px] max-w-[calc(100vw-3rem)] rounded-2xl shadow-2xl overflow-hidden flex flex-col bg-white"
            style={{ height: '520px', boxShadow: '0 24px 64px rgba(15,118,110,0.18), 0 0 0 1px rgba(15,118,110,0.08)' }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-4 py-3"
              style={{ background: `linear-gradient(135deg, #0f766e, #0e7490)` }}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <Bot size={16} className="text-white" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm leading-tight">Linky Assistant</p>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                    <span className="text-white/70 text-xs">En ligne</span>
                  </div>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="text-white/70 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
              {messages.map((msg, i) => (
                <MessageBubble key={i} message={msg} streaming={streaming && i === messages.length - 1} />
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="p-3 bg-white border-t border-gray-100">
              <div className="flex items-end gap-2 bg-gray-50 rounded-xl px-3 py-2 border border-gray-200 focus-within:border-teal-400 transition-colors">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  placeholder="Écrivez votre message…"
                  rows={1}
                  disabled={streaming}
                  className="flex-1 bg-transparent resize-none outline-none text-sm text-gray-800 placeholder:text-gray-400 max-h-28 leading-relaxed py-0.5"
                  style={{ minHeight: '24px' }}
                />
                <button
                  onClick={sendMessage}
                  disabled={!input.trim() || streaming}
                  className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all"
                  style={{
                    background: input.trim() && !streaming ? `linear-gradient(135deg, #0f766e, #0e7490)` : '#e5e7eb',
                    color: input.trim() && !streaming ? 'white' : '#9ca3af',
                  }}
                >
                  {streaming ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    <Send size={14} />
                  )}
                </button>
              </div>
              <p className="text-center text-gray-400 text-[10px] mt-1.5">
                Propulsé par <span className="text-teal-600 font-medium">Linky IA</span>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle bubble */}
      <motion.button
        onClick={() => setOpen((o) => !o)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 rounded-full shadow-lg flex items-center justify-center relative"
        style={{ background: `linear-gradient(135deg, #0f766e, #0e7490)` }}
        aria-label={open ? 'Fermer le chat' : 'Ouvrir le chat'}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <X size={22} className="text-white" />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <MessageCircle size={22} className="text-white" />
            </motion.div>
          )}
        </AnimatePresence>
        {/* Pulse ring */}
        {!open && (
          <span className="absolute inset-0 rounded-full animate-ping opacity-20"
            style={{ background: PRIMARY }} />
        )}
      </motion.button>
    </div>
  );
};

// ── Message bubble ────────────────────────────────────────────────────────────

interface BubbleProps {
  message: Message;
  streaming?: boolean;
}

const MessageBubble: React.FC<BubbleProps> = ({ message, streaming }) => {
  const isUser = message.role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
          isUser
            ? 'text-white rounded-br-sm'
            : 'bg-white text-gray-800 rounded-bl-sm shadow-sm border border-gray-100'
        }`}
        style={isUser ? { background: 'linear-gradient(135deg, #0f766e, #0e7490)' } : {}}
      >
        {message.content || (streaming && <TypingDots />)}
      </div>
    </motion.div>
  );
};

const TypingDots: React.FC = () => (
  <span className="flex items-center gap-1 h-4">
    {[0, 1, 2].map((i) => (
      <span
        key={i}
        className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce"
        style={{ animationDelay: `${i * 0.15}s` }}
      />
    ))}
  </span>
);

export default ChatWidget;
