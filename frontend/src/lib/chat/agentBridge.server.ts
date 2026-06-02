import { spawn } from "node:child_process"
import path from "node:path"

type RunTurnArgs = {
  provider: "openrouter" | "openai" | "anthropic" | "gemini"
  model: string | null
  version: string
  systemPromptPath: string
  toolsPath: string
  historyWindow: number
  maxToolRounds: number
  priorTurns: Array<{ role: "user" | "assistant"; content: string }>
  userText: string
}

type RunTurnResult = {
  status: "answered" | "waiting_for_user" | "max_tool_rounds" | "provider_error"
  assistant_text: string
  rounds: unknown[]
  tool_events: unknown[]
  artifact_version: string
  prompt_hash: string
  tools_hash: string
  provider: string
  model: string | null
}

function projectRoot(): string {
  // frontend/ is the working directory in dev/build
  return path.resolve(process.cwd(), "..")
}

function starterV0Dir(): string {
  return path.join(projectRoot(), "starter_v0")
}

export async function runAgentTurn(args: RunTurnArgs): Promise<RunTurnResult> {
  const scriptPath = path.join(starterV0Dir(), "ui_turn.py")
  const pythonExe = process.env.PYTHON ?? "python"

  const payload = JSON.stringify({
    provider: args.provider,
    model: args.model,
    version: args.version,
    system_prompt: args.systemPromptPath,
    tools: args.toolsPath,
    history_window: args.historyWindow,
    max_tool_rounds: args.maxToolRounds,
    prior_turns: args.priorTurns,
    user_text: args.userText,
  })

  return await new Promise((resolve, reject) => {
    const child = spawn(pythonExe, [scriptPath], {
      cwd: starterV0Dir(),
      stdio: ["pipe", "pipe", "pipe"],
      env: process.env,
    })

    let stdout = ""
    let stderr = ""

    child.stdout.on("data", (chunk) => {
      stdout += String(chunk)
    })
    child.stderr.on("data", (chunk) => {
      stderr += String(chunk)
    })
    child.on("error", (err) => reject(err))
    child.on("close", (code) => {
      if (code !== 0) {
        reject(new Error(`ui_turn.py exited ${code}. ${stderr || stdout}`))
        return
      }
      try {
        resolve(JSON.parse(stdout) as RunTurnResult)
      } catch (err) {
        reject(new Error(`Invalid JSON from ui_turn.py. ${stderr || ""}`))
      }
    })

    child.stdin.write(payload)
    child.stdin.end()
  })
}

