import { createFileRoute } from "@tanstack/react-router";
import {
  Zap,
  DollarSign,
  Send,
  Globe,
  ChevronDown,
  Calendar,
  RefreshCw,
  ArrowUpRight,
  ArrowDownRight,
  MessageSquare,
  Cpu,
  Terminal,
} from "lucide-react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

export const Route = createFileRoute("/")({ component: Dashboard });

const tokenSeries = Array.from({ length: 25 }, (_, i) => {
  const t = i;
  const input = 3500 + Math.sin(t / 2.2) * 2200 + Math.sin(t / 1.1) * 1800 + (t > 10 ? 2500 : 0);
  const output = 3000 + Math.cos(t / 1.8) * 2600 + Math.sin(t / 0.9 + 1) * 1500 + (t > 12 ? 3200 : 0);
  return {
    hour: `${String(t).padStart(2, "0")}:00`,
    Input: Math.max(500, Math.round(input)),
    Output: Math.max(500, Math.round(output)),
  };
});

const models = [
  { name: "claude-opus-4-5", pct: 62, color: "var(--color-chart-1)" },
  { name: "claude-sonnet-4-5", pct: 25, color: "var(--color-chart-2)" },
  { name: "gpt-4o", pct: 10, color: "var(--color-chart-3)" },
  { name: "kimi-k2.5", pct: 3, color: "var(--color-chart-4)" },
];

type Status = "OK" | "RETRY";
const activity: { icon: typeof MessageSquare; title: string; meta: string; status: Status }[] = [
  {
    icon: MessageSquare,
    title: "Received message from +1 (904) ***-7821",
    meta: "09:22:41 · WhatsApp · 342 tok",
    status: "OK",
  },
  {
    icon: Cpu,
    title: "Planning: user wants dinner reservation tonight at 7pm for 2",
    meta: "09:22:43 · Agent · 1.8k tok",
    status: "OK",
  },
  {
    icon: Terminal,
    title: "Navigating to OpenTable → searching 'Italian Downtown Jax'",
    meta: "09:22:46 · Browser",
    status: "OK",
  },
  {
    icon: Terminal,
    title: "OpenTable: No available slots at 7pm. Trying 7:30pm…",
    meta: "09:22:51 · Browser",
    status: "RETRY",
  },
  {
    icon: Cpu,
    title: "OpenTable failed. Fallback: use voice to call restaurant directly.",
    meta: "09:22:55 · Agent · 2.1k tok",
    status: "OK",
  },
  {
    icon: Terminal,
    title: "Initiating voice call to Orsay Restaurant (904) 555-0142",
    meta: "09:23:02 · Voice",
    status: "OK",
  },
];

const skills = [
  { name: "morning-briefing", on: true, meta: "30 runs · 09:18" },
  { name: "email-triage", on: true, meta: "214 runs · 09:22" },
  { name: "calendar-sync", on: true, meta: "48 runs · 09:20" },
  { name: "github-pr-review", on: false, meta: "12 runs · 08:45" },
  { name: "expense-tracker", on: false, meta: "7 runs · Yesterday" },
];

function Dashboard() {
  return (
    <div className="p-8 space-y-6 max-w-[1400px]">
      <header className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Overview</h1>
          <p className="mt-1 text-xs text-muted-foreground">
            Dashboard <span className="text-primary">›</span> Overview
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Selector icon={<ChevronDown className="size-3.5" />} label="Main Agent" />
          <Selector icon={<ChevronDown className="size-3.5" />} label="Last 24 hours" leadingIcon={<Calendar className="size-3.5" />} />
          <button className="size-9 grid place-items-center rounded-md border border-border bg-card hover:bg-accent transition-colors">
            <RefreshCw className="size-4 text-muted-foreground" />
          </button>
        </div>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <KpiCard icon={Zap} label="Tokens Today" value="304.3k" delta="+18%" deltaDir="up" sub="182.1k in · 122.2k out" />
        <KpiCard icon={DollarSign} label="Cost Today" value="$6.18" delta="-7%" deltaDir="down" sub="Across all models" />
        <KpiCard icon={Send} label="Prompts" value="5" delta="+4" deltaDir="up" sub="12 total actions logged" />
        <KpiCard icon={Globe} label="Services Hit" value="10" sub="8 healthy · 2 issues" />
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <Card className="xl:col-span-2">
          <CardHeader
            title="Token Usage (24h)"
            right={
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <LegendDot color="var(--color-chart-1)" label="Input" />
                <LegendDot color="var(--color-chart-2)" label="Output" />
              </div>
            }
          />
          <div className="h-64 px-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={tokenSeries} margin={{ top: 10, right: 16, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="gIn" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-chart-1)" stopOpacity={0.45} />
                    <stop offset="100%" stopColor="var(--color-chart-1)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gOut" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-chart-2)" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="var(--color-chart-2)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 6" vertical={false} />
                <XAxis dataKey="hour" stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} interval={3} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(1)}k`} />
                <Tooltip
                  contentStyle={{
                    background: "var(--color-card)",
                    border: "1px solid var(--color-border)",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                  labelStyle={{ color: "var(--color-muted-foreground)" }}
                />
                <Area type="monotone" dataKey="Input" stroke="var(--color-chart-1)" strokeWidth={2} fill="url(#gIn)" />
                <Area type="monotone" dataKey="Output" stroke="var(--color-chart-2)" strokeWidth={2} fill="url(#gOut)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <CardHeader title="Model Breakdown" />
          <div className="px-5 pb-5 space-y-5">
            {models.map((m) => (
              <div key={m.name}>
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="text-foreground/90">{m.name}</span>
                  <span className="font-semibold" style={{ color: m.color }}>{m.pct}%</span>
                </div>
                <div className="mt-2 h-1.5 rounded-full bg-muted overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${m.pct}%`, background: m.color }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <Card className="xl:col-span-2">
          <CardHeader
            title="Recent Activity"
            right={
              <button className="text-xs text-primary inline-flex items-center gap-1 hover:underline">
                View all <ArrowUpRight className="size-3" />
              </button>
            }
          />
          <ul className="px-3 pb-3 space-y-1">
            {activity.map((a, i) => {
              const Icon = a.icon;
              return (
                <li key={i} className="flex items-start gap-3 px-3 py-2.5 rounded-md hover:bg-accent/40 transition-colors">
                  <div className="size-8 rounded-md bg-muted grid place-items-center text-muted-foreground shrink-0">
                    <Icon className="size-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-foreground truncate">{a.title}</div>
                    <div className="text-[11px] font-mono text-muted-foreground mt-0.5">{a.meta}</div>
                  </div>
                  <StatusPill status={a.status} />
                </li>
              );
            })}
          </ul>
        </Card>

        <Card>
          <CardHeader title="Active Skills" />
          <ul className="px-5 pb-5 space-y-3.5">
            {skills.map((s) => (
              <li key={s.name} className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className={`size-2 rounded-full shrink-0 ${s.on ? "bg-success" : "bg-muted-foreground/40"}`} />
                  <span className="font-mono text-sm truncate">{s.name}</span>
                </div>
                <span className="text-[11px] font-mono text-muted-foreground shrink-0">{s.meta}</span>
              </li>
            ))}
          </ul>
        </Card>
      </section>
    </div>
  );
}

function Selector({ label, icon, leadingIcon }: { label: string; icon: React.ReactNode; leadingIcon?: React.ReactNode }) {
  return (
    <button className="h-9 px-3 inline-flex items-center gap-2 rounded-md border border-border bg-card text-sm hover:bg-accent transition-colors">
      {leadingIcon && <span className="text-muted-foreground">{leadingIcon}</span>}
      {label}
      <span className="text-muted-foreground">{icon}</span>
    </button>
  );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-xl border border-border bg-card ${className}`}>{children}</div>;
}

function CardHeader({ title, right }: { title: string; right?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between px-5 pt-5 pb-4">
      <h3 className="text-base font-semibold tracking-tight">{title}</h3>
      {right}
    </div>
  );
}

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="size-1.5 rounded-full" style={{ background: color }} />
      {label}
    </span>
  );
}

function KpiCard({
  icon: Icon,
  label,
  value,
  delta,
  deltaDir,
  sub,
}: {
  icon: typeof Zap;
  label: string;
  value: string;
  delta?: string;
  deltaDir?: "up" | "down";
  sub: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-[11px] tracking-[0.18em] font-semibold text-muted-foreground uppercase">
          <Icon className="size-4 text-primary" />
          {label}
        </div>
        {delta && (
          <span className={`inline-flex items-center gap-0.5 text-xs font-medium ${deltaDir === "up" ? "text-success" : "text-destructive"}`}>
            {deltaDir === "up" ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}
            {delta}
          </span>
        )}
      </div>
      <div className="mt-4 font-mono text-4xl font-semibold tracking-tight">{value}</div>
      <div className="mt-3 text-xs text-muted-foreground">{sub}</div>
    </div>
  );
}

function StatusPill({ status }: { status: Status }) {
  const map = {
    OK: "bg-success/15 text-success border-success/25",
    RETRY: "bg-warning/15 text-warning border-warning/25",
  } as const;
  return (
    <span className={`shrink-0 text-[10px] font-mono px-2 py-0.5 rounded-md border ${map[status]}`}>
      {status}
    </span>
  );
}
