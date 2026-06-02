export type ToolCall = {
  name: string
  args: Record<string, unknown>
}

export type ToolEvent = {
  tool: string
  args: Record<string, unknown>
  result: unknown
}

export type ChatRound = {
  round: number
  assistant_text: string | null
  tool_calls: ToolCall[]
  tool_results: ToolEvent[]
}

export type ChatTurn = {
  turn_index: number
  started_at: string
  ended_at: string
  user: string
  status: "answered" | "waiting_for_user" | "max_tool_rounds" | "provider_error"
  assistant_text: string
  rounds: ChatRound[]
  tool_events: ToolEvent[]
}

export type Conversation = {
  conversation_id: string
  title: string
  created_at: string
  updated_at: string
  version: string
  artifact_version: string
  prompt_hash: string
  tools_hash: string
  provider: string
  model: string | null
  turns: ChatTurn[]
}

