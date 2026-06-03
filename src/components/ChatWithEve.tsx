"use client";

import { useEffect, useRef, useState } from "react";

type Status = "single" | "couple";
type Partner = {
  name?: string;
  nickname?: string;
  interests?: string[];
  vibe?: string;
  budget?: number;
};

type Message = {
  role: "user" | "assistant";
  content: string;
};

type ChatWithEveProps = {
  status: Status | null;
  partner: Partner | null;
};

const SUGGESTED_QUESTIONS = [
  "Une idée de 1ère date pas trop intime",
  "Quelque chose pour notre anniversaire en hiver",
  "Une sortie casual pour cette fin de semaine",
  "Une date romantique sous $100",
];

export function ChatWithEve({ status, partner }: ChatWithEveProps) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, streaming]);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || streaming) return;

    const userMsg: Message = { role: "user", content: text.trim() };
    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setInput("");
    setStreaming(true);

    // Add placeholder for assistant message
    setMessages([...nextMessages, { role: "assistant", content: "" }]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages,
          context: { status, partner },
        }),
      });

      if (!res.ok || !res.body) {
        throw new Error(`HTTP ${res.status}`);
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        accumulated += decoder.decode(value, { stream: true });
        setMessages([
          ...nextMessages,
          { role: "assistant", content: accumulated },
        ]);
      }
    } catch (err) {
      console.error("Chat error:", err);
      setMessages([
        ...nextMessages,
        {
          role: "assistant",
          content: "Désolée, j'ai un souci pour répondre. Réessaye dans un instant ✨",
        },
      ]);
    } finally {
      setStreaming(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(true)}
        className={`fixed bottom-6 right-6 z-40 flex items-center gap-3 bg-rose text-white pl-5 pr-6 py-4 rounded-full text-[11px] font-bold tracking-[0.2em] uppercase shadow-[0_12px_32px_rgba(200,114,90,0.35)] hover:bg-deep-rose hover:-translate-y-0.5 transition-all cursor-pointer ${
          open ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
        aria-label="Discuter avec Eve"
      >
        <span className="text-[18px]">💬</span>
        Demander à Eve
      </button>

      {/* Backdrop */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-charcoal/30 backdrop-blur-sm animate-fadeIn"
          aria-hidden
        />
      )}

      {/* Drawer */}
      <aside
        className={`fixed top-0 right-0 bottom-0 z-50 w-full sm:w-[440px] bg-cream flex flex-col shadow-[-12px_0_40px_rgba(0,0,0,0.15)] transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-5 border-b border-rose/10">
          <div>
            <div className="font-script text-[40px] text-charcoal leading-none">
              Eve
            </div>
            <p className="text-[9px] tracking-[0.2em] text-muted mt-0.5">
              Ta concierge dates
            </p>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-rose/10 text-rose hover:bg-rose hover:text-white transition-colors cursor-pointer"
            aria-label="Fermer"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M1 1L13 13M13 1L1 13"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </header>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-6 space-y-4">
          {messages.length === 0 ? (
            <div className="text-center py-8">
              <p className="font-script text-rose text-[40px] mb-2 leading-none">
                Salut ✨
              </p>
              <p className="text-[10px] tracking-[0.16em] text-muted leading-[1.8] mb-8 px-4">
                Demande-moi des idées de dates, des conseils pour une occasion spéciale, ou aide pour choisir dans ta liste.
              </p>
              <div className="flex flex-col gap-2 px-2">
                {SUGGESTED_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    className="text-left text-[11px] tracking-[0.08em] text-charcoal bg-warm-white hover:bg-light-gold/40 border border-rose/15 hover:border-rose/40 rounded-2xl px-4 py-3 transition-all normal-case"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-[12px] leading-[1.65] tracking-[0.02em] normal-case whitespace-pre-wrap ${
                    msg.role === "user"
                      ? "bg-rose text-white"
                      : "bg-warm-white text-charcoal border border-rose/10"
                  }`}
                >
                  {msg.content || (
                    <span className="inline-flex gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose animate-pulse" />
                      <span
                        className="w-1.5 h-1.5 rounded-full bg-rose animate-pulse"
                        style={{ animationDelay: "0.2s" }}
                      />
                      <span
                        className="w-1.5 h-1.5 rounded-full bg-rose animate-pulse"
                        style={{ animationDelay: "0.4s" }}
                      />
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Input */}
        <form
          onSubmit={handleSubmit}
          className="border-t border-rose/10 bg-warm-white p-4"
        >
          <div className="flex items-end gap-2">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Écris ta question..."
              disabled={streaming}
              rows={1}
              className="flex-1 resize-none px-4 py-3 border border-rose/20 rounded-2xl text-[12px] tracking-[0.04em] text-charcoal bg-cream outline-none focus:border-rose transition-colors placeholder:text-muted/50 normal-case disabled:opacity-50 max-h-32"
              style={{ minHeight: "44px" }}
            />
            <button
              type="submit"
              disabled={!input.trim() || streaming}
              className="w-11 h-11 flex items-center justify-center bg-rose text-white rounded-full hover:bg-deep-rose disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer shrink-0"
              aria-label="Envoyer"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M14 2L2 8L7 9.5L9.5 14L14 2Z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </form>
      </aside>
    </>
  );
}
