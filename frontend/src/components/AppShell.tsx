import { Outlet } from "@tanstack/react-router";
import {
  Activity,
  DollarSign,
  Terminal,
  Globe,
  Shield,
  Settings,
  KeyRound,
  Bell,
  BookOpen,
  MessageCircle,
  User,
  LogOut,
  Gem,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const monitoring = [
  { label: "Overview", icon: Activity, active: true },
  { label: "Tokens & Cost", icon: DollarSign },
  { label: "Action Log", icon: Terminal },
  { label: "Destinations", icon: Globe },
  { label: "Security", icon: Shield },
];
const configure = [
  { label: "Settings", icon: Settings },
  { label: "API Keys", icon: KeyRound },
  { label: "Alerts", icon: Bell },
];
const support = [
  { label: "Documentation", icon: BookOpen },
  { label: "Contact Support", icon: MessageCircle },
];

export function AppShell() {
  return (
    <div className="min-h-screen flex bg-background text-foreground">
      <aside className="w-[232px] shrink-0 border-r border-border bg-sidebar flex flex-col">
        <div className="px-5 pt-5 pb-6 flex items-center gap-3">
          <div className="size-9 rounded-lg bg-primary/15 grid place-items-center text-primary">
            <ClawIcon />
          </div>
          <div className="leading-tight">
            <div className="text-[15px] font-semibold tracking-tight">OpenClaw</div>
            <div className="text-[11px] font-semibold tracking-[0.18em] text-primary">MONITOR</div>
          </div>
        </div>
        <nav className="flex-1 px-3 space-y-6 overflow-y-auto">
          <NavSection title="Monitoring" items={monitoring} />
          <NavSection title="Configure" items={configure} />
          <NavSection title="Support" items={support} />
        </nav>
        <div className="p-3 space-y-3 border-t border-border">
          <div className="flex gap-2 text-xs text-muted-foreground">
            <button className="flex items-center gap-1.5 hover:text-foreground">
              <User className="size-3.5" /> Account
            </button>
            <button className="flex items-center gap-1.5 hover:text-foreground ml-2">
              <LogOut className="size-3.5" /> Logout
            </button>
          </div>
          <button className="w-full flex items-center justify-center gap-2 h-10 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
            <Gem className="size-4" /> Upgrade to Pro
          </button>
          <div className="flex items-center gap-2 text-xs text-muted-foreground pt-1">
            <span className="size-2 rounded-full bg-success" />
            <span className="text-foreground">Agent Online</span>
          </div>
          <div className="text-[11px] font-mono text-muted-foreground">6:52:36 AM</div>
        </div>
      </aside>
      <main className="flex-1 min-w-0 overflow-x-auto">
        <Outlet />
      </main>
    </div>
  );
}

function NavSection({
  title,
  items,
}: {
  title: string;
  items: { label: string; icon: React.ComponentType<{ className?: string }>; active?: boolean }[];
}) {
  const [active, setActive] = useState(items.find((i) => i.active)?.label ?? "");
  return (
    <div>
      <div className="px-3 mb-2 text-[10px] tracking-[0.18em] font-semibold text-muted-foreground uppercase">
        {title}
      </div>
      <ul className="space-y-1">
        {items.map((it) => {
          const Icon = it.icon;
          const isActive = active === it.label;
          return (
            <li key={it.label}>
              <button
                onClick={() => setActive(it.label)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 h-9 rounded-md text-sm transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent",
                )}
              >
                <Icon className="size-4" />
                {it.label}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function ClawIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12c0-4 3-7 7-7s7 3 7 7" />
      <path d="M7 14l2 4" />
      <path d="M12 15l1 5" />
      <path d="M17 14l-2 4" />
    </svg>
  );
}
