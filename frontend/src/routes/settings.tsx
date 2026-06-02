import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AlertTriangle, Check, X, RefreshCw, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { systemPromptContent, toolsSchema, transcripts } from "@/lib/mock-data";
import { toast } from "sonner";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "Artifacts & Settings — Research Agent Lab" }] }),
  component: SettingsPage,
});

const preflight = [
  { name: "LLM Provider (OpenRouter)", ok: true },
  { name: "Tavily API", ok: true },
  { name: "Firecrawl Parser", ok: true },
  { name: "RapidAPI Gateway", ok: false },
];

function SettingsPage() {
  const [prompt, setPrompt] = useState(systemPromptContent);
  const [edited, setEdited] = useState(false);
  const [checking, setChecking] = useState(false);

  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-semibold tracking-tight">Artifacts & Settings</h1>

      {/* System prompt */}
      <section className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="flex items-center gap-2 p-4 border-b border-border">
          <h2 className="text-sm font-semibold">System prompt</h2>
          <code className="text-xs font-mono text-muted-foreground">artifacts/system_prompt.md</code>
          <button
            onClick={() => { setEdited(false); toast.success("System prompt saved"); }}
            disabled={!edited}
            className="ml-auto h-8 px-3 rounded-md bg-primary text-primary-foreground text-xs font-medium disabled:opacity-50"
          >
            Save changes
          </button>
        </div>
        <div className="px-4 py-3 bg-warning/10 border-b border-warning/30 flex items-start gap-2">
          <AlertTriangle className="size-4 text-warning shrink-0 mt-0.5" />
          <p className="text-xs text-warning">Modifying the active system prompt directly impacts ongoing evaluation metrics.</p>
        </div>
        <textarea
          value={prompt}
          onChange={(e) => { setPrompt(e.target.value); setEdited(true); }}
          className="w-full bg-background font-mono text-xs p-4 min-h-[280px] outline-none resize-y"
        />
      </section>

      {/* Tools schema */}
      <section>
        <div className="flex items-baseline gap-3 mb-3">
          <h2 className="text-sm font-semibold">Tools schema</h2>
          <code className="text-xs font-mono text-muted-foreground">artifacts/tools.yaml</code>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          {toolsSchema.map((t) => (
            <div key={t.name} className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-mono text-sm font-semibold">{t.name}</span>
                <span className={cn(
                  "ml-auto text-[10px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded border",
                  t.core ? "bg-primary/15 text-primary border-primary/30" : "bg-tool-internal/15 text-tool-internal border-tool-internal/30",
                )}>
                  {t.core ? "Core" : "Bonus"}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mb-3">{t.desc}</p>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">params</div>
              <div className="flex gap-1 flex-wrap">
                {t.params.map((p) => (
                  <span key={p} className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-background border border-border">{p}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Preflight */}
      <section className="bg-card border border-border rounded-lg p-5">
        <div className="flex items-center mb-4">
          <h2 className="text-sm font-semibold">Environment preflight</h2>
          <button
            onClick={() => { setChecking(true); setTimeout(() => { setChecking(false); toast.success("Preflight complete"); }, 1200); }}
            className="ml-auto inline-flex items-center gap-1.5 h-8 px-3 rounded-md border border-border bg-background hover:bg-accent text-xs"
          >
            <RefreshCw className={cn("size-3.5", checking && "animate-spin")} /> Run preflight check
          </button>
        </div>
        <ul className="space-y-2">
          {preflight.map((p) => (
            <li key={p.name} className="flex items-center gap-3 p-3 rounded-md bg-background border border-border">
              <span className={cn(
                "size-6 rounded-full grid place-items-center",
                p.ok ? "bg-success/15 text-success" : "bg-destructive/15 text-destructive",
              )}>
                {p.ok ? <Check className="size-3.5" /> : <X className="size-3.5" />}
              </span>
              <span className="text-sm">{p.name}</span>
              <span className={cn("ml-auto text-[10px] font-mono uppercase tracking-wider", p.ok ? "text-success" : "text-destructive")}>
                {p.ok ? "connected" : "unreachable"}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* Transcripts */}
      <section className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="p-4 border-b border-border">
          <h2 className="text-sm font-semibold">Historical transcripts</h2>
          <p className="text-xs text-muted-foreground"><code className="font-mono">transcripts/*.transcript.json</code></p>
        </div>
        <div className="divide-y divide-border">
          {transcripts.map((t) => (
            <button key={t.id} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-accent/40 text-left">
              <FileText className="size-4 text-muted-foreground" />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium">{t.title}</div>
                <div className="text-[11px] font-mono text-muted-foreground truncate">{t.id}</div>
              </div>
              <span className="text-xs text-muted-foreground font-mono">{t.date}</span>
              <span className="text-xs text-primary">Replay →</span>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
