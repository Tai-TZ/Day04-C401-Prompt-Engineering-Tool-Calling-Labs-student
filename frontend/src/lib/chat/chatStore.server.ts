import { promises as fs } from "node:fs"
import path from "node:path"

import type { Conversation } from "./types"

function nowIso(): string {
  return new Date().toISOString()
}

function safeId(value: string): string {
  return value.replace(/[^A-Za-z0-9_.-]+/g, "_")
}

function dataDir(): string {
  // Store chat history under the frontend project so it works in dev/build.
  return path.join(process.cwd(), ".chat-data")
}

function conversationsDir(): string {
  return path.join(dataDir(), "conversations")
}

function conversationPath(conversationId: string): string {
  return path.join(conversationsDir(), `${safeId(conversationId)}.json`)
}

export async function ensureChatDirs(): Promise<void> {
  await fs.mkdir(conversationsDir(), { recursive: true })
}

export async function listConversations(): Promise<
  Array<Pick<Conversation, "conversation_id" | "title" | "created_at" | "updated_at" | "provider" | "version">>
> {
  await ensureChatDirs()
  const files = await fs.readdir(conversationsDir())
  const jsonFiles = files.filter((f) => f.endsWith(".json"))
  const items: Array<
    Pick<Conversation, "conversation_id" | "title" | "created_at" | "updated_at" | "provider" | "version">
  > = []
  for (const file of jsonFiles) {
    const full = path.join(conversationsDir(), file)
    try {
      const raw = await fs.readFile(full, "utf-8")
      const conv = JSON.parse(raw) as Conversation
      items.push({
        conversation_id: conv.conversation_id,
        title: conv.title,
        created_at: conv.created_at,
        updated_at: conv.updated_at,
        provider: conv.provider,
        version: conv.version,
      })
    } catch {
      // Ignore corrupted files; they shouldn't block the UI.
    }
  }
  items.sort((a, b) => (a.updated_at < b.updated_at ? 1 : -1))
  return items
}

export async function readConversation(conversationId: string): Promise<Conversation | null> {
  await ensureChatDirs()
  try {
    const raw = await fs.readFile(conversationPath(conversationId), "utf-8")
    return JSON.parse(raw) as Conversation
  } catch {
    return null
  }
}

export async function writeConversation(conversation: Conversation): Promise<void> {
  await ensureChatDirs()
  await fs.writeFile(conversationPath(conversation.conversation_id), JSON.stringify(conversation, null, 2), "utf-8")
}

export function newConversationId(): string {
  const ts = new Date().toISOString().replace(/[:.]/g, "")
  return `c_${ts}_${Math.random().toString(16).slice(2)}`
}

export function newConversation(params: Omit<Conversation, "conversation_id" | "title" | "created_at" | "updated_at" | "turns"> & { title?: string }): Conversation {
  const created_at = nowIso()
  return {
    conversation_id: newConversationId(),
    title: params.title ?? "New chat",
    created_at,
    updated_at: created_at,
    version: params.version,
    artifact_version: params.artifact_version,
    prompt_hash: params.prompt_hash,
    tools_hash: params.tools_hash,
    provider: params.provider,
    model: params.model,
    turns: [],
  }
}

export function bumpConversationTitle(conversation: Conversation): Conversation {
  if (conversation.title !== "New chat") return conversation
  const firstUser = conversation.turns.find((t) => t.user.trim().length > 0)?.user.trim()
  if (!firstUser) return conversation
  return { ...conversation, title: firstUser.slice(0, 60) }
}

export function touchConversation(conversation: Conversation): Conversation {
  return { ...conversation, updated_at: nowIso() }
}

