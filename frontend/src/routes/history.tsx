import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { MessageSquare } from "lucide-react";

import { listChats } from "@/lib/chat/chat.functions";

type ChatListItem = {
  conversation_id: string;
  title: string;
  created_at: string;
  updated_at: string;
  provider: string;
  version: string;
};

export const Route = createFileRoute("/history")({
  head: () => ({ meta: [{ title: "Chat History — Research Agent Lab" }] }),
  component: HistoryPage,
});

function formatTime(value: string) {
  try {
    return new Date(value).toLocaleString();
  } catch {
    return value;
  }
}

function HistoryPage() {
  const [items, setItems] = useState<ChatListItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    listChats()
      .then((res) => {
        if (!alive) return;
        setItems(res as ChatListItem[]);
      })
      .finally(() => {
        if (!alive) return;
        setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, []);

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      <div className="flex items-baseline gap-3">
        <h1 className="text-2xl font-semibold tracking-tight">Chat history</h1>
        <span className="text-xs text-muted-foreground">
          {loading ? "Loading…" : `${items.length} conversations`}
        </span>
      </div>

      <div className="bg-card border border-border rounded-lg overflow-hidden">
        {items.length === 0 ? (
          <div className="p-6 text-sm text-muted-foreground">
            No conversations yet. Start one in{" "}
            <Link to="/chat" className="text-foreground underline underline-offset-4">
              Chat
            </Link>
            .
          </div>
        ) : (
          <div className="divide-y divide-border">
            {items.map((c) => (
              <Link
                key={c.conversation_id}
                to="/chat"
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-accent/40 text-left"
                search={{ cid: c.conversation_id }}
              >
                <span className="size-8 rounded-full bg-primary/15 text-primary grid place-items-center">
                  <MessageSquare className="size-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium text-foreground">{c.title}</div>
                  <div className="truncate text-xs text-muted-foreground">
                    Updated {formatTime(c.updated_at)} · {c.provider} · {c.version}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

