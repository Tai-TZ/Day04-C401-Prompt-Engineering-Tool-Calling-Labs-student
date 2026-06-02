from __future__ import annotations

import os
import uuid
from datetime import datetime
from pathlib import Path
from typing import Any, Literal

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from chat import (
    ARTIFACTS_DIR,
    ROOT,
    now_iso,
    run_model_tool_loop,
    safe_slug,
    trim_history,
    write_transcript,
)
from env_loader import load_lab_env
from providers import make_provider
from tools import load_tool_declarations, to_openai_tools
from versioning import artifact_version_dict, build_artifact_version

load_lab_env(ROOT)

DEFAULT_PROVIDER = os.getenv("CHAT_PROVIDER", "openrouter")
DEFAULT_VERSION = os.getenv("CHAT_VERSION", "v3")
DEFAULT_MODEL = os.getenv("CHAT_MODEL") or None
HISTORY_WINDOW = int(os.getenv("CHAT_HISTORY_WINDOW", "5"))
MAX_TOOL_ROUNDS = int(os.getenv("CHAT_MAX_TOOL_ROUNDS", "4"))
CORS_ORIGINS = [
    origin.strip()
    for origin in os.getenv("CORS_ORIGINS", "*").split(",")
    if origin.strip()
]

system_prompt_path = ARTIFACTS_DIR / "system_prompt.md"
tools_path = ARTIFACTS_DIR / "tools.yaml"
system_prompt = system_prompt_path.read_text(encoding="utf-8")
tool_declarations = load_tool_declarations(tools_path)
openai_tools = to_openai_tools(tool_declarations)
provider = make_provider(DEFAULT_PROVIDER)
artifact_version = build_artifact_version(DEFAULT_VERSION, system_prompt_path, tools_path)
transcripts_dir = ROOT / "transcripts"

# session_id -> transcript dict + path
_sessions: dict[str, dict[str, Any]] = {}


class HistoryMessage(BaseModel):
    role: Literal["user", "assistant"]
    content: str


class ChatRequest(BaseModel):
    message: str = Field(min_length=1)
    history: list[HistoryMessage] = Field(default_factory=list)
    session_id: str | None = None


class ChatResponse(BaseModel):
    reply: str
    status: str
    session_id: str
    tool_events: list[dict[str, Any]] = Field(default_factory=list)


app = FastAPI(title="Research Agent API", version="1.0.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"] if CORS_ORIGINS == ["*"] else CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def _ensure_session(session_id: str | None) -> tuple[str, dict[str, Any], Path]:
    if session_id and session_id in _sessions:
        entry = _sessions[session_id]
        return session_id, entry["transcript"], entry["path"]

    new_id = session_id or uuid.uuid4().hex
    timestamp = datetime.now().strftime("%Y%m%dT%H%M%S%f")
    transcript_id = "_".join([safe_slug(DEFAULT_VERSION), safe_slug(DEFAULT_PROVIDER), timestamp])
    transcript_path = transcripts_dir / f"{transcript_id}.transcript.json"
    transcript: dict[str, Any] = {
        "transcript_id": transcript_id,
        **artifact_version_dict(artifact_version),
        "provider": DEFAULT_PROVIDER,
        "model": DEFAULT_MODEL or getattr(provider, "default_model", None),
        "system_prompt": str(system_prompt_path),
        "tools": str(tools_path),
        "history_window": HISTORY_WINDOW,
        "max_tool_rounds": MAX_TOOL_ROUNDS,
        "session_id": new_id,
        "created_at": now_iso(),
        "updated_at": now_iso(),
        "turns": [],
    }
    _sessions[new_id] = {"transcript": transcript, "path": transcript_path}
    return new_id, transcript, transcript_path


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok", "provider": DEFAULT_PROVIDER, "version": DEFAULT_VERSION}


@app.post("/api/chat", response_model=ChatResponse)
def chat(request: ChatRequest) -> ChatResponse:
    user_text = request.message.strip()
    if not user_text:
        raise HTTPException(status_code=400, detail="message is required")

    session_id, transcript, transcript_path = _ensure_session(request.session_id)
    history = [{"role": item.role, "content": item.content} for item in request.history]

    messages = [
        {"role": "system", "content": system_prompt},
        *trim_history(history, HISTORY_WINDOW),
        {"role": "user", "content": user_text},
    ]

    turn_record: dict[str, Any] = {
        "turn_index": len(transcript["turns"]) + 1,
        "started_at": now_iso(),
        "user": user_text,
        "status": "started",
        "assistant_text": None,
        "rounds": [],
        "tool_events": [],
    }

    try:
        result = run_model_tool_loop(
            provider=provider,
            messages=messages,
            tools=openai_tools,
            model=DEFAULT_MODEL,
            max_tool_rounds=MAX_TOOL_ROUNDS,
        )
        turn_record.update(result)
        reply = result.get("assistant_text") or ""
    except Exception as exc:
        turn_record.update({
            "status": "provider_error",
            "error": f"{type(exc).__name__}: {exc}",
        })
        turn_record["ended_at"] = now_iso()
        transcript["turns"].append(turn_record)
        write_transcript(transcript_path, transcript)
        raise HTTPException(status_code=502, detail=turn_record["error"]) from exc

    turn_record["ended_at"] = now_iso()
    transcript["turns"].append(turn_record)
    write_transcript(transcript_path, transcript)

    return ChatResponse(
        reply=reply,
        status=str(turn_record.get("status", "answered")),
        session_id=session_id,
        tool_events=turn_record.get("tool_events") or [],
    )
