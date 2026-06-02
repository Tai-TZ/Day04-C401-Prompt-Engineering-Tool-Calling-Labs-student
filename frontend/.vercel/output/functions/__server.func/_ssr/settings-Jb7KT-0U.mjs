import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { c as cn } from "./router-CI2z-wVe.mjs";
import { t as toolsSchema, a as transcripts } from "./mock-data-PaWIawBq.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { T as TriangleAlert, R as RefreshCw, c as Check, X, d as FileText } from "../_libs/lucide-react.mjs";
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
const preflight = [{
  name: "LLM Provider (OpenRouter)",
  ok: true
}, {
  name: "Tavily API",
  ok: true
}, {
  name: "Firecrawl Parser",
  ok: true
}, {
  name: "RapidAPI Gateway",
  ok: false
}];
function SettingsPage() {
  const [telegramConfig, setTelegramConfig] = reactExports.useState({
    botToken: "",
    chatId: "",
    enabled: false,
    testMode: true
  });
  const [edited, setEdited] = reactExports.useState(false);
  const [checking, setChecking] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-6 max-w-6xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-semibold tracking-tight", children: "Artifacts & Settings" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "bg-card border border-border rounded-lg overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 p-4 border-b border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold", children: "Telegram configuration" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "text-xs font-mono text-muted-foreground", children: "env: TELEGRAM_*" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
          setEdited(false);
          toast.success("Telegram settings saved");
        }, disabled: !edited, className: "ml-auto h-8 px-3 rounded-md bg-primary text-primary-foreground text-xs font-medium disabled:opacity-50", children: "Save changes" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-3 bg-warning/10 border-b border-warning/30 flex items-start gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "size-4 text-warning shrink-0 mt-0.5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-warning", children: "Do not commit the bot token to git. Store secrets in local environment variables." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs text-muted-foreground", children: "Bot token" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "password", value: telegramConfig.botToken, onChange: (e) => {
            setTelegramConfig((prev) => ({
              ...prev,
              botToken: e.target.value
            }));
            setEdited(true);
          }, placeholder: "123456:ABC-YourTelegramBotToken", className: "w-full h-9 px-3 rounded-md bg-background border border-border text-xs font-mono outline-none focus:ring-2 focus:ring-primary/40" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs text-muted-foreground", children: "Target chat ID" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: telegramConfig.chatId, onChange: (e) => {
            setTelegramConfig((prev) => ({
              ...prev,
              chatId: e.target.value
            }));
            setEdited(true);
          }, placeholder: "-1001234567890 or 123456789", className: "w-full h-9 px-3 rounded-md bg-background border border-border text-xs font-mono outline-none focus:ring-2 focus:ring-primary/40" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center justify-between rounded-md border border-border bg-background px-3 py-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs", children: "Enable notifications" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: telegramConfig.enabled, onChange: (e) => {
              setTelegramConfig((prev) => ({
                ...prev,
                enabled: e.target.checked
              }));
              setEdited(true);
            }, className: "size-4 accent-primary" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center justify-between rounded-md border border-border bg-background px-3 py-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs", children: "Test mode only" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: telegramConfig.testMode, onChange: (e) => {
              setTelegramConfig((prev) => ({
                ...prev,
                testMode: e.target.checked
              }));
              setEdited(true);
            }, className: "size-4 accent-primary" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline gap-3 mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold", children: "Tools schema" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "text-xs font-mono text-muted-foreground", children: "artifacts/tools.yaml" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3", children: toolsSchema.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-lg p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-sm font-semibold", children: t.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("ml-auto text-[10px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded border", t.core ? "bg-primary/15 text-primary border-primary/30" : "bg-tool-internal/15 text-tool-internal border-tool-internal/30"), children: t.core ? "Core" : "Bonus" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-3", children: t.desc }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-wider text-muted-foreground mb-1", children: "params" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1 flex-wrap", children: t.params.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-mono px-1.5 py-0.5 rounded bg-background border border-border", children: p }, p)) })
      ] }, t.name)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "bg-card border border-border rounded-lg p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold", children: "Environment preflight" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => {
          setChecking(true);
          setTimeout(() => {
            setChecking(false);
            toast.success("Preflight complete");
          }, 1200);
        }, className: "ml-auto inline-flex items-center gap-1.5 h-8 px-3 rounded-md border border-border bg-background hover:bg-accent text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: cn("size-3.5", checking && "animate-spin") }),
          " Run preflight check"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: preflight.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-3 p-3 rounded-md bg-background border border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("size-6 rounded-full grid place-items-center", p.ok ? "bg-success/15 text-success" : "bg-destructive/15 text-destructive"), children: p.ok ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "size-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "size-3.5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: p.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("ml-auto text-[10px] font-mono uppercase tracking-wider", p.ok ? "text-success" : "text-destructive"), children: p.ok ? "connected" : "unreachable" })
      ] }, p.name)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "bg-card border border-border rounded-lg overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 border-b border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold", children: "Historical transcripts" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "font-mono", children: "transcripts/*.transcript.json" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border", children: transcripts.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "w-full flex items-center gap-3 px-4 py-3 hover:bg-accent/40 text-left", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "size-4 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium", children: t.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] font-mono text-muted-foreground truncate", children: t.id })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-mono", children: t.date }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-primary", children: "Replay →" })
      ] }, t.id)) })
    ] })
  ] });
}
export {
  SettingsPage as component
};
