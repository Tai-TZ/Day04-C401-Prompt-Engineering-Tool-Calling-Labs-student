import path from "node:path"

import { createServerFn } from "@tanstack/react-start"
import { z } from "zod"

import type { Conversation } from "./types"
import { runAgentTurn } from "./agentBridge.server"
import {
  bumpConversationTitle,
  listConversations,
  newConversation,
  readConversation,
  touchConversation,
  writeConversation,
} from "./chatStore.server"

function projectRoot(): string {
  return path.resolve(process.cwd(), "..")
}

function starterV0Artifacts(): { systemPromptPath: string; toolsPath: string } {
  const root = projectRoot()
  return {
    systemPromptPath: path.join(root, "starter_v0", "artifacts", "system_prompt.md"),
    toolsPath: path.join(root, "starter_v0", "artifacts", "tools.yaml"),
  }
}

export const listChats = createServerFn({ method: "POST" }).handler(async () => {
  return await listConversations()
})

export const getChat = createServerFn({ method: "POST" })
  .inputValidator(z.object({ conversation_id: z.string().min(1) }))
  .handler(async ({ data }) => {
    return await readConversation(data.conversation_id)
  })

export const sendChatMessage = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      conversation_id: z.string().optional(),
      user_text: z.string().min(1),
      provider: z.enum(["openrouter", "openai", "anthropic", "gemini"]).default("openrouter"),
      model: z.string().nullable().default(null),
      version: z.string().default("ui"),
      history_window: z.number().int().min(1).max(20).default(5),
      max_tool_rounds: z.number().int().min(1).max(10).default(4),
    }),
  )
  .handler(async ({ data }) => {
    const artifacts = starterV0Artifacts()
    const existing = data.conversation_id ? await readConversation(data.conversation_id) : null

    let conversation: Conversation
    if (existing) {
      conversation = existing
    } else {
      // Placeholder hashes; will be overwritten by the first model turn result.
      conversation = newConversation({
        provider: data.provider,
        model: data.model,
        version: data.version,
        artifact_version: "unknown",
        prompt_hash: "unknown",
        tools_hash: "unknown",
      })
    }

    const priorTurns = conversation.turns.flatMap((t) => [
      { role: "user" as const, content: t.user },
      { role: "assistant" as const, content: t.assistant_text },
    ])

    const started_at = new Date().toISOString()
    try {
      const turn = await runAgentTurn({
        provider: data.provider,
        model: data.model,
        version: data.version,
        systemPromptPath: artifacts.systemPromptPath,
        toolsPath: artifacts.toolsPath,
        historyWindow: data.history_window,
        maxToolRounds: data.max_tool_rounds,
        priorTurns,
        userText: data.user_text,
      })

      const ended_at = new Date().toISOString()
      const turn_index = conversation.turns.length + 1

      conversation = {
        ...conversation,
        provider: String(turn.provider),
        model: turn.model,
        version: data.version,
        artifact_version: turn.artifact_version,
        prompt_hash: turn.prompt_hash,
        tools_hash: turn.tools_hash,
        turns: [
          ...conversation.turns,
          {
            turn_index,
            started_at,
            ended_at,
            user: data.user_text,
            status: turn.status,
            assistant_text: turn.assistant_text,
            rounds: (turn.rounds as any) ?? [],
            tool_events: (turn.tool_events as any) ?? [],
          },
        ],
      }

      conversation = bumpConversationTitle(touchConversation(conversation))
      await writeConversation(conversation)

      return {
        conversation_id: conversation.conversation_id,
        assistant_text: turn.assistant_text,
        status: turn.status,
        rounds: turn.rounds,
        tool_events: turn.tool_events,
        conversation,
      }
    } catch (err) {
      const ended_at = new Date().toISOString()
      const turn_index = conversation.turns.length + 1
      const message = err instanceof Error ? err.message : String(err)
      conversation = {
        ...conversation,
        turns: [
          ...conversation.turns,
          {
            turn_index,
            started_at,
            ended_at,
            user: data.user_text,
            status: "provider_error",
            assistant_text: `ERROR: ${message}`,
            rounds: [],
            tool_events: [],
          },
        ],
      }
      conversation = bumpConversationTitle(touchConversation(conversation))
      await writeConversation(conversation)
      return {
        conversation_id: conversation.conversation_id,
        assistant_text: `ERROR: ${message}`,
        status: "provider_error" as const,
        rounds: [],
        tool_events: [],
        conversation,
      }
    }
  })

