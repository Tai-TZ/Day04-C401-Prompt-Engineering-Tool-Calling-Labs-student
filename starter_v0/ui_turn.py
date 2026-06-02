from __future__ import annotations

import json
import sys
import io
import contextlib
from pathlib import Path
from typing import Any

from chat import run_model_tool_loop, trim_history
from env_loader import load_lab_env
from providers import make_provider
from tools import load_tool_declarations, to_openai_tools
from versioning import artifact_version_dict, build_artifact_version


ROOT = Path(__file__).parent
ARTIFACTS_DIR = ROOT / "artifacts"

def _strip_surrogates(text: str) -> str:
    # Some Windows inputs can contain lone UTF-16 surrogate code points.
    # The OpenAI SDK refuses to JSON-encode them ("surrogates not allowed").
    # Strip them to keep the request valid UTF-8.
    return "".join(ch for ch in text if not (0xD800 <= ord(ch) <= 0xDFFF))


def _sanitize_messages(messages: list[dict[str, str]]) -> list[dict[str, str]]:
    sanitized: list[dict[str, str]] = []
    for m in messages:
        role = m.get("role", "")
        content = m.get("content", "")
        sanitized.append({"role": role, "content": _strip_surrogates(str(content))})
    return sanitized


def _read_stdin_json() -> dict[str, Any]:
    raw = sys.stdin.read()
    if not raw.strip():
        raise SystemExit("Expected JSON payload on stdin")
    return json.loads(raw)


def main() -> None:
    load_lab_env(ROOT)
    data = _read_stdin_json()

    provider_name = data.get("provider") or "openrouter"
    model = data.get("model")
    version = data.get("version") or "ui"
    system_prompt_path = Path(data.get("system_prompt") or (ARTIFACTS_DIR / "system_prompt.md"))
    tools_path = Path(data.get("tools") or (ARTIFACTS_DIR / "tools.yaml"))
    history_window = int(data.get("history_window") or 5)
    max_tool_rounds = int(data.get("max_tool_rounds") or 4)
    prior_turns = data.get("prior_turns") or []
    user_text = _strip_surrogates(str(data.get("user_text") or ""))
    if not user_text.strip():
        raise SystemExit("Missing user_text")

    system_prompt = _strip_surrogates(system_prompt_path.read_text(encoding="utf-8"))
    tool_declarations = load_tool_declarations(tools_path)
    openai_tools = to_openai_tools(tool_declarations)

    provider = make_provider(provider_name)
    selected_model = model or getattr(provider, "default_model", None)
    artifact_version = build_artifact_version(version, system_prompt_path, tools_path)

    messages: list[dict[str, str]] = [
        {"role": "system", "content": system_prompt},
        *trim_history(list(prior_turns), history_window),
        {"role": "user", "content": user_text},
    ]
    messages = _sanitize_messages(messages)

    # `run_model_tool_loop` prints tool calls (with emoji) to stdout, which both:
    # - can crash on Windows cp1252 consoles, and
    # - would corrupt the JSON stdout contract for the UI.
    # So we silence stdout during the tool loop.
    with contextlib.redirect_stdout(io.StringIO()):
        result = run_model_tool_loop(
            provider=provider,
            messages=messages,
            tools=openai_tools,
            model=selected_model,
            max_tool_rounds=max_tool_rounds,
        )

    payload = {
        **artifact_version_dict(artifact_version),
        "provider": provider_name,
        "model": selected_model,
        **result,
    }
    # Write UTF-8 bytes directly to avoid Windows cp1252 encoding errors.
    sys.stdout.buffer.write(json.dumps(payload, ensure_ascii=False).encode("utf-8"))


if __name__ == "__main__":
    main()

