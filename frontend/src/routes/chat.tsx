import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Sparkles, SquarePen } from "lucide-react";
import { cn } from "@/lib/utils";
import { PromptInputBox } from "@/components/ui/ai-prompt-box";
import { getChat, sendChatMessage } from "@/lib/chat/chat.functions";
import type { ChatRound, Conversation } from "@/lib/chat/types";
import { z } from "zod";
import { ToolRounds } from "@/components/chat/ToolRounds";

export const Route = createFileRoute("/chat")({
  validateSearch: z.object({ cid: z.string().optional() }),
  component: ChatPage,
});

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  rounds?: ChatRound[];
};

const suggestions = [
  "Summarize my agent activity today",
  "Help me write a system prompt",
  "Explain tool calling best practices",
  "Debug a failed tool invocation",
];

function ChatPage() {
  const { cid } = Route.useSearch();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const hasMessages = messages.length > 0;

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isTyping]);

  function streamAssistantMessage(messageId: string, fullText: string, rounds?: ChatRound[]) {
    const text = fullText ?? "";
    const chunkSize = 18;
    let i = 0;
    const timer = window.setInterval(() => {
      i = Math.min(text.length, i + chunkSize);
      const partial = text.slice(0, i);
      setMessages((prev) =>
        prev.map((m) => (m.id === messageId ? { ...m, content: partial } : m)),
      );
      if (i >= text.length) {
        window.clearInterval(timer);
        if (rounds && rounds.length > 0) {
          setMessages((prev) =>
            prev.map((m) => (m.id === messageId ? { ...m, rounds } : m)),
          );
        }
        setIsTyping(false);
      }
    }, 20);
  }

  useEffect(() => {
    if (!cid) return;
    let alive = true;
    getChat({ data: { conversation_id: cid } }).then((conv) => {
      if (!alive || !conv) return;
      setConversationId(conv.conversation_id);
      setActiveConversation(conv as Conversation);
      const mapped: Message[] = [];
      for (const turn of (conv as Conversation).turns) {
        mapped.push({ id: crypto.randomUUID(), role: "user", content: turn.user });
        mapped.push({
          id: crypto.randomUUID(),
          role: "assistant",
          content: turn.assistant_text,
          rounds: (turn.rounds as ChatRound[]) ?? [],
        });
      }
      setMessages(mapped);
    });
    return () => {
      alive = false;
    };
  }, [cid]);

  async function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed || isTyping) return;

    const userMsg: Message = { id: crypto.randomUUID(), role: "user", content: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    try {
      const res = await sendChatMessage({
        data: {
          conversation_id: conversationId ?? undefined,
          user_text: trimmed,
          provider: "openrouter",
          model: null,
          version: "ui",
          history_window: 5,
          max_tool_rounds: 4,
        },
      });

      setConversationId(res.conversation_id);
      setActiveConversation(res.conversation);
      const assistantId = crypto.randomUUID();
      setMessages((prev) => [
        ...prev,
        {
          id: assistantId,
          role: "assistant",
          content: "",
        },
      ]);
      // Stream the assistant text into the UI (client-side streaming).
      streamAssistantMessage(assistantId, res.assistant_text, (res.rounds as ChatRound[]) ?? []);
    } finally {
      // `setIsTyping(false)` is handled by the streamer completion above.
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
            onClick={() => {
              setMessages([]);
              setConversationId(null);
              setActiveConversation(null);
            }}
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
                <div className={cn("max-w-[85%]", msg.role === "user" ? "" : "pt-1")}>
                  <div
                    className={cn(
                      "text-[15px] leading-relaxed",
                      msg.role === "user"
                        ? "rounded-3xl rounded-br-md bg-secondary px-4 py-3 text-foreground"
                        : "text-foreground/95",
                    )}
                  >
                    {msg.content}
                  </div>
                  {msg.role === "assistant" && msg.rounds && msg.rounds.length > 0 && (
                    <ToolRounds rounds={msg.rounds} />
                  )}
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
            {activeConversation?.turns?.at(-1)?.status === "waiting_for_user" && (
              <div className="text-xs text-warning">
                Awaiting your input to continue.
              </div>
            )}
          </div>
        )}
      </div>

      <div className="shrink-0 px-4 sm:px-6 pb-6 pt-2">
        <div className="max-w-3xl mx-auto">
          <PromptInputBox
            isLoading={isTyping}
            placeholder="Ask OpenClaw anything..."
            onSend={(text) => sendMessage(text)}
          />
          <p className="text-center text-[11px] text-muted-foreground mt-3">
            OpenClaw can make mistakes. Verify important information.
          </p>
        </div>
      </div>
    </div>
  );
}
