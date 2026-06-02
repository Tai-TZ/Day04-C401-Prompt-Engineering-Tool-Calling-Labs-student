import { useState } from "react";
import { ChevronDown, ExternalLink, Wrench } from "lucide-react";
import { cn } from "@/lib/utils";
import { TOOL_META, type ToolCall } from "@/lib/mock-data";

const catStyles: Record<string, string> = {
  research: "text-tool-research bg-tool-research/10 border-tool-research/30",
  social: "text-tool-social bg-tool-social/10 border-tool-social/30",
  interaction: "text-tool-interaction bg-tool-interaction/10 border-tool-interaction/30",
  output: "text-tool-output bg-tool-output/10 border-tool-output/30",
  internal: "text-tool-internal bg-tool-internal/10 border-tool-internal/30",
};
const catDot: Record<string, string> = {
  research: "bg-tool-research",
  social: "bg-tool-social",
  interaction: "bg-tool-interaction",
  output: "bg-tool-output",
  internal: "bg-tool-internal",
};

export function ToolInspector({ toolCalls }: { toolCalls: ToolCall[] }) {
  if (toolCalls.length === 0) {
    return (
      <div className="h-full grid place-items-center text-center px-8">
        <div className="space-y-3 text-muted-foreground">
          <Wrench className="size-8 mx-auto opacity-50" />
          <p className="text-sm">No tool calls yet</p>
          <p className="text-xs">Send a message to see the agent's tool execution trail.</p>
        </div>
      </div>
    );
  }
  return (
    <div className="relative">
      <div className="absolute left-[27px] top-2 bottom-2 w-px bg-border" />
      <div className="space-y-3">
        {toolCalls.map((tc) => (
          <CallCard key={tc.id} call={tc} />
        ))}
      </div>
    </div>
  );
}

function CallCard({ call }: { call: ToolCall }) {
  const [open, setOpen] = useState(true);
  const meta = TOOL_META[call.tool] ?? { category: "internal" as const, label: call.tool };
  const items = (call.result as { items?: Array<{ title: string; url: string; source: string; summary: string }> })?.items;

  return (
    <div className="relative pl-12">
      <div
        className={cn(
          "absolute left-4 top-3 size-6 rounded-full grid place-items-center border-2 border-background",
          catDot[meta.category],
        )}
      >
        <span className="text-[10px] font-mono font-semibold text-background">{call.round}</span>
      </div>
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <button
          onClick={() => setOpen((o) => !o)}
          className="w-full flex items-center gap-2 px-3 py-2.5 hover:bg-accent/40 transition-colors"
        >
          <span className={cn("text-[10px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded border", catStyles[meta.category])}>
            {meta.category}
          </span>
          <span className="font-mono text-sm font-medium">{call.tool}</span>
          <span className="text-xs text-muted-foreground">round {call.round}</span>
          <ChevronDown className={cn("ml-auto size-4 text-muted-foreground transition-transform", open && "rotate-180")} />
        </button>
        {open && (
          <div className="px-3 pb-3 space-y-3 border-t border-border/60">
            <div>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-2 mb-1">Arguments</div>
              <pre className="text-xs font-mono bg-background/60 border border-border rounded-md p-2 overflow-x-auto">
                {JSON.stringify(call.args, null, 2)}
              </pre>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Result</div>
              {items ? (
                <div className="space-y-2">
                  {items.map((it, i) => (
                    <a
                      href={it.url}
                      key={i}
                      target="_blank"
                      rel="noreferrer"
                      className="block p-2.5 rounded-md border border-border bg-background/40 hover:border-primary/40 transition-colors group"
                    >
                      <div className="flex items-start gap-2">
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium truncate group-hover:text-primary">{it.title}</div>
                          <div className="text-[11px] text-muted-foreground font-mono">{it.source}</div>
                          <div className="text-xs text-muted-foreground mt-1 line-clamp-2">{it.summary}</div>
                        </div>
                        <ExternalLink className="size-3.5 text-muted-foreground shrink-0" />
                      </div>
                    </a>
                  ))}
                </div>
              ) : (
                <pre className="text-xs font-mono bg-background/60 border border-border rounded-md p-2 overflow-x-auto max-h-48">
                  {JSON.stringify(call.result, null, 2)}
                </pre>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
