import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { f as ChevronDown, m as Calendar, R as RefreshCw, Z as Zap, n as DollarSign, o as Send, G as Globe, p as ArrowUpRight, M as MessageSquare, q as Cpu, r as Terminal, s as ArrowDownRight } from "../_libs/lucide-react.mjs";
import { R as ResponsiveContainer, A as AreaChart, C as CartesianGrid, X as XAxis, Y as YAxis, T as Tooltip, e as Area } from "../_libs/recharts.mjs";
import "../_libs/clsx.mjs";
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
const tokenSeries = Array.from({
  length: 25
}, (_, i) => {
  const t = i;
  const input = 3500 + Math.sin(t / 2.2) * 2200 + Math.sin(t / 1.1) * 1800 + (t > 10 ? 2500 : 0);
  const output = 3e3 + Math.cos(t / 1.8) * 2600 + Math.sin(t / 0.9 + 1) * 1500 + (t > 12 ? 3200 : 0);
  return {
    hour: `${String(t).padStart(2, "0")}:00`,
    Input: Math.max(500, Math.round(input)),
    Output: Math.max(500, Math.round(output))
  };
});
const models = [{
  name: "claude-opus-4-5",
  pct: 62,
  color: "var(--color-chart-1)"
}, {
  name: "claude-sonnet-4-5",
  pct: 25,
  color: "var(--color-chart-2)"
}, {
  name: "gpt-4o",
  pct: 10,
  color: "var(--color-chart-3)"
}, {
  name: "kimi-k2.5",
  pct: 3,
  color: "var(--color-chart-4)"
}];
const activity = [{
  icon: MessageSquare,
  title: "Received message from +1 (904) ***-7821",
  meta: "09:22:41 · WhatsApp · 342 tok",
  status: "OK"
}, {
  icon: Cpu,
  title: "Planning: user wants dinner reservation tonight at 7pm for 2",
  meta: "09:22:43 · Agent · 1.8k tok",
  status: "OK"
}, {
  icon: Terminal,
  title: "Navigating to OpenTable → searching 'Italian Downtown Jax'",
  meta: "09:22:46 · Browser",
  status: "OK"
}, {
  icon: Terminal,
  title: "OpenTable: No available slots at 7pm. Trying 7:30pm…",
  meta: "09:22:51 · Browser",
  status: "RETRY"
}, {
  icon: Cpu,
  title: "OpenTable failed. Fallback: use voice to call restaurant directly.",
  meta: "09:22:55 · Agent · 2.1k tok",
  status: "OK"
}, {
  icon: Terminal,
  title: "Initiating voice call to Orsay Restaurant (904) 555-0142",
  meta: "09:23:02 · Voice",
  status: "OK"
}];
const skills = [{
  name: "morning-briefing",
  on: true,
  meta: "30 runs · 09:18"
}, {
  name: "email-triage",
  on: true,
  meta: "214 runs · 09:22"
}, {
  name: "calendar-sync",
  on: true,
  meta: "48 runs · 09:20"
}, {
  name: "github-pr-review",
  on: false,
  meta: "12 runs · 08:45"
}, {
  name: "expense-tracker",
  on: false,
  meta: "7 runs · Yesterday"
}];
function Dashboard() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-8 space-y-6 max-w-[1400px]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex items-start justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-semibold tracking-tight", children: "Overview" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-xs text-muted-foreground", children: [
          "Dashboard ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "›" }),
          " Overview"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Selector, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "size-3.5" }), label: "Main Agent" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Selector, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "size-3.5" }), label: "Last 24 hours", leadingIcon: /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "size-3.5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "size-9 grid place-items-center rounded-md border border-border bg-card hover:bg-accent transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "size-4 text-muted-foreground" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(KpiCard, { icon: Zap, label: "Tokens Today", value: "304.3k", delta: "+18%", deltaDir: "up", sub: "182.1k in · 122.2k out" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(KpiCard, { icon: DollarSign, label: "Cost Today", value: "$6.18", delta: "-7%", deltaDir: "down", sub: "Across all models" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(KpiCard, { icon: Send, label: "Prompts", value: "5", delta: "+4", deltaDir: "up", sub: "12 total actions logged" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(KpiCard, { icon: Globe, label: "Services Hit", value: "10", sub: "8 healthy · 2 issues" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "grid grid-cols-1 xl:grid-cols-3 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "xl:col-span-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { title: "Token Usage (24h)", right: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LegendDot, { color: "var(--color-chart-1)", label: "Input" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(LegendDot, { color: "var(--color-chart-2)", label: "Output" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-64 px-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AreaChart, { data: tokenSeries, margin: {
          top: 10,
          right: 16,
          left: 0,
          bottom: 0
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("defs", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "gIn", x1: "0", y1: "0", x2: "0", y2: "1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "var(--color-chart-1)", stopOpacity: 0.45 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "var(--color-chart-1)", stopOpacity: 0 })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "gOut", x1: "0", y1: "0", x2: "0", y2: "1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "var(--color-chart-2)", stopOpacity: 0.4 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "var(--color-chart-2)", stopOpacity: 0 })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { stroke: "var(--color-border)", strokeDasharray: "3 6", vertical: false }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "hour", stroke: "var(--color-muted-foreground)", fontSize: 11, tickLine: false, axisLine: false, interval: 3 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { stroke: "var(--color-muted-foreground)", fontSize: 11, tickLine: false, axisLine: false, tickFormatter: (v) => `${(v / 1e3).toFixed(1)}k` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { contentStyle: {
            background: "var(--color-card)",
            border: "1px solid var(--color-border)",
            borderRadius: 8,
            fontSize: 12
          }, labelStyle: {
            color: "var(--color-muted-foreground)"
          } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Area, { type: "monotone", dataKey: "Input", stroke: "var(--color-chart-1)", strokeWidth: 2, fill: "url(#gIn)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Area, { type: "monotone", dataKey: "Output", stroke: "var(--color-chart-2)", strokeWidth: 2, fill: "url(#gOut)" })
        ] }) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { title: "Model Breakdown" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 pb-5 space-y-5", children: models.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between font-mono text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground/90", children: m.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold", style: {
              color: m.color
            }, children: [
              m.pct,
              "%"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 h-1.5 rounded-full bg-muted overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full rounded-full", style: {
            width: `${m.pct}%`,
            background: m.color
          } }) })
        ] }, m.name)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "grid grid-cols-1 xl:grid-cols-3 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "xl:col-span-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { title: "Recent Activity", right: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "text-xs text-primary inline-flex items-center gap-1 hover:underline", children: [
          "View all ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "size-3" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "px-3 pb-3 space-y-1", children: activity.map((a, i) => {
          const Icon = a.icon;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-3 px-3 py-2.5 rounded-md hover:bg-accent/40 transition-colors", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-8 rounded-md bg-muted grid place-items-center text-muted-foreground shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "size-4" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-foreground truncate", children: a.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] font-mono text-muted-foreground mt-0.5", children: a.meta })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(StatusPill, { status: a.status })
          ] }, i);
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { title: "Active Skills" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "px-5 pb-5 space-y-3.5", children: skills.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `size-2 rounded-full shrink-0 ${s.on ? "bg-success" : "bg-muted-foreground/40"}` }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-sm truncate", children: s.name })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-mono text-muted-foreground shrink-0", children: s.meta })
        ] }, s.name)) })
      ] })
    ] })
  ] });
}
function Selector({
  label,
  icon,
  leadingIcon
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "h-9 px-3 inline-flex items-center gap-2 rounded-md border border-border bg-card text-sm hover:bg-accent transition-colors", children: [
    leadingIcon && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: leadingIcon }),
    label,
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: icon })
  ] });
}
function Card({
  children,
  className = ""
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `rounded-xl border border-border bg-card ${className}`, children });
}
function CardHeader({
  title,
  right
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-5 pt-5 pb-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-base font-semibold tracking-tight", children: title }),
    right
  ] });
}
function LegendDot({
  color,
  label
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "size-1.5 rounded-full", style: {
      background: color
    } }),
    label
  ] });
}
function KpiCard({
  icon: Icon,
  label,
  value,
  delta,
  deltaDir,
  sub
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-card p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-[11px] tracking-[0.18em] font-semibold text-muted-foreground uppercase", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "size-4 text-primary" }),
        label
      ] }),
      delta && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `inline-flex items-center gap-0.5 text-xs font-medium ${deltaDir === "up" ? "text-success" : "text-destructive"}`, children: [
        deltaDir === "up" ? /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "size-3" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDownRight, { className: "size-3" }),
        delta
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 font-mono text-4xl font-semibold tracking-tight", children: value }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 text-xs text-muted-foreground", children: sub })
  ] });
}
function StatusPill({
  status
}) {
  const map = {
    OK: "bg-success/15 text-success border-success/25",
    RETRY: "bg-warning/15 text-warning border-warning/25"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `shrink-0 text-[10px] font-mono px-2 py-0.5 rounded-md border ${map[status]}`, children: status });
}
export {
  Dashboard as component
};
