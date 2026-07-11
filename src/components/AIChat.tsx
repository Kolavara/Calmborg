"use client";

import {
  useState,
  useRef,
  useEffect,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import {
  Bot,
  Send,
  X,
  Sparkles,
  User,
  Loader,
  AlertCircle,
  MessageSquare,
} from "lucide-react";

/* ─── Types ─── */
interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

/* ─── Typing dots animation ─── */
function TypingIndicator() {
  return (
    <div className="flex items-start gap-2 sm:gap-3 px-3 sm:px-5 py-1.5 sm:py-3">
      <div className="flex h-6 w-6 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--accent)] shadow-[0_0_8px_rgba(255,71,87,0.4)]">
        <Bot size={12} className="sm:size-[16px] text-white" />
      </div>
      <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-sm bg-[var(--muted)] px-3 sm:px-4 py-2 sm:py-3 shadow-[inset_1px_1px_2px_rgba(0,0,0,0.05)]">
        <span className="h-2 w-2 animate-bounce rounded-full bg-[var(--text-muted)] [animation-delay:0ms]" />
        <span className="h-2 w-2 animate-bounce rounded-full bg-[var(--text-muted)] [animation-delay:150ms]" />
        <span className="h-2 w-2 animate-bounce rounded-full bg-[var(--text-muted)] [animation-delay:300ms]" />
      </div>
    </div>
  );
}

/* ─── Suggestion chips ─── */
const suggestions = [
  "What end mill do you recommend for machining aluminum?",
  "I need a tool holder for high-speed machining on a VMC",
  "Best tapping solution for stainless steel?",
  "What inserts do you have for hardened steel dies?",
];

/* ─── Main Chat Panel ─── */
export default function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Focus input when panel opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  // Parse streaming response from the API
  async function sendMessage(content: string) {
    if (!content.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: "user", content: content.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setError(null);
    setShowSuggestions(false);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || `Request failed (${res.status})`);
      }

      // Read the stream
      const reader = res.body?.getReader();
      if (!reader) throw new Error("No response stream");

      const decoder = new TextDecoder();
      let assistantContent = "";
      let buffer = "";

      // Add the assistant message placeholder
      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed || trimmed === "data: [DONE]") continue;
          if (!trimmed.startsWith("data: ")) continue;

          try {
            const json = JSON.parse(trimmed.slice(6));
            const delta = json.choices?.[0]?.delta?.content;
            if (delta) {
              assistantContent += delta;
              setMessages((prev) => {
                const updated = [...prev];
                if (updated[updated.length - 1]?.role === "assistant") {
                  updated[updated.length - 1] = {
                    role: "assistant",
                    content: assistantContent,
                  };
                }
                return updated;
              });
            }
          } catch {
            // Skip malformed JSON chunks
          }
        }
      }
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong";
      setError(message);
      // Remove empty assistant message and add error message
      setMessages((prev) => {
        const filtered = prev.filter(
          (m) => !(m.role === "assistant" && m.content === ""),
        );
        return [
          ...filtered,
          {
            role: "assistant",
            content: `⚠️ ${message}\n\nMake sure your **GROQ_API_KEY** environment variable is set in the \`.env.local\` file. Get a free key at [console.groq.com](https://console.groq.com/keys).`,
          },
        ];
      });
    } finally {
      setIsLoading(false);
    }
  }

  function handleSubmit(e?: FormEvent) {
    e?.preventDefault();
    sendMessage(input);
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  }

  /* ─── Render ─── */
  return (
    <>
      {/* Floating AI Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`group relative flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold uppercase tracking-wider transition-all duration-200 ${
          isOpen
            ? "bg-[var(--accent)] text-white shadow-[2px_2px_6px_rgba(255,71,87,0.3)]"
            : "bg-gradient-to-r from-[var(--dark-bg)] to-[#1a1a2e] text-white shadow-[3px_3px_8px_rgba(0,0,0,0.25)] hover:shadow-[4px_4px_12px_rgba(255,71,87,0.3)] hover:-translate-y-[1px]"
        }`}
        aria-label={isOpen ? "Close AI assistant" : "Open AI assistant"}
      >
        {/* Pulsing dot */}
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
        </span>

        {isOpen ? (
          <>
            <X size={16} />
            <span className="hidden sm:inline whitespace-nowrap">Close</span>
          </>
        ) : (
          <>
            <Bot size={18} className="text-[var(--accent)]" />
            <span className="hidden sm:inline whitespace-nowrap">AI Assistant</span>
            <Sparkles size={14} className="text-yellow-400" />
          </>
        )}
      </button>

      {/* Chat Panel Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-[2px]"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Chat Panel */}
      <div
        className={`fixed bottom-0 right-0 z-50 flex w-full flex-col bg-[var(--background)] shadow-[-8px_0_32px_rgba(0,0,0,0.15)] transition-all duration-300 sm:bottom-6 sm:right-6 sm:w-[420px] sm:rounded-2xl sm:border sm:border-[var(--border-light)]/20 sm:!h-auto sm:!max-h-[85vh] ${
          isOpen
            ? "translate-y-0 opacity-100 sm:translate-x-0"
            : "pointer-events-none translate-y-4 opacity-0 sm:translate-y-8"
        }`}
        style={{ maxHeight: isOpen ? "100dvh" : "0" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Header ── */}
        <div className="flex items-center justify-between rounded-t-2xl bg-[var(--dark-bg)] px-4 py-3 sm:px-5 sm:py-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-[var(--accent)] shadow-[0_0_12px_rgba(255,71,87,0.4)]">
              <Bot size={16} className="sm:size-[20px] text-white" />
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-white">AI Assistant</h3>
              <p className="flex items-center gap-1.5 font-mono text-[10px] sm:text-[11px] text-green-400">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                </span>
                Online
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg bg-white/5 text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
          >
            <X size={14} className="sm:size-[16px]" />
          </button>
        </div>

        {/* ── Messages ── */}
        <div className="flex-1 overflow-y-auto" style={{ maxHeight: "calc(100dvh - 140px)" }}>
          {messages.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center px-4 sm:px-6 py-8 sm:py-12 text-center">
              <div className="mb-4 flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-2xl bg-[var(--dark-bg)] shadow-[var(--shadow-card)]">
                <MessageSquare
                  size={20}
                  className="sm:size-[28px] text-[var(--accent)]"
                />
              </div>
              <h4 className="mb-2 text-sm sm:text-base font-bold text-[var(--foreground)]">
                Need Tooling Advice?
              </h4>
              <p className="mb-6 max-w-xs text-[12px] sm:text-[13px] leading-relaxed text-[var(--text-muted)]">
                Ask me anything about cutting tools, tool holders, inserts, or
                machining best practices.
              </p>

              {/* Suggestion chips */}
              <div className="flex flex-wrap justify-center gap-2">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => sendMessage(s)}
                    className="rounded-xl bg-[var(--muted)] px-3 py-2 sm:px-4 sm:py-2.5 text-[11px] sm:text-[12px] text-[var(--text-muted)] shadow-[var(--shadow-card)] transition-all hover:bg-[var(--accent)] hover:text-white hover:shadow-[0_0_12px_rgba(255,71,87,0.3)]"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-1 py-3 sm:py-4">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-2 sm:gap-3 px-3 sm:px-5 py-1.5 sm:py-2 ${
                    msg.role === "user" ? "flex-row-reverse" : ""
                  }`}
                >
                  {/* Avatar */}
                  <div
                    className={`flex h-6 w-6 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-lg ${
                      msg.role === "user"
                        ? "bg-[var(--dark-bg)]"
                        : "bg-[var(--accent)] shadow-[0_0_8px_rgba(255,71,87,0.4)]"
                    }`}
                  >
                    {msg.role === "user" ? (
                      <User size={12} className="sm:size-[16px] text-white" />
                    ) : (
                      <Bot size={12} className="sm:size-[16px] text-white" />
                    )}
                  </div>

                  {/* Bubble */}
                  <div
                    className={`max-w-[85%] rounded-2xl px-3 py-2 sm:px-4 sm:py-2.5 text-[13px] sm:text-[14px] leading-relaxed ${
                      msg.role === "user"
                        ? "rounded-tr-sm bg-[var(--dark-bg)] text-white shadow-[2px_2px_6px_rgba(0,0,0,0.2)]"
                        : "rounded-tl-sm bg-[var(--muted)] text-[var(--foreground)] shadow-[inset_1px_1px_2px_rgba(255,255,255,0.5)]"
                    }`}
                  >
                    {msg.role === "assistant" ? (
                      <div className="prose prose-sm max-w-none prose-a:text-[var(--accent)]">
                        {formatResponse(msg.content)}
                      </div>
                    ) : (
                      <p className="text-[13px] sm:text-[14px]">{msg.content}</p>
                    )}
                  </div>
                </div>
              ))}

              {isLoading && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* ── Error banner ── */}
        {error && !isLoading && (
          <div className="mx-4 sm:mx-5 mb-2 flex items-center gap-2 rounded-xl bg-red-500/10 px-3 py-2 sm:px-4 sm:py-2.5 text-[11px] sm:text-[12px] text-red-600">
            <AlertCircle size={12} className="sm:size-[14px] shrink-0" />
            <span>
              Connection issue. Check your API key or try again.
            </span>
          </div>
        )}

        {/* ── Input ── */}
        <div className="border-t border-[var(--border-dark)]/10 px-3 py-3 sm:px-4 sm:py-4">
          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <div className="relative flex-1">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about tooling..."
                disabled={isLoading}
                className="w-full rounded-xl border border-[var(--border-dark)]/20 bg-[var(--panel)] px-3 py-2.5 sm:px-4 sm:py-3 pr-8 sm:pr-10 text-[13px] sm:text-[14px] text-[var(--foreground)] placeholder:text-[var(--text-muted)] shadow-[inset_2px_2px_4px_rgba(0,0,0,0.05)] outline-none transition-all focus:border-[var(--accent)]/50 focus:ring-2 focus:ring-[var(--accent)]/20 disabled:opacity-50"
              />
            </div>
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--accent)] text-white shadow-[2px_2px_6px_rgba(255,71,87,0.3)] transition-all hover:bg-[var(--accent-hover)] disabled:cursor-not-allowed disabled:opacity-40"
            >
              {isLoading ? (
                <Loader size={16} className="sm:size-[18px] animate-spin" />
              ) : (
                <Send size={16} className="sm:size-[18px]" />
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

/* ─── Simple markdown formatter ─── */
function formatResponse(text: string): React.ReactNode {
  // Split by bold markers **text**
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-bold text-[var(--foreground)]">
          {part.slice(2, -2)}
        </strong>
      );
    }
    // Split by line breaks
    return (
      <span key={i}>
        {part.split("\n").map((line, j) => (
          <span key={j}>
            {j > 0 && <br />}
            {line}
          </span>
        ))}
      </span>
    );
  });
}
