import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { c as cn } from "./router-CI2z-wVe.mjs";
import { v as versionLog, s as systemPromptContent } from "./mock-data-PaWIawBq.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { U as User, F as FileCodeCorner, E as ExternalLink, a as ArrowUp, b as ArrowDown, C as Copy } from "../_libs/lucide-react.mjs";
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
function VersionsPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-8 max-w-6xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-semibold tracking-tight", children: "Version history" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-1", children: [
        "Structural changes committed to ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "font-mono text-xs", children: "artifacts/version_log.csv" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-[15px] top-2 bottom-2 w-px bg-border" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: versionLog.map((v) => /* @__PURE__ */ jsxRuntimeExports.jsx(VersionCard, { v }, v.version)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(DiffViewer, {})
  ] });
}
function VersionCard({
  v
}) {
  const copy = (text, label) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied`);
  };
  const deltas = [{
    k: "case_accuracy",
    val: v.metrics.case
  }, {
    k: "routing",
    val: v.metrics.routing
  }, {
    k: "args",
    val: v.metrics.args
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative pl-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-0 top-4 size-8 rounded-full bg-primary/15 text-primary border-2 border-background grid place-items-center font-mono text-xs font-semibold", children: v.version }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-lg p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4 flex-wrap", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-xs text-muted-foreground mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "size-3" }),
              " ",
              v.author
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FileCodeCorner, { className: "size-3" }),
              " ",
              v.artifact
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-base font-semibold", children: v.hypothesis }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: v.rationale })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "#", className: "inline-flex items-center gap-1.5 text-xs text-primary hover:underline", children: [
          "run JSON ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "size-3" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-2 mt-4", children: deltas.map((d) => {
        const diff = d.val[1] - d.val[0];
        const up = diff > 0;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-md bg-background border border-border p-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-wider text-muted-foreground font-mono", children: d.k }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline gap-1.5 mt-0.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-xs text-muted-foreground", children: [
              d.val[0],
              "%"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: "→" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-sm font-semibold", children: [
              d.val[1],
              "%"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: cn("ml-auto inline-flex items-center text-xs font-mono", up ? "text-success" : "text-destructive"), children: [
              up ? /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUp, { className: "size-3" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDown, { className: "size-3" }),
              Math.abs(diff)
            ] })
          ] })
        ] }, d.k);
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mt-3 flex-wrap", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(HashChip, { label: "prompt_hash", hash: v.prompt_hash, onCopy: () => copy(v.prompt_hash, "prompt_hash") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(HashChip, { label: "tools_hash", hash: v.tools_hash, onCopy: () => copy(v.tools_hash, "tools_hash") })
      ] })
    ] })
  ] });
}
function HashChip({
  label,
  hash,
  onCopy
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: onCopy, className: "inline-flex items-center gap-2 text-xs font-mono px-2 py-1 rounded-md bg-background border border-border hover:border-primary/40 transition-colors group", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: hash }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "size-3 text-muted-foreground group-hover:text-primary" })
  ] });
}
function DiffViewer() {
  const [from, setFrom] = reactExports.useState("v2");
  const [to, setTo] = reactExports.useState("v3");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-lg overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 p-4 border-b border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold", children: "Side-by-side diff" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-auto flex items-center gap-2 text-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: from, onChange: (e) => setFrom(e.target.value), className: "h-8 bg-background border border-border rounded-md px-2", children: versionLog.map((v) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: v.version }, v.version)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "→" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: to, onChange: (e) => setTo(e.target.value), className: "h-8 bg-background border border-border rounded-md px-2", children: versionLog.map((v) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: v.version }, v.version)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 divide-x divide-border font-mono text-xs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("pre", { className: "p-4 overflow-x-auto whitespace-pre-wrap", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
          "# system_prompt.md @ ",
          from
        ] }),
        "\n\n",
        systemPromptContent.split("\n").slice(0, 14).map((line, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn(i === 6 && "bg-destructive/15 text-destructive -mx-4 px-4"), children: [
          i === 6 && "- ",
          line || " "
        ] }, i))
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("pre", { className: "p-4 overflow-x-auto whitespace-pre-wrap", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
          "# system_prompt.md @ ",
          to
        ] }),
        "\n\n",
        systemPromptContent.split("\n").slice(0, 14).map((line, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn((i === 6 || i === 7) && "bg-success/15 text-success -mx-4 px-4"), children: [
          (i === 6 || i === 7) && "+ ",
          line || " "
        ] }, i))
      ] })
    ] })
  ] });
}
export {
  VersionsPage as component
};
