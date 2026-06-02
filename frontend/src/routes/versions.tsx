import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Copy, ExternalLink, ArrowUp, ArrowDown, FileCode2, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { versionLog, systemPromptContent } from "@/lib/mock-data";
import { toast } from "sonner";

export const Route = createFileRoute("/versions")({
  head: () => ({ meta: [{ title: "Version History — Research Agent Lab" }] }),
  component: VersionsPage,
});

function VersionsPage() {
  return (
    <div className="p-6 space-y-8 max-w-6xl mx-auto">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Version history</h1>
        <p className="text-sm text-muted-foreground mt-1">Structural changes committed to <code className="font-mono text-xs">artifacts/version_log.csv</code></p>
      </div>

      <div className="relative">
        <div className="absolute left-[15px] top-2 bottom-2 w-px bg-border" />
        <div className="space-y-4">
          {versionLog.map((v) => <VersionCard key={v.version} v={v} />)}
        </div>
      </div>

      <DiffViewer />
    </div>
  );
}

function VersionCard({ v }: { v: typeof versionLog[number] }) {
  const copy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied`);
  };
  const deltas = [
    { k: "case_accuracy", val: v.metrics.case },
    { k: "routing", val: v.metrics.routing },
    { k: "args", val: v.metrics.args },
  ];
  return (
    <div className="relative pl-10">
      <div className="absolute left-0 top-4 size-8 rounded-full bg-primary/15 text-primary border-2 border-background grid place-items-center font-mono text-xs font-semibold">
        {v.version}
      </div>
      <div className="bg-card border border-border rounded-lg p-5">
        <div className="flex items-start gap-4 flex-wrap">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
              <span className="inline-flex items-center gap-1"><User className="size-3" /> {v.author}</span>
              <span className="inline-flex items-center gap-1"><FileCode2 className="size-3" /> {v.artifact}</span>
            </div>
            <h3 className="text-base font-semibold">{v.hypothesis}</h3>
            <p className="text-sm text-muted-foreground mt-1">{v.rationale}</p>
          </div>
          <a href="#" className="inline-flex items-center gap-1.5 text-xs text-primary hover:underline">
            run JSON <ExternalLink className="size-3" />
          </a>
        </div>

        <div className="grid grid-cols-3 gap-2 mt-4">
          {deltas.map((d) => {
            const diff = d.val[1] - d.val[0];
            const up = diff > 0;
            return (
              <div key={d.k} className="rounded-md bg-background border border-border p-2.5">
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-mono">{d.k}</div>
                <div className="flex items-baseline gap-1.5 mt-0.5">
                  <span className="font-mono text-xs text-muted-foreground">{d.val[0]}%</span>
                  <span className="text-muted-foreground text-xs">→</span>
                  <span className="font-mono text-sm font-semibold">{d.val[1]}%</span>
                  <span className={cn("ml-auto inline-flex items-center text-xs font-mono", up ? "text-success" : "text-destructive")}>
                    {up ? <ArrowUp className="size-3" /> : <ArrowDown className="size-3" />}{Math.abs(diff)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex gap-2 mt-3 flex-wrap">
          <HashChip label="prompt_hash" hash={v.prompt_hash} onCopy={() => copy(v.prompt_hash, "prompt_hash")} />
          <HashChip label="tools_hash" hash={v.tools_hash} onCopy={() => copy(v.tools_hash, "tools_hash")} />
        </div>
      </div>
    </div>
  );
}

function HashChip({ label, hash, onCopy }: { label: string; hash: string; onCopy: () => void }) {
  return (
    <button onClick={onCopy} className="inline-flex items-center gap-2 text-xs font-mono px-2 py-1 rounded-md bg-background border border-border hover:border-primary/40 transition-colors group">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-foreground">{hash}</span>
      <Copy className="size-3 text-muted-foreground group-hover:text-primary" />
    </button>
  );
}

function DiffViewer() {
  const [from, setFrom] = useState("v2");
  const [to, setTo] = useState("v3");
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="flex items-center gap-3 p-4 border-b border-border">
        <h3 className="text-sm font-semibold">Side-by-side diff</h3>
        <div className="ml-auto flex items-center gap-2 text-xs">
          <select value={from} onChange={(e) => setFrom(e.target.value)} className="h-8 bg-background border border-border rounded-md px-2">
            {versionLog.map((v) => <option key={v.version}>{v.version}</option>)}
          </select>
          <span className="text-muted-foreground">→</span>
          <select value={to} onChange={(e) => setTo(e.target.value)} className="h-8 bg-background border border-border rounded-md px-2">
            {versionLog.map((v) => <option key={v.version}>{v.version}</option>)}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-2 divide-x divide-border font-mono text-xs">
        <pre className="p-4 overflow-x-auto whitespace-pre-wrap">
          <span className="text-muted-foreground"># system_prompt.md @ {from}</span>{"\n\n"}
          {systemPromptContent.split("\n").slice(0, 14).map((line, i) => (
            <div key={i} className={cn(i === 6 && "bg-destructive/15 text-destructive -mx-4 px-4")}>
              {i === 6 && "- "}{line || " "}
            </div>
          ))}
        </pre>
        <pre className="p-4 overflow-x-auto whitespace-pre-wrap">
          <span className="text-muted-foreground"># system_prompt.md @ {to}</span>{"\n\n"}
          {systemPromptContent.split("\n").slice(0, 14).map((line, i) => (
            <div key={i} className={cn((i === 6 || i === 7) && "bg-success/15 text-success -mx-4 px-4")}>
              {(i === 6 || i === 7) && "+ "}{line || " "}
            </div>
          ))}
        </pre>
      </div>
    </div>
  );
}
