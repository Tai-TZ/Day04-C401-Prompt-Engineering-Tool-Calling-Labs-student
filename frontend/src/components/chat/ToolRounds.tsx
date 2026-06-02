import { useMemo } from "react";
import { ChevronRight, Wrench } from "lucide-react";

import type { ChatRound } from "@/lib/chat/types";
import { cn } from "@/lib/utils";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function summarizeToolResult(result: unknown): { label: string; variant: "secondary" | "destructive" | "outline" }[] {
  if (!isRecord(result)) return [{ label: "result", variant: "outline" }];
  if (typeof result.error === "string") return [{ label: `error: ${result.error}`, variant: "destructive" }];
  if (typeof result.status === "string" && result.status !== "sent") return [{ label: result.status, variant: "secondary" }];
  if (Array.isArray(result.items)) return [{ label: `${result.items.length} items`, variant: "secondary" }];
  return [{ label: "ok", variant: "secondary" }];
}

function prettyArgs(args: Record<string, unknown>): string {
  const keys = Object.keys(args);
  if (keys.length === 0) return "{}";
  const shown = keys.slice(0, 3).map((k) => `${k}=${String(args[k])}`);
  return `{ ${shown.join(", ")}${keys.length > 3 ? ", …" : ""} }`;
}

export function ToolRounds({ rounds }: { rounds: ChatRound[] }) {
  const hasAnyTools = useMemo(() => rounds.some((r) => r.tool_calls.length > 0), [rounds]);

  return (
    <div className="mt-2">
      <Accordion type="single" collapsible className="rounded-lg border border-border bg-card/40">
        <AccordionItem value="tool-rounds" className="border-b-0">
          <AccordionTrigger className="px-3 py-2 hover:no-underline">
            <div className="flex items-center gap-2">
              <Wrench className="size-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Tool rounds</span>
              <Badge variant="outline" className="text-[10px]">
                {rounds.length}
              </Badge>
              {!hasAnyTools && (
                <Badge variant="secondary" className="text-[10px]">
                  no tool calls
                </Badge>
              )}
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-3 pb-3">
            <Tabs defaultValue="summary">
              <TabsList className="h-8">
                <TabsTrigger value="summary" className="text-xs">
                  Summary
                </TabsTrigger>
                <TabsTrigger value="raw" className="text-xs">
                  Raw JSON
                </TabsTrigger>
              </TabsList>

              <TabsContent value="summary" className="mt-3">
                <div className="space-y-3">
                  {rounds.map((round) => (
                    <div key={round.round} className="rounded-lg border border-border bg-background/40">
                      <div className="flex items-center justify-between px-3 py-2">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-[10px]">
                            Round {round.round}
                          </Badge>
                          {round.tool_calls.length > 0 ? (
                            <Badge variant="secondary" className="text-[10px]">
                              {round.tool_calls.length} call{round.tool_calls.length === 1 ? "" : "s"}
                            </Badge>
                          ) : (
                            <Badge variant="secondary" className="text-[10px]">
                              no calls
                            </Badge>
                          )}
                        </div>
                      </div>

                      {round.tool_calls.length > 0 && (
                        <div className="px-3 pb-3 space-y-2">
                          {round.tool_calls.map((call, idx) => (
                            <div key={`${call.name}-${idx}`} className="flex items-start gap-2">
                              <ChevronRight className="mt-[2px] size-4 text-muted-foreground" />
                              <div className="min-w-0 flex-1">
                                <div className="flex flex-wrap items-center gap-2">
                                  <span className="font-mono text-[12px] text-foreground">{call.name}</span>
                                  <span className="font-mono text-[11px] text-muted-foreground">
                                    {prettyArgs(call.args)}
                                  </span>
                                </div>
                                {round.tool_results[idx] && (
                                  <div className="mt-1 flex flex-wrap gap-1.5">
                                    {summarizeToolResult(round.tool_results[idx].result).map((b) => (
                                      <Badge
                                        key={b.label}
                                        variant={b.variant}
                                        className={cn("text-[10px]", b.variant === "destructive" && "font-medium")}
                                      >
                                        {b.label}
                                      </Badge>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="raw">
                <pre className="mt-3 whitespace-pre-wrap rounded-lg border border-border bg-background/40 p-3 overflow-auto max-h-72 text-[11px] text-muted-foreground">
                  {JSON.stringify(rounds, null, 2)}
                </pre>
              </TabsContent>
            </Tabs>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

