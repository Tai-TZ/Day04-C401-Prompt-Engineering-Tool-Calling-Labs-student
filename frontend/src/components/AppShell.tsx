import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { Activity, LogOut, MessageSquare, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const navItems = [
  { label: "Overview", icon: Activity, to: "/" as const },
  { label: "Chat", icon: MessageSquare, to: "/chat" as const },
];

const currentUser = {
  name: "Alex Morgan",
  email: "alex@lumina.ai",
  initials: "A",
};

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
        <div className="p-3 border-t border-border space-y-3">
          <div className="flex items-center gap-2.5 rounded-lg p-1.5 hover:bg-accent/60 transition-colors group">
            <Link to="/settings" className="flex min-w-0 flex-1 items-center gap-2.5">
              <Avatar className="size-9">
                <AvatarFallback className="bg-gradient-to-br from-sky-400 via-violet-500 to-fuchsia-500 text-sm font-semibold text-white">
                  {currentUser.initials}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 leading-tight">
                <div className="truncate text-sm font-medium text-foreground">{currentUser.name}</div>
                <div className="truncate text-[11px] text-muted-foreground">{currentUser.email}</div>
              </div>
            </Link>
            <button
              type="button"
              className="shrink-0 size-8 grid place-items-center rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              aria-label="Logout"
            >
              <LogOut className="size-4" />
            </button>
          </div>
        </div>
      </aside>
      <main className="flex-1 min-w-0 overflow-x-auto">
        <Outlet />
      </main>
    </div>
  );
}
