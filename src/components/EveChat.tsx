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

type EveChatProps = {
  status: Status | null;
  partner: Partner | null;
};

const SUGGESTIONS_SINGLE = [
  "Une 1ère date pas trop intime",
  "Une activité originale pour briser la glace",
  "Une sortie casual ce week-end",
  "Une 2ème date qui sort de l'ordinaire",
];

const SUGGESTIONS_COUPLE = [
  "Une date romantique pour notre anniversaire",
  "Quelque chose pour la St-Valentin",
  "Une escapade weekend en automne",
  "Une date originale sous $100",
];

export function EveChat({ status, partner }: EveChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const suggestions =
    status === "couple" ? SUGGESTIONS_COUPLE : SUGGESTIONS_SINGLE;

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, streaming]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 160)}px`;
    }
  }, [input]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || streaming) return;

    const userMsg: Message = { role: "user", content: text.trim() };
    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setInput("");
    setStreaming(true);

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
          content:
            "Désolée, j'ai un souci pour répondre. Réessaye dans un instant ✨",
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

  const isEmpty = messages.length === 0;

  return (
    <section className="mb-14">
      <div className="max-w-[780px] mx-auto">
        <div className="bg-warm-white border border-rose/15 rounded-[28px] overflow-hidden shadow-[0_8px_32px_rgba(200,114,90,0.08)] relative">
          {/* Reset conversation button */}
          {!isEmpty && (
            <button
              onClick={() => setMessages([])}
              className="absolute top-5 right-6 z-10 text-[9px] tracking-[0.22em] text-muted hover:text-rose transition-colors cursor-pointer"
            >
              ↺ Nouvelle conversation
            </button>
          )}

          {/* Empty state header */}
          {isEmpty && (
            <div className="px-8 pt-12 pb-2 text-center">
              <div className="font-script text-[68px] sm:text-[84px] text-rose mb-2 leading-none">
                Eve
              </div>
              <p className="text-[11px] tracking-[0.22em] text-muted mb-10 leading-[1.8]">
                Décris-moi ce que tu cherches, je m&apos;occupe du reste
              </p>
            </div>
          )}

          {/* Messages */}
          {!isEmpty && (
            <div
              ref={scrollRef}
              className="px-5 sm:px-7 py-7 max-h-[60vh] overflow-y-auto space-y-4"
            >
              {messages.map((msg, i) => (
                <ChatBubble
                  key={i}
                  message={msg}
                  isStreaming={streaming && i === messages.length - 1}
                />
              ))}
            </div>
          )}

          {/* Input */}
          <div className="border-t border-rose/10 bg-cream p-4">
            <form onSubmit={handleSubmit}>
              <div className="flex items-end gap-3">
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Demande à Eve..."
                  disabled={streaming}
                  rows={1}
                  className="flex-1 resize-none px-5 py-3.5 border border-rose/20 rounded-2xl text-[13px] tracking-[0.02em] text-charcoal bg-warm-white outline-none focus:border-rose transition-colors placeholder:text-muted/50 normal-case disabled:opacity-50 overflow-y-auto"
                  style={{ minHeight: "48px", maxHeight: "160px" }}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || streaming}
                  className="w-12 h-12 flex items-center justify-center bg-rose text-white rounded-2xl hover:bg-deep-rose disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer shrink-0"
                  aria-label="Envoyer"
                >
                  <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
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
          </div>

          {/* Suggestions in empty state */}
          {isEmpty && (
            <div className="px-7 pb-8 pt-2">
              <p className="text-[9px] tracking-[0.28em] text-muted mb-4 text-center">
                Suggestions
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => sendMessage(s)}
                    className="text-left text-[11px] tracking-[0.04em] text-charcoal bg-cream hover:bg-light-gold/40 border border-rose/15 hover:border-rose/40 rounded-2xl px-4 py-3 transition-all normal-case leading-[1.5]"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* No-account hint */}
        {isEmpty && (
          <p className="text-center text-[9px] tracking-[0.22em] text-muted mt-5 leading-[1.7]">
            Aucun compte requis · Les conversations ne sont pas sauvegardées sans compte
          </p>
        )}
      </div>
    </section>
  );
}

function ChatBubble({
  message,
  isStreaming,
}: {
  message: Message;
  isStreaming: boolean;
}) {
  const isUser = message.role === "user";

  if (isUser) {
    return (
      <div className="flex justify-end">
        <div className="max-w-[80%] rounded-2xl rounded-tr-md px-4 py-3 text-[12.5px] leading-[1.6] tracking-[0.01em] normal-case whitespace-pre-wrap bg-rose text-white">
          {message.content}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-3">
      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-rose to-deep-rose flex items-center justify-center text-white text-[14px] font-script shrink-0 mt-1">
        E
      </div>
      <div className="flex-1 text-[12.5px] leading-[1.7] tracking-[0.01em] normal-case whitespace-pre-wrap text-charcoal pt-1.5">
        {message.content || (
          <span className="inline-flex gap-1.5 items-center">
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
        {message.content && isStreaming && (
          <span className="inline-block w-0.5 h-3.5 bg-rose ml-0.5 align-middle animate-pulse" />
        )}
      </div>
    </div>
  );
}
