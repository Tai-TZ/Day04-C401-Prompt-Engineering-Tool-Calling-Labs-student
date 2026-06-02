import { r as reactExports, j as jsxRuntimeExports, R as React__default } from "../_libs/react.mjs";
import { c as cn$1 } from "./router-CI2z-wVe.mjs";
import { R as Root, P as Portal, C as Content, a as Close, T as Title, O as Overlay } from "../_libs/radix-ui__react-dialog.mjs";
import { P as Provider, R as Root3, T as Trigger, C as Content2 } from "../_libs/radix-ui__react-tooltip.mjs";
import "../_libs/sonner.mjs";
import { S as Sparkles, g as SquarePen, X, h as Paperclip, G as Globe, B as BrainCog, i as FolderCode, j as Square, k as CircleStop, a as ArrowUp, l as Mic } from "../_libs/lucide-react.mjs";
import { m as motion, A as AnimatePresence } from "../_libs/framer-motion.mjs";
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
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/react-remove-scroll.mjs";
import "tslib";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/radix-ui__react-arrow.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/@radix-ui/react-visually-hidden+[...].mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
const cn = (...classes) => classes.filter(Boolean).join(" ");
const Img = ({ alt = "", ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx("img", { alt, ...props });
const styles = `
  *:focus-visible {
    outline-offset: 0 !important;
    --ring-offset: 0 !important;
  }
  textarea::-webkit-scrollbar {
    width: 6px;
  }
  textarea::-webkit-scrollbar-track {
    background: transparent;
  }
  textarea::-webkit-scrollbar-thumb {
    background-color: #444444;
    border-radius: 3px;
  }
  textarea::-webkit-scrollbar-thumb:hover {
    background-color: #555555;
  }
`;
const useStyleInjection = () => {
  React__default.useEffect(() => {
    const styleId = "ai-prompt-box-styles";
    if (typeof document !== "undefined" && !document.getElementById(styleId)) {
      const styleSheet = document.createElement("style");
      styleSheet.id = styleId;
      styleSheet.innerText = styles;
      document.head.appendChild(styleSheet);
    }
  }, []);
};
const Textarea = React__default.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "textarea",
    {
      className: cn(
        "scrollbar-thin scrollbar-thumb-[#444444] scrollbar-track-transparent hover:scrollbar-thumb-[#555555] flex min-h-[44px] w-full resize-none rounded-md border-none bg-transparent px-3 py-2.5 text-base text-gray-100 placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ref,
      rows: 1,
      ...props
    }
  )
);
Textarea.displayName = "Textarea";
const TooltipProvider = Provider;
const Tooltip = Root3;
const TooltipTrigger = Trigger;
const TooltipContent = React__default.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Content2,
  {
    ref,
    sideOffset,
    className: cn(
      "fade-in-0 zoom-in-95 data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 animate-in overflow-hidden rounded-md border border-[#333333] bg-[#1F2023] px-3 py-1.5 text-sm text-white shadow-md data-[state=closed]:animate-out",
      className
    ),
    ...props
  }
));
TooltipContent.displayName = Content2.displayName;
const Dialog = Root;
const DialogPortal = Portal;
const DialogOverlay = React__default.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Overlay,
  {
    ref,
    className: cn(
      "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/60 backdrop-blur-sm data-[state=closed]:animate-out data-[state=open]:animate-in",
      className
    ),
    ...props
  }
));
DialogOverlay.displayName = Overlay.displayName;
const DialogContent = React__default.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogPortal, { children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx(DialogOverlay, {}),
  /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Content,
    {
      ref,
      className: cn(
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[90vw] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-2xl border border-[#333333] bg-[#1F2023] p-0 shadow-xl duration-300 data-[state=closed]:animate-out data-[state=open]:animate-in md:max-w-[800px]",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Close, { className: "absolute top-4 right-4 z-10 rounded-full bg-[#2E3033]/80 p-2 transition-all hover:bg-[#2E3033]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-5 w-5 text-gray-200 hover:text-white" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
DialogContent.displayName = Content.displayName;
const DialogTitle = React__default.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Title,
  {
    ref,
    className: cn(
      "font-semibold text-gray-100 text-lg leading-none tracking-tight",
      className
    ),
    ...props
  }
));
DialogTitle.displayName = Title.displayName;
const Button = React__default.forwardRef(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const variantClasses = {
      default: "bg-white hover:bg-white/80 text-black",
      outline: "border border-[#444444] bg-transparent hover:bg-[#3A3A40]",
      ghost: "bg-transparent hover:bg-[#3A3A40]"
    };
    const sizeClasses = {
      default: "h-10 px-4 py-2",
      sm: "h-8 px-3 text-sm",
      lg: "h-12 px-6",
      icon: "h-8 w-8 rounded-full aspect-[1/1]"
    };
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        className: cn(
          "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
          variantClasses[variant],
          sizeClasses[size],
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Button.displayName = "Button";
const VoiceRecorder = ({
  isRecording,
  onStartRecording,
  onStopRecording,
  visualizerBars = 32
}) => {
  const [time, setTime] = React__default.useState(0);
  const timerRef = React__default.useRef(null);
  React__default.useEffect(() => {
    if (isRecording) {
      onStartRecording();
      timerRef.current = setInterval(() => setTime((t) => t + 1), 1e3);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      onStopRecording(time);
      setTime(0);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRecording, time, onStartRecording, onStopRecording]);
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: cn(
        "flex w-full flex-col items-center justify-center py-3 transition-all duration-300",
        isRecording ? "opacity-100" : "h-0 opacity-0"
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 w-2 animate-pulse rounded-full bg-red-500" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-sm text-white/80", children: formatTime(time) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-10 w-full items-center justify-center gap-0.5 px-4", children: [...Array(visualizerBars)].map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "w-0.5 animate-pulse rounded-full bg-white/50",
            style: {
              height: `${Math.max(15, Math.random() * 100)}%`,
              animationDelay: `${i * 0.05}s`,
              animationDuration: `${0.5 + Math.random() * 0.5}s`
            }
          },
          i
        )) })
      ]
    }
  );
};
const ImageViewDialog = ({
  imageUrl,
  onClose
}) => {
  if (!imageUrl) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!imageUrl, onOpenChange: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-[90vw] border-none bg-transparent p-0 shadow-none md:max-w-[800px]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "sr-only", children: "Image Preview" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.95 },
        transition: { duration: 0.2, ease: "easeOut" },
        className: "relative overflow-hidden rounded-2xl bg-[#1F2023] shadow-2xl",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative max-h-[80vh] w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Img,
          {
            src: imageUrl,
            alt: "Full preview",
            width: 800,
            height: 600,
            className: "rounded-2xl object-contain"
          }
        ) })
      }
    )
  ] }) });
};
const PromptInputContext = React__default.createContext({
  isLoading: false,
  value: "",
  setValue: () => {
  },
  maxHeight: 240,
  onSubmit: void 0,
  disabled: false
});
function usePromptInput() {
  const context = React__default.useContext(PromptInputContext);
  if (!context)
    throw new Error("usePromptInput must be used within a PromptInput");
  return context;
}
const PromptInput = React__default.forwardRef(
  ({
    className,
    isLoading = false,
    maxHeight = 240,
    value,
    onValueChange,
    onSubmit,
    children,
    disabled = false,
    onDragOver,
    onDragLeave,
    onDrop
  }, ref) => {
    const [internalValue, setInternalValue] = React__default.useState(value || "");
    const handleChange = (newValue) => {
      setInternalValue(newValue);
      onValueChange?.(newValue);
    };
    return /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      PromptInputContext.Provider,
      {
        value: {
          isLoading,
          value: value ?? internalValue,
          setValue: onValueChange ?? handleChange,
          maxHeight,
          onSubmit,
          disabled
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            ref,
            className: cn(
              "rounded-3xl border border-[#444444] bg-[#1F2023] p-2 shadow-[0_8px_30px_rgba(0,0,0,0.24)] transition-all duration-300",
              isLoading && "border-red-500/70",
              className
            ),
            onDragOver,
            onDragLeave,
            onDrop,
            role: "form",
            "aria-label": "Prompt Input Area",
            children
          }
        )
      }
    ) });
  }
);
PromptInput.displayName = "PromptInput";
const PromptInputTextarea = ({
  className,
  onKeyDown,
  disableAutosize = false,
  placeholder,
  ...props
}) => {
  const { value, setValue, maxHeight, onSubmit, disabled } = usePromptInput();
  const textareaRef = React__default.useRef(null);
  React__default.useEffect(() => {
    if (disableAutosize || !textareaRef.current) return;
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height = typeof maxHeight === "number" ? `${Math.min(textareaRef.current.scrollHeight, maxHeight)}px` : `min(${textareaRef.current.scrollHeight}px, ${maxHeight})`;
  }, [maxHeight, disableAutosize]);
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSubmit?.();
    }
    onKeyDown?.(e);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Textarea,
    {
      ref: textareaRef,
      value,
      onChange: (e) => setValue(e.target.value),
      onKeyDown: handleKeyDown,
      className: cn("text-base", className),
      disabled,
      placeholder,
      ...props
    }
  );
};
const PromptInputActions = ({
  children,
  className,
  ...props
}) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("flex items-center gap-2", className), ...props, children });
const PromptInputAction = ({
  tooltip,
  children,
  className,
  side = "top",
  ...props
}) => {
  const { disabled } = usePromptInput();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Tooltip, { ...props, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipTrigger, { asChild: true, disabled, children }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipContent, { side, className, children: tooltip })
  ] });
};
const CustomDivider = () => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative mx-1 h-6 w-[1.5px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
  "div",
  {
    className: "absolute inset-0 rounded-full bg-gradient-to-t from-transparent via-[#9b87f5]/70 to-transparent",
    style: {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 40%, 140% 50%, 100% 60%, 100% 100%, 0% 100%, 0% 60%, -40% 50%, 0% 40%)"
    }
  }
) });
const PromptInputBox = React__default.forwardRef(
  (props, ref) => {
    const {
      onSend = () => {
      },
      isLoading = false,
      placeholder = "Type your message here...",
      className
    } = props;
    useStyleInjection();
    const [input, setInput] = React__default.useState("");
    const [files, setFiles] = React__default.useState([]);
    const [filePreviews, setFilePreviews] = React__default.useState({});
    const [selectedImage, setSelectedImage] = React__default.useState(
      null
    );
    const [isRecording, setIsRecording] = React__default.useState(false);
    const [showSearch, setShowSearch] = React__default.useState(false);
    const [showThink, setShowThink] = React__default.useState(false);
    const [showCanvas, setShowCanvas] = React__default.useState(false);
    const uploadInputRef = React__default.useRef(null);
    const promptBoxRef = React__default.useRef(null);
    const handleToggleChange = (value) => {
      if (value === "search") {
        setShowSearch((prev) => !prev);
        setShowThink(false);
      } else if (value === "think") {
        setShowThink((prev) => !prev);
        setShowSearch(false);
      }
    };
    const handleCanvasToggle = () => setShowCanvas((prev) => !prev);
    const isImageFile = (file) => file.type.startsWith("image/");
    const processFile = React__default.useCallback((file) => {
      if (!file.type.startsWith("image/")) {
        console.log("Only image files are allowed");
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        console.log("File too large (max 10MB)");
        return;
      }
      setFiles([file]);
      const reader = new FileReader();
      reader.onload = (e) => setFilePreviews({ [file.name]: e.target?.result });
      reader.readAsDataURL(file);
    }, []);
    const handleDragOver = React__default.useCallback((e) => {
      e.preventDefault();
      e.stopPropagation();
    }, []);
    const handleDragLeave = React__default.useCallback((e) => {
      e.preventDefault();
      e.stopPropagation();
    }, []);
    const handleDrop = React__default.useCallback(
      (e) => {
        e.preventDefault();
        e.stopPropagation();
        const files2 = Array.from(e.dataTransfer.files);
        const imageFiles = files2.filter((file) => isImageFile(file));
        if (imageFiles.length > 0 && imageFiles[0]) processFile(imageFiles[0]);
      },
      [isImageFile, processFile]
    );
    const handleRemoveFile = (index) => {
      const fileToRemove = files[index];
      if (fileToRemove && filePreviews[fileToRemove.name]) setFilePreviews({});
      setFiles([]);
    };
    const openImageModal = (imageUrl) => setSelectedImage(imageUrl);
    const handlePaste = React__default.useCallback(
      (e) => {
        const items = e.clipboardData?.items;
        if (!items) return;
        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          if (item && item.type.indexOf("image") !== -1) {
            const file = item.getAsFile();
            if (file) {
              e.preventDefault();
              processFile(file);
              break;
            }
          }
        }
      },
      [processFile]
    );
    React__default.useEffect(() => {
      document.addEventListener("paste", handlePaste);
      return () => document.removeEventListener("paste", handlePaste);
    }, [handlePaste]);
    const handleSubmit = () => {
      if (input.trim() || files.length > 0) {
        let messagePrefix = "";
        if (showSearch) messagePrefix = "[Search: ";
        else if (showThink) messagePrefix = "[Think: ";
        else if (showCanvas) messagePrefix = "[Canvas: ";
        const formattedInput = messagePrefix ? `${messagePrefix}${input}]` : input;
        onSend(formattedInput, files);
        setInput("");
        setFiles([]);
        setFilePreviews({});
      }
    };
    const handleStartRecording = () => console.log("Started recording");
    const handleStopRecording = (duration) => {
      console.log(`Stopped recording after ${duration} seconds`);
      setIsRecording(false);
      onSend(`[Voice message - ${duration} seconds]`, []);
    };
    const hasContent = input.trim() !== "" || files.length > 0;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        PromptInput,
        {
          value: input,
          onValueChange: setInput,
          isLoading,
          onSubmit: handleSubmit,
          className: cn(
            "w-full border-[#444444] bg-[#1F2023] shadow-[0_8px_30px_rgba(0,0,0,0.24)] transition-all duration-300 ease-in-out",
            isRecording && "border-red-500/70",
            className
          ),
          disabled: isLoading || isRecording,
          ref: ref || promptBoxRef,
          onDragOver: handleDragOver,
          onDragLeave: handleDragLeave,
          onDrop: handleDrop,
          children: [
            files.length > 0 && !isRecording && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 p-0 pb-1 transition-all duration-300", children: files.map((file, index) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "group relative", children: file.type.startsWith("image/") && filePreviews[file.name] && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "h-16 w-16 cursor-pointer overflow-hidden rounded-xl transition-all duration-300",
                onClick: () => {
                  const preview = filePreviews[file.name];
                  if (preview) openImageModal(preview);
                },
                role: "button",
                tabIndex: 0,
                onKeyDown: (e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    const preview = filePreviews[file.name];
                    if (preview) openImageModal(preview);
                  }
                },
                children: [
                  filePreviews[file.name] && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Img,
                    {
                      src: filePreviews[file.name] || "",
                      alt: file.name,
                      width: 64,
                      height: 64,
                      className: "h-full w-full object-cover"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      onClick: (e) => {
                        e.stopPropagation();
                        handleRemoveFile(index);
                      },
                      className: "absolute top-1 right-1 rounded-full bg-black/70 p-0.5 opacity-100 transition-opacity",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3 w-3 text-white" })
                    }
                  )
                ]
              }
            ) }, index)) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: cn(
                  "transition-all duration-300",
                  isRecording ? "h-0 overflow-hidden opacity-0" : "opacity-100"
                ),
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  PromptInputTextarea,
                  {
                    placeholder: showSearch ? "Search the web..." : showThink ? "Think deeply..." : showCanvas ? "Create on canvas..." : placeholder,
                    className: "text-base"
                  }
                )
              }
            ),
            isRecording && /* @__PURE__ */ jsxRuntimeExports.jsx(
              VoiceRecorder,
              {
                isRecording,
                onStartRecording: handleStartRecording,
                onStopRecording: handleStopRecording
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(PromptInputActions, { className: "flex items-center justify-between gap-2 p-0 pt-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: cn(
                    "flex items-center gap-1 transition-opacity duration-300",
                    isRecording ? "invisible h-0 opacity-0" : "visible opacity-100"
                  ),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(PromptInputAction, { tooltip: "Upload image", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "button",
                      {
                        onClick: () => uploadInputRef.current?.click(),
                        className: "flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-[#9CA3AF] transition-colors hover:bg-gray-600/30 hover:text-[#D1D5DB]",
                        disabled: isRecording,
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Paperclip, { className: "h-5 w-5 transition-colors" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "input",
                            {
                              ref: uploadInputRef,
                              type: "file",
                              className: "hidden",
                              onChange: (e) => {
                                if (e.target.files && e.target.files.length > 0) {
                                  const file = e.target.files[0];
                                  if (file) processFile(file);
                                }
                                if (e.target) e.target.value = "";
                              },
                              accept: "image/*"
                            }
                          )
                        ]
                      }
                    ) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "button",
                        {
                          type: "button",
                          onClick: () => handleToggleChange("search"),
                          className: cn(
                            "flex h-8 items-center gap-1 rounded-full border px-2 py-1 transition-all",
                            showSearch ? "border-[#1EAEDB] bg-[#1EAEDB]/15 text-[#1EAEDB]" : "border-transparent bg-transparent text-[#9CA3AF] hover:text-[#D1D5DB]"
                          ),
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-5 w-5 flex-shrink-0 items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                              motion.div,
                              {
                                animate: {
                                  rotate: showSearch ? 360 : 0,
                                  scale: showSearch ? 1.1 : 1
                                },
                                whileHover: {
                                  rotate: showSearch ? 360 : 15,
                                  scale: 1.1,
                                  transition: {
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 10
                                  }
                                },
                                transition: {
                                  type: "spring",
                                  stiffness: 260,
                                  damping: 25
                                },
                                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  Globe,
                                  {
                                    className: cn(
                                      "h-4 w-4",
                                      showSearch ? "text-[#1EAEDB]" : "text-inherit"
                                    )
                                  }
                                )
                              }
                            ) }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: showSearch && /* @__PURE__ */ jsxRuntimeExports.jsx(
                              motion.span,
                              {
                                initial: { width: 0, opacity: 0 },
                                animate: { width: "auto", opacity: 1 },
                                exit: { width: 0, opacity: 0 },
                                transition: { duration: 0.2 },
                                className: "flex-shrink-0 overflow-hidden whitespace-nowrap text-[#1EAEDB] text-xs",
                                children: "Search"
                              }
                            ) })
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CustomDivider, {}),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "button",
                        {
                          type: "button",
                          onClick: () => handleToggleChange("think"),
                          className: cn(
                            "flex h-8 items-center gap-1 rounded-full border px-2 py-1 transition-all",
                            showThink ? "border-[#8B5CF6] bg-[#8B5CF6]/15 text-[#8B5CF6]" : "border-transparent bg-transparent text-[#9CA3AF] hover:text-[#D1D5DB]"
                          ),
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-5 w-5 flex-shrink-0 items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                              motion.div,
                              {
                                animate: {
                                  rotate: showThink ? 360 : 0,
                                  scale: showThink ? 1.1 : 1
                                },
                                whileHover: {
                                  rotate: showThink ? 360 : 15,
                                  scale: 1.1,
                                  transition: {
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 10
                                  }
                                },
                                transition: {
                                  type: "spring",
                                  stiffness: 260,
                                  damping: 25
                                },
                                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  BrainCog,
                                  {
                                    className: cn(
                                      "h-4 w-4",
                                      showThink ? "text-[#8B5CF6]" : "text-inherit"
                                    )
                                  }
                                )
                              }
                            ) }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: showThink && /* @__PURE__ */ jsxRuntimeExports.jsx(
                              motion.span,
                              {
                                initial: { width: 0, opacity: 0 },
                                animate: { width: "auto", opacity: 1 },
                                exit: { width: 0, opacity: 0 },
                                transition: { duration: 0.2 },
                                className: "flex-shrink-0 overflow-hidden whitespace-nowrap text-[#8B5CF6] text-xs",
                                children: "Think"
                              }
                            ) })
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CustomDivider, {}),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "button",
                        {
                          type: "button",
                          onClick: handleCanvasToggle,
                          className: cn(
                            "flex h-8 items-center gap-1 rounded-full border px-2 py-1 transition-all",
                            showCanvas ? "border-[#F97316] bg-[#F97316]/15 text-[#F97316]" : "border-transparent bg-transparent text-[#9CA3AF] hover:text-[#D1D5DB]"
                          ),
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-5 w-5 flex-shrink-0 items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                              motion.div,
                              {
                                animate: {
                                  rotate: showCanvas ? 360 : 0,
                                  scale: showCanvas ? 1.1 : 1
                                },
                                whileHover: {
                                  rotate: showCanvas ? 360 : 15,
                                  scale: 1.1,
                                  transition: {
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 10
                                  }
                                },
                                transition: {
                                  type: "spring",
                                  stiffness: 260,
                                  damping: 25
                                },
                                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  FolderCode,
                                  {
                                    className: cn(
                                      "h-4 w-4",
                                      showCanvas ? "text-[#F97316]" : "text-inherit"
                                    )
                                  }
                                )
                              }
                            ) }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: showCanvas && /* @__PURE__ */ jsxRuntimeExports.jsx(
                              motion.span,
                              {
                                initial: { width: 0, opacity: 0 },
                                animate: { width: "auto", opacity: 1 },
                                exit: { width: 0, opacity: 0 },
                                transition: { duration: 0.2 },
                                className: "flex-shrink-0 overflow-hidden whitespace-nowrap text-[#F97316] text-xs",
                                children: "Canvas"
                              }
                            ) })
                          ]
                        }
                      )
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                PromptInputAction,
                {
                  tooltip: isLoading ? "Stop generation" : isRecording ? "Stop recording" : hasContent ? "Send message" : "Voice message",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      variant: "default",
                      size: "icon",
                      className: cn(
                        "h-8 w-8 rounded-full transition-all duration-200",
                        isRecording ? "bg-transparent text-red-500 hover:bg-gray-600/30 hover:text-red-400" : hasContent ? "bg-white text-[#1F2023] hover:bg-white/80" : "bg-transparent text-[#9CA3AF] hover:bg-gray-600/30 hover:text-[#D1D5DB]"
                      ),
                      onClick: () => {
                        if (isRecording) setIsRecording(false);
                        else if (hasContent) handleSubmit();
                        else setIsRecording(true);
                      },
                      disabled: isLoading && !hasContent,
                      children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Square, { className: "h-4 w-4 animate-pulse fill-[#1F2023]" }) : isRecording ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleStop, { className: "h-5 w-5 text-red-500" }) : hasContent ? /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUp, { className: "h-4 w-4 text-[#1F2023]" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Mic, { className: "h-5 w-5 text-[#1F2023] transition-colors" })
                    }
                  )
                }
              )
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        ImageViewDialog,
        {
          imageUrl: selectedImage,
          onClose: () => setSelectedImage(null)
        }
      )
    ] });
  }
);
PromptInputBox.displayName = "PromptInputBox";
const suggestions = ["Summarize my agent activity today", "Help me write a system prompt", "Explain tool calling best practices", "Debug a failed tool invocation"];
const mockReplies = ["I can help with that. Based on your OpenClaw setup, I'd start by reviewing the latest run logs and checking which tools were invoked.", "Here's a concise approach: define clear tool boundaries, keep the system prompt focused, and validate tool outputs before passing them back to the model.", "Tool calling works best when each tool has a single responsibility and the model receives explicit instructions on when to use it versus answering directly."];
function ChatPage() {
  const [messages, setMessages] = reactExports.useState([]);
  const [isTyping, setIsTyping] = reactExports.useState(false);
  const scrollRef = reactExports.useRef(null);
  const hasMessages = messages.length > 0;
  reactExports.useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth"
    });
  }, [messages, isTyping]);
  function sendMessage(text) {
    const trimmed = text.trim();
    if (!trimmed || isTyping) return;
    const userMsg = {
      id: crypto.randomUUID(),
      role: "user",
      content: trimmed
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);
    window.setTimeout(() => {
      const reply = mockReplies[Math.floor(Math.random() * mockReplies.length)];
      setMessages((prev) => [...prev, {
        id: crypto.randomUUID(),
        role: "assistant",
        content: reply
      }]);
      setIsTyping(false);
    }, 900);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col h-[calc(100vh)]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "shrink-0 flex items-center justify-between px-6 h-14 border-b border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "size-4 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium", children: "OpenClaw Chat" })
      ] }),
      hasMessages && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setMessages([]), className: "inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SquarePen, { className: "size-3.5" }),
        "New chat"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: scrollRef, className: "flex-1 overflow-y-auto", children: !hasMessages ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col items-center justify-center min-h-full px-6 pb-32", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl w-full text-center space-y-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl sm:text-5xl font-normal tracking-tight bg-gradient-to-r from-primary via-foreground to-primary/70 bg-clip-text text-transparent", children: "Hello" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg text-muted-foreground", children: "What would you like to explore today?" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl mx-auto", children: suggestions.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => sendMessage(s), className: "text-left px-4 py-3.5 rounded-2xl border border-border bg-card/50 hover:bg-accent/60 text-sm text-foreground/90 transition-colors", children: s }, s)) })
    ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-8", children: [
      messages.map((msg) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn$1("flex gap-4", msg.role === "user" ? "justify-end" : "justify-start"), children: [
        msg.role === "assistant" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-8 shrink-0 rounded-full bg-primary/15 grid place-items-center text-primary mt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "size-4" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn$1("max-w-[85%] text-[15px] leading-relaxed", msg.role === "user" ? "rounded-3xl rounded-br-md bg-secondary px-4 py-3 text-foreground" : "text-foreground/95 pt-1"), children: msg.content })
      ] }, msg.id)),
      isTyping && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-8 shrink-0 rounded-full bg-primary/15 grid place-items-center text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "size-4" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 pt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "size-2 rounded-full bg-muted-foreground/60 animate-bounce [animation-delay:0ms]" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "size-2 rounded-full bg-muted-foreground/60 animate-bounce [animation-delay:150ms]" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "size-2 rounded-full bg-muted-foreground/60 animate-bounce [animation-delay:300ms]" })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shrink-0 px-4 sm:px-6 pb-6 pt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(PromptInputBox, { isLoading: isTyping, placeholder: "Ask OpenClaw anything...", onSend: (text) => sendMessage(text) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-[11px] text-muted-foreground mt-3", children: "OpenClaw can make mistakes. Verify important information." })
    ] }) })
  ] });
}
export {
  ChatPage as component
};
