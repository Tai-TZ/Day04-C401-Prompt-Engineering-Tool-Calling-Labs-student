from __future__ import annotations

import os
import re
from typing import Any
from urllib.parse import urlencode

import requests

from tools._shared import TIMEOUT, domain, err


GITHUB_API = "https://api.github.com/search/repositories"


_KNOWN_LANGS = {
    "python",
    "typescript",
    "javascript",
    "go",
    "java",
    "c",
    "cpp",
    "c++",
    "csharp",
    "c#",
    "rust",
    "kotlin",
    "swift",
    "ruby",
    "php",
    "dart",
}


def _normalize_lang(value: str) -> str:
    v = (value or "").strip()
    if not v:
        return ""
    low = v.lower().replace(" ", "")
    if low in {"nextjs", "next.js"}:
        return "topic:nextjs"
    if low in {"react"}:
        return "topic:react"
    if low in {"vue", "vuejs", "vue.js"}:
        return "topic:vue"
    if low in {"svelte"}:
        return "topic:svelte"
    if low in {"django", "flask", "fastapi"}:
        return f"topic:{low}"
    if low in _KNOWN_LANGS or v.lower() in _KNOWN_LANGS:
        return f"language:{v}"
    # fallback: treat as topic/framework
    return f"topic:{v}"


def _build_q(idea: str, language_or_framework: str, min_stars: int) -> str:
    cleaned = " ".join((idea or "").split())
    if not cleaned:
        return ""

    # Keep quoted phrases if any, otherwise quote the full idea as one phrase.
    quoted = [m.group(1).strip() for m in re.finditer(r"\"([^\"]+)\"", cleaned) if m.group(1).strip()]
    if not quoted:
        quoted = [cleaned]

    tokens = [t for t in re.findall(r"[A-Za-z0-9_\\-]+", cleaned) if len(t) > 1][:8]

    # Core term group: ("full idea" OR token1 OR token2 ...)
    parts = []
    phrase_terms = [f"\"{q}\"" if " " in q else q for q in quoted]
    core = " OR ".join([*phrase_terms, *tokens])
    if core:
        parts.append(f"({core})")

    qual = _normalize_lang(language_or_framework)
    if qual:
        parts.append(qual)

    if min_stars and int(min_stars) > 0:
        parts.append(f"stars:>={int(min_stars)}")

    # Bias toward actively maintained / useful repos.
    parts.append("fork:false")

    return " ".join(parts).strip()


def github_repo_search(
    idea: str = "",
    language_or_framework: str = "",
    min_stars: int = 50,
    sort: str = "stars",
    max_results: int = 5,
    token: str | None = None,
) -> dict[str, Any]:
    """
    Search GitHub repositories using official GitHub Search API (v3).
    """
    try:
        max_results = max(1, min(int(max_results or 5), 20))
        sort = sort if sort in {"stars", "forks", "updated"} else "stars"

        q = _build_q(idea, language_or_framework, int(min_stars or 0))
        if not q:
            raise ValueError("Missing idea")

        auth = (token or os.getenv("GITHUB_TOKEN") or "").strip()

        params = {"q": q, "sort": sort, "order": "desc", "per_page": max_results}
        headers = {
            "accept": "application/vnd.github+json",
            "user-agent": os.getenv("GITHUB_USER_AGENT", "AI20k-Day04-Research-Agent"),
            "x-github-api-version": "2022-11-28",
        }
        if auth:
            headers["authorization"] = f"Bearer {auth}"

        resp = requests.get(GITHUB_API, params=params, headers=headers, timeout=TIMEOUT)
        if resp.status_code >= 400:
            return {
                "tool": "github_repo_search",
                "q": q,
                "api_url": f"{GITHUB_API}?{urlencode(params)}",
                "error": "HTTPError",
                "status_code": resp.status_code,
                "response_text": (resp.text or "")[:2000],
            }

        data = resp.json()
        items_out: list[dict[str, Any]] = []
        for it in (data.get("items") or [])[:max_results]:
            items_out.append(
                {
                    "full_name": it.get("full_name"),
                    "url": it.get("html_url"),
                    "source": domain(it.get("html_url") or ""),
                    "description": it.get("description"),
                    "stars": it.get("stargazers_count"),
                    "forks": it.get("forks_count"),
                    "language": it.get("language"),
                    "updated_at": it.get("updated_at"),
                    "topics": it.get("topics") or [],
                }
            )

        return {
            "tool": "github_repo_search",
            "idea": idea,
            "q": q,
            "api_url": f"{GITHUB_API}?{urlencode(params)}",
            "total_count": data.get("total_count"),
            "items": items_out,
            "auth": bool(auth),
            "rate_limit_note": "Without a token, GitHub Search API is heavily rate-limited. Provide token to increase limits.",
        }
    except Exception as exc:
        return err("github_repo_search", exc)

