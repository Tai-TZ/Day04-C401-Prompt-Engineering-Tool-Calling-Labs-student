import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { c as cn } from "./router-CI2z-wVe.mjs";
import { b as testCases, e as evalVersions, c as trendData, f as failureBreakdown } from "./mock-data-PaWIawBq.mjs";
import "../_libs/sonner.mjs";
import { P as Play, D as Download, e as Search, f as ChevronDown } from "../_libs/lucide-react.mjs";
import { R as ResponsiveContainer, L as LineChart, C as CartesianGrid, X as XAxis, Y as YAxis, T as Tooltip, a as Legend, b as Line, P as PieChart, c as Pie, d as Cell } from "../_libs/recharts.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-avatar.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/@radix-ui/react-use-is-hydrated+[...].mjs";
import "../_libs/use-sync-external-store.mjs";
import "../_libs/lodash.mjs";
import "../_libs/react-smooth.mjs";
import "../_libs/prop-types.mjs";
import "../_libs/fast-equals.mjs";
import "../_libs/tiny-invariant.mjs";
import "../_libs/react-is.mjs";
import "../_libs/d3-shape.mjs";
import "../_libs/d3-path.mjs";
import "../_libs/victory-vendor.mjs";
import "../_libs/d3-scale.mjs";
import "../_libs/internmap.mjs";
import "../_libs/d3-array.mjs";
import "../_libs/d3-time-format.mjs";
import "../_libs/d3-time.mjs";
import "../_libs/d3-interpolate.mjs";
import "../_libs/d3-color.mjs";
import "../_libs/d3-format.mjs";
import "../_libs/recharts-scale.mjs";
import "../_libs/decimal.js-light.mjs";
import "../_libs/eventemitter3.mjs";
function EvalPage() {
  const [version, setVersion] = reactExports.useState("v3");
  const [filter, setFilter] = reactExports.useState("all");
  const [search, setSearch] = reactExports.useState("");
  const [running, setRunning] = reactExports.useState(false);
  const filtered = reactExports.useMemo(() => {
    return testCases.filter((c) => {
      if (filter === "failed" && c.status !== "FAIL") return false;
      if (filter === "multiturn" && !c.multiturn) return false;
      if (search && !c.id.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [filter, search]);
  const passed = testCases.filter((c) => c.status === "PASS").length;
  const total = testCases.length;
  const caseAcc = Math.round(passed / total * 100);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-6 max-w-[1600px] mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-end gap-3 bg-card border border-border rounded-lg p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Version", children: /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: version, onChange: (e) => setVersion(e.target.value), className: "h-9 bg-background border border-border rounded-md px-3 text-sm", children: evalVersions.map((v) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: v }, v)) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Suite", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1.5", children: ["base", "group", "extension"].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-1.5 h-9 px-2.5 rounded-md border border-border bg-background text-sm cursor-pointer", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", defaultChecked: s !== "extension", className: "accent-primary" }),
        " ",
        s
      ] }, s)) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => {
        setRunning(true);
        setTimeout(() => setRunning(false), 1500);
      }, className: "ml-auto inline-flex items-center gap-2 h-9 px-4 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 disabled:opacity-60", disabled: running, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: cn("size-3.5", running && "animate-pulse") }),
        " ",
        running ? "Running…" : "Run Eval"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "#", className: "inline-flex items-center gap-2 h-9 px-3 rounded-md border border-border bg-background hover:bg-accent text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "size-3.5" }),
        " Download Run JSON"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-2xl font-semibold tracking-tight", children: [
        "Run ",
        version
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground font-mono", children: [
        passed,
        "/",
        total,
        " tests passed · ",
        caseAcc,
        "% accuracy"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(MetricCard, { label: "Case Accuracy", value: `${caseAcc}%`, good: caseAcc >= 85, sub: `${passed}/${total}` }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MetricCard, { label: "Tool Routing", value: "94%", good: true, sub: "correct tool choice" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MetricCard, { label: "Argument Accuracy", value: "88%", good: true, sub: "json args correct" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MetricCard, { label: "Multiturn Accuracy", value: "82%", good: true, sub: "multi-step flows" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-5 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-3 bg-card border border-border rounded-lg p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold mb-1", children: "Metric trend across versions" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-4", children: "v0 → v3 across core eval metrics" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-64", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(LineChart, { data: trendData, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { stroke: "var(--color-border)", strokeDasharray: "3 3", vertical: false }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "version", stroke: "var(--color-muted-foreground)", fontSize: 12 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { stroke: "var(--color-muted-foreground)", fontSize: 12, domain: [0, 100] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { contentStyle: {
            background: "var(--color-card)",
            border: "1px solid var(--color-border)",
            borderRadius: 8,
            fontSize: 12
          } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Legend, { wrapperStyle: {
            fontSize: 12
          } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Line, { type: "monotone", dataKey: "case_accuracy", stroke: "var(--color-chart-1)", strokeWidth: 2, dot: {
            r: 4
          } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Line, { type: "monotone", dataKey: "routing", stroke: "var(--color-chart-2)", strokeWidth: 2, dot: {
            r: 4
          } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Line, { type: "monotone", dataKey: "args", stroke: "var(--color-chart-3)", strokeWidth: 2, dot: {
            r: 4
          } })
        ] }) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 bg-card border border-border rounded-lg p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold mb-1", children: "Failure breakdown" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-4", children: "Categorized errors in this run" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-64", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(PieChart, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Pie, { data: failureBreakdown, dataKey: "value", nameKey: "name", innerRadius: 50, outerRadius: 85, paddingAngle: 2, children: failureBreakdown.map((e, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Cell, { fill: e.fill }, i)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { contentStyle: {
            background: "var(--color-card)",
            border: "1px solid var(--color-border)",
            borderRadius: 8,
            fontSize: 12
          } })
        ] }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-x-3 gap-y-1 mt-2 text-xs", children: failureBreakdown.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "size-2 rounded-sm", style: {
            background: f.fill
          } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-mono", children: f.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-auto text-foreground", children: f.value })
        ] }, f.name)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-lg overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2 p-4 border-b border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold", children: "Test cases" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-auto flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex rounded-md border border-border bg-background overflow-hidden", children: ["all", "failed", "multiturn"].map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setFilter(f), className: cn("px-3 h-8 text-xs capitalize", filter === f ? "bg-primary/20 text-primary" : "text-muted-foreground hover:text-foreground"), children: f === "all" ? "All" : f === "failed" ? "Failed only" : "Multiturn" }, f)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 h-8 px-2 rounded-md border border-border bg-background w-56", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "size-3.5 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: search, onChange: (e) => setSearch(e.target.value), placeholder: "Search case ID…", className: "bg-transparent outline-none text-xs flex-1" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-[140px_90px_1fr_1fr_140px_40px] px-4 py-2 border-b border-border bg-background/40 text-[11px] font-mono uppercase tracking-wider text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Case ID" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Expected" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Actual" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Failure" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", {})
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border", children: filtered.map((tc) => /* @__PURE__ */ jsxRuntimeExports.jsx(TestRow, { tc }, tc.id)) })
    ] })
  ] });
}
function Field({
  label,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex flex-col gap-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] uppercase tracking-wider text-muted-foreground font-semibold", children: label }),
    children
  ] });
}
function MetricCard({
  label,
  value,
  good,
  sub
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-lg p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground uppercase tracking-wider font-semibold", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("text-3xl font-semibold tracking-tight mt-2", good ? "text-success" : "text-destructive"), children: value }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mt-1 font-mono", children: sub })
  ] });
}
function TestRow({
  tc
}) {
  const [open, setOpen] = reactExports.useState(tc.status === "FAIL");
  const fail = tc.status === "FAIL";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn(fail && "bg-destructive/[0.04]"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => fail && setOpen((o) => !o), className: cn("w-full grid grid-cols-[140px_90px_1fr_1fr_140px_40px] px-4 py-2.5 text-left text-sm items-center", fail && "cursor-pointer hover:bg-destructive/10"), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs", children: tc.id }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("text-[10px] font-semibold px-2 py-0.5 rounded-md border", fail ? "bg-destructive/15 text-destructive border-destructive/30" : "bg-success/15 text-success border-success/30"), children: tc.status }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs text-muted-foreground", children: tc.expectedTool }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("font-mono text-xs", fail ? "text-destructive" : "text-muted-foreground"), children: tc.actualTool }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-mono", children: tc.failureType ?? "—" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: cn("size-4 text-muted-foreground transition-transform", open && "rotate-180", !fail && "opacity-0") })
    ] }),
    open && fail && tc.details && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pb-4 pt-1 space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-md border border-destructive/30 bg-destructive/5 p-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-wider text-destructive font-semibold mb-1", children: "Observed mismatch" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: tc.details.observed_mismatch })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1", children: "Failures" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1.5 flex-wrap", children: tc.details.failures.map((f, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-mono px-2 py-0.5 rounded bg-destructive/15 text-destructive border border-destructive/30", children: f }, i)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-wider text-destructive font-semibold mb-1", children: "Actual args" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: "text-xs font-mono bg-background border border-destructive/30 rounded-md p-2 overflow-x-auto", children: JSON.stringify(tc.details.actual_args, null, 2) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-wider text-success font-semibold mb-1", children: "Expected args" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: "text-xs font-mono bg-background border border-success/30 rounded-md p-2 overflow-x-auto", children: JSON.stringify(tc.details.expected_args, null, 2) })
        ] })
      ] })
    ] })
  ] });
}
export {
  EvalPage as component
};
