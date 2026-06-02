import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { Activity, MessageSquare, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Overview", icon: Activity, to: "/" as const },
  { label: "Chat", icon: MessageSquare, to: "/chat" as const },
];

export function AppShell() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-screen flex bg-background text-foreground">
      <aside className="w-[232px] shrink-0 border-r border-border bg-sidebar flex flex-col">
        <Link to="/" className="px-5 pt-5 pb-6 flex items-center gap-3 hover:opacity-90 transition-opacity">
          <div className="size-10 rounded-2xl bg-gradient-to-br from-primary/30 to-primary/10 grid place-items-center text-primary ring-1 ring-primary/20">
            <Sparkles className="size-5" />
          </div>
          <div className="leading-tight">
            <div className="text-[16px] font-semibold tracking-tight">OpenClaw</div>
            <div className="text-[11px] text-muted-foreground">AI Assistant</div>
          </div>
        </Link>
        <nav className="flex-1 px-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.to === "/"
                ? pathname === "/"
                : pathname === item.to || pathname.startsWith(`${item.to}/`);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "w-full flex items-center gap-3 px-3 h-10 rounded-lg text-sm transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent",
                )}
              >
                <Icon className="size-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-2 text-xs">
            <span className="size-2 rounded-full bg-success animate-pulse" />
            <span className="text-foreground">Agent Online</span>
          </div>
        </div>
      </aside>
      <main className="flex-1 min-w-0 overflow-x-auto">
        <Outlet />
      </main>
    </div>
  );
}
