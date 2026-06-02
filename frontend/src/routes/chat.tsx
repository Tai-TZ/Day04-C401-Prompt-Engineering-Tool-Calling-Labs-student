import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  ArrowUp,
  Mic,
  Paperclip,
  Sparkles,
  SquarePen,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/chat")({ component: ChatPage });

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

const suggestions = [
  "Summarize my agent activity today",
  "Help me write a system prompt",
  "Explain tool calling best practices",
  "Debug a failed tool invocation",
];

const mockReplies = [
  "I can help with that. Based on your OpenClaw setup, I'd start by reviewing the latest run logs and checking which tools were invoked.",
  "Here's a concise approach: define clear tool boundaries, keep the system prompt focused, and validate tool outputs before passing them back to the model.",
  "Tool calling works best when each tool has a single responsibility and the model receives explicit instructions on when to use it versus answering directly.",
];

function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const hasMessages = messages.length > 0;

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
  }, [input]);

  function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed || isTyping) return;

    const userMsg: Message = { id: crypto.randomUUID(), role: "user", content: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    window.setTimeout(() => {
      const reply = mockReplies[Math.floor(Math.random() * mockReplies.length)];
      setMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), role: "assistant", content: reply },
      ]);
      setIsTyping(false);
    }, 900);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    sendMessage(input);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh)]">
      <header className="shrink-0 flex items-center justify-between px-6 h-14 border-b border-border">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Sparkles className="size-4 text-primary" />
          <span className="text-foreground font-medium">OpenClaw Chat</span>
        </div>
        {hasMessages && (
          <button
            type="button"
            onClick={() => setMessages([])}
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <SquarePen className="size-3.5" />
            New chat
          </button>
        )}
      </header>

      <div ref={scrollRef} className="flex-1 overflow-y-auto">
        {!hasMessages ? (
          <div className="flex flex-col items-center justify-center min-h-full px-6 pb-32">
            <div className="max-w-2xl w-full text-center space-y-8">
              <div className="space-y-3">
                <h1 className="text-4xl sm:text-5xl font-normal tracking-tight bg-gradient-to-r from-primary via-foreground to-primary/70 bg-clip-text text-transparent">
                  Hello
                </h1>
                <p className="text-lg text-muted-foreground">What would you like to explore today?</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl mx-auto">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => sendMessage(s)}
                    className="text-left px-4 py-3.5 rounded-2xl border border-border bg-card/50 hover:bg-accent/60 text-sm text-foreground/90 transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-8">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  "flex gap-4",
                  msg.role === "user" ? "justify-end" : "justify-start",
                )}
              >
                {msg.role === "assistant" && (
                  <div className="size-8 shrink-0 rounded-full bg-primary/15 grid place-items-center text-primary mt-0.5">
                    <Sparkles className="size-4" />
                  </div>
                )}
                <div
                  className={cn(
                    "max-w-[85%] text-[15px] leading-relaxed",
                    msg.role === "user"
                      ? "rounded-3xl rounded-br-md bg-secondary px-4 py-3 text-foreground"
                      : "text-foreground/95 pt-1",
                  )}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-4">
                <div className="size-8 shrink-0 rounded-full bg-primary/15 grid place-items-center text-primary">
                  <Sparkles className="size-4" />
                </div>
                <div className="flex items-center gap-1 pt-2">
                  <span className="size-2 rounded-full bg-muted-foreground/60 animate-bounce [animation-delay:0ms]" />
                  <span className="size-2 rounded-full bg-muted-foreground/60 animate-bounce [animation-delay:150ms]" />
                  <span className="size-2 rounded-full bg-muted-foreground/60 animate-bounce [animation-delay:300ms]" />
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="shrink-0 px-4 sm:px-6 pb-6 pt-2">
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
          <div className="relative flex items-end gap-2 rounded-3xl border border-border bg-card shadow-lg shadow-black/20 px-2 py-2 focus-within:border-primary/40 focus-within:ring-1 focus-within:ring-primary/20 transition-all">
            <button
              type="button"
              className="shrink-0 size-10 grid place-items-center rounded-full text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              aria-label="Attach file"
            >
              <Paperclip className="size-5" />
            </button>
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask OpenClaw anything..."
              rows={1}
              className="flex-1 resize-none bg-transparent py-2.5 text-[15px] placeholder:text-muted-foreground focus:outline-none min-h-[44px] max-h-40"
            />
            <button
              type="button"
              className="shrink-0 size-10 grid place-items-center rounded-full text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              aria-label="Voice input"
            >
              <Mic className="size-5" />
            </button>
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className={cn(
                "shrink-0 size-10 grid place-items-center rounded-full transition-colors",
                input.trim() && !isTyping
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "bg-muted text-muted-foreground cursor-not-allowed",
              )}
              aria-label="Send message"
            >
              <ArrowUp className="size-5" />
            </button>
          </div>
          <p className="text-center text-[11px] text-muted-foreground mt-3">
            OpenClaw can make mistakes. Verify important information.
          </p>
        </form>
      </div>
    </div>
  );
}
