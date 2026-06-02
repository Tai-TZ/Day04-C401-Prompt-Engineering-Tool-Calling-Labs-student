import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  PieChart, Pie, Cell,
} from "recharts";
import { Download, Play, Search, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { trendData, failureBreakdown, testCases, evalVersions, type TestCase } from "@/lib/mock-data";

export const Route = createFileRoute("/evaluation")({
  head: () => ({ meta: [{ title: "Evaluation — Research Agent Lab" }] }),
  component: EvalPage,
});

function EvalPage() {
  const [version, setVersion] = useState("v3");
  const [filter, setFilter] = useState<"all" | "failed" | "multiturn">("all");
  const [search, setSearch] = useState("");
  const [running, setRunning] = useState(false);

  const filtered = useMemo(() => {
    return testCases.filter((c) => {
      if (filter === "failed" && c.status !== "FAIL") return false;
      if (filter === "multiturn" && !c.multiturn) return false;
      if (search && !c.id.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [filter, search]);

  const passed = testCases.filter((c) => c.status === "PASS").length;
  const total = testCases.length;
  const caseAcc = Math.round((passed / total) * 100);

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* Controls */}
      <div className="flex flex-wrap items-end gap-3 bg-card border border-border rounded-lg p-4">
        <Field label="Version">
          <select value={version} onChange={(e) => setVersion(e.target.value)} className="h-9 bg-background border border-border rounded-md px-3 text-sm">
            {evalVersions.map((v) => <option key={v}>{v}</option>)}
          </select>
        </Field>
        <Field label="Suite">
          <div className="flex gap-1.5">
            {["base", "group", "extension"].map((s) => (
              <label key={s} className="flex items-center gap-1.5 h-9 px-2.5 rounded-md border border-border bg-background text-sm cursor-pointer">
                <input type="checkbox" defaultChecked={s !== "extension"} className="accent-primary" /> {s}
              </label>
            ))}
          </div>
        </Field>
        <button
          onClick={() => { setRunning(true); setTimeout(() => setRunning(false), 1500); }}
          className="ml-auto inline-flex items-center gap-2 h-9 px-4 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 disabled:opacity-60"
          disabled={running}
        >
          <Play className={cn("size-3.5", running && "animate-pulse")} /> {running ? "Running…" : "Run Eval"}
        </button>
        <a href="#" className="inline-flex items-center gap-2 h-9 px-3 rounded-md border border-border bg-background hover:bg-accent text-sm">
          <Download className="size-3.5" /> Download Run JSON
        </a>
      </div>

      {/* Headline */}
      <div className="flex items-baseline gap-4">
        <h1 className="text-2xl font-semibold tracking-tight">Run {version}</h1>
        <span className="text-sm text-muted-foreground font-mono">{passed}/{total} tests passed · {caseAcc}% accuracy</span>
      </div>

      {/* Metric cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard label="Case Accuracy" value={`${caseAcc}%`} good={caseAcc >= 85} sub={`${passed}/${total}`} />
        <MetricCard label="Tool Routing" value="94%" good sub="correct tool choice" />
        <MetricCard label="Argument Accuracy" value="88%" good sub="json args correct" />
        <MetricCard label="Multiturn Accuracy" value="82%" good sub="multi-step flows" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <div className="lg:col-span-3 bg-card border border-border rounded-lg p-5">
          <h3 className="text-sm font-semibold mb-1">Metric trend across versions</h3>
          <p className="text-xs text-muted-foreground mb-4">v0 → v3 across core eval metrics</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="version" stroke="var(--color-muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={12} domain={[0, 100]} />
                <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 8, fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Line type="monotone" dataKey="case_accuracy" stroke="var(--color-chart-1)" strokeWidth={2} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="routing" stroke="var(--color-chart-2)" strokeWidth={2} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="args" stroke="var(--color-chart-3)" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="lg:col-span-2 bg-card border border-border rounded-lg p-5">
          <h3 className="text-sm font-semibold mb-1">Failure breakdown</h3>
          <p className="text-xs text-muted-foreground mb-4">Categorized errors in this run</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={failureBreakdown} dataKey="value" nameKey="name" innerRadius={50} outerRadius={85} paddingAngle={2}>
                  {failureBreakdown.map((e, i) => <Cell key={i} fill={e.fill} />)}
                </Pie>
                <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 8, fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-x-3 gap-y-1 mt-2 text-xs">
            {failureBreakdown.map((f) => (
              <div key={f.name} className="flex items-center gap-1.5">
                <span className="size-2 rounded-sm" style={{ background: f.fill }} />
                <span className="text-muted-foreground font-mono">{f.name}</span>
                <span className="ml-auto text-foreground">{f.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Test cases */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="flex flex-wrap items-center gap-2 p-4 border-b border-border">
          <h3 className="text-sm font-semibold">Test cases</h3>
          <div className="ml-auto flex items-center gap-2">
            <div className="flex rounded-md border border-border bg-background overflow-hidden">
              {(["all", "failed", "multiturn"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={cn(
                    "px-3 h-8 text-xs capitalize",
                    filter === f ? "bg-primary/20 text-primary" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {f === "all" ? "All" : f === "failed" ? "Failed only" : "Multiturn"}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-1.5 h-8 px-2 rounded-md border border-border bg-background w-56">
              <Search className="size-3.5 text-muted-foreground" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search case ID…"
                className="bg-transparent outline-none text-xs flex-1"
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-[140px_90px_1fr_1fr_140px_40px] px-4 py-2 border-b border-border bg-background/40 text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
          <span>Case ID</span><span>Status</span><span>Expected</span><span>Actual</span><span>Failure</span><span></span>
        </div>
        <div className="divide-y divide-border">
          {filtered.map((tc) => <TestRow key={tc.id} tc={tc} />)}
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">{label}</span>
      {children}
    </label>
  );
}

function MetricCard({ label, value, good, sub }: { label: string; value: string; good: boolean; sub: string }) {
  return (
    <div className="bg-card border border-border rounded-lg p-5">
      <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">{label}</div>
      <div className={cn("text-3xl font-semibold tracking-tight mt-2", good ? "text-success" : "text-destructive")}>{value}</div>
      <div className="text-xs text-muted-foreground mt-1 font-mono">{sub}</div>
    </div>
  );
}

function TestRow({ tc }: { tc: TestCase }) {
  const [open, setOpen] = useState(tc.status === "FAIL");
  const fail = tc.status === "FAIL";
  return (
    <div className={cn(fail && "bg-destructive/[0.04]")}>
      <button
        onClick={() => fail && setOpen((o) => !o)}
        className={cn("w-full grid grid-cols-[140px_90px_1fr_1fr_140px_40px] px-4 py-2.5 text-left text-sm items-center", fail && "cursor-pointer hover:bg-destructive/10")}
      >
        <span className="font-mono text-xs">{tc.id}</span>
        <span>
          <span className={cn(
            "text-[10px] font-semibold px-2 py-0.5 rounded-md border",
            fail ? "bg-destructive/15 text-destructive border-destructive/30" : "bg-success/15 text-success border-success/30",
          )}>{tc.status}</span>
        </span>
        <span className="font-mono text-xs text-muted-foreground">{tc.expectedTool}</span>
        <span className={cn("font-mono text-xs", fail ? "text-destructive" : "text-muted-foreground")}>{tc.actualTool}</span>
        <span className="text-xs text-muted-foreground font-mono">{tc.failureType ?? "—"}</span>
        <ChevronDown className={cn("size-4 text-muted-foreground transition-transform", open && "rotate-180", !fail && "opacity-0")} />
      </button>
      {open && fail && tc.details && (
        <div className="px-4 pb-4 pt-1 space-y-3">
          <div className="rounded-md border border-destructive/30 bg-destructive/5 p-3">
            <div className="text-[10px] uppercase tracking-wider text-destructive font-semibold mb-1">Observed mismatch</div>
            <p className="text-sm">{tc.details.observed_mismatch}</p>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">Failures</div>
            <div className="flex gap-1.5 flex-wrap">
              {tc.details.failures.map((f, i) => (
                <span key={i} className="text-[11px] font-mono px-2 py-0.5 rounded bg-destructive/15 text-destructive border border-destructive/30">{f}</span>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="text-[10px] uppercase tracking-wider text-destructive font-semibold mb-1">Actual args</div>
              <pre className="text-xs font-mono bg-background border border-destructive/30 rounded-md p-2 overflow-x-auto">{JSON.stringify(tc.details.actual_args, null, 2)}</pre>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-wider text-success font-semibold mb-1">Expected args</div>
              <pre className="text-xs font-mono bg-background border border-success/30 rounded-md p-2 overflow-x-auto">{JSON.stringify(tc.details.expected_args, null, 2)}</pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
