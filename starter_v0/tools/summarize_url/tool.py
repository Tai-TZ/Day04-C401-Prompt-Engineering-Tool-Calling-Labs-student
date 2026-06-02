from __future__ import annotations

import re
from typing import Any

from tools._shared import domain, err
from tools.fetch.tool import read_url


def _strip_markdown(md: str) -> str:
    # Remove code blocks
    md = re.sub(r"```[\s\S]*?```", " ", md)
    # Inline code
    md = re.sub(r"`[^`]+`", " ", md)
    # Links: [text](url) -> text
    md = re.sub(r"\[([^\]]+)\]\(([^)]+)\)", r"\1", md)
    # Images: ![alt](url) -> alt
    md = re.sub(r"!\[([^\]]*)\]\(([^)]+)\)", r"\1", md)
    # Headings / emphasis markers
    md = re.sub(r"[#>*_~]+", " ", md)
    # Collapse whitespace
    md = re.sub(r"\s+", " ", md).strip()
    return md


def _sentences(text: str) -> list[str]:
    # Lightweight sentence split for Vietnamese/English.
    parts = re.split(r"(?<=[.!?])\s+", text)
    out: list[str] = []
    for p in parts:
        p = p.strip()
        if len(p) < 30:
            continue
        out.append(p)
        if len(out) >= 20:
            break
    return out


def summarize_url(url: str = "", max_chars: int = 8000) -> dict[str, Any]:
    """
    Fetch markdown via Firecrawl (same as `fetch`) then produce a short summary.
    """
    try:
        url = str(url or "").strip()
        if not url:
            raise ValueError("Missing url")

        fetched = read_url(url)
        if fetched.get("error"):
            return {"tool": "summarize_url", "url": url, **fetched}

        items = fetched.get("items") or []
        if not items:
            return {"tool": "summarize_url", "url": url, "error": "EmptyContent", "message": "No content returned"}

        first = items[0] or {}
        title = first.get("title") or url
        source = first.get("source") or domain(url)
        md = (first.get("summary") or "")[: int(max_chars or 8000)]

        text = _strip_markdown(md)
        sents = _sentences(text)

        # Build summary and key points heuristically (demo-friendly).
        summary = " ".join(sents[:3]).strip()
        key_points = [s.strip() for s in sents[3:8]]

        return {
            "tool": "summarize_url",
            "title": title,
            "url": url,
            "source": source,
            "summary": summary or (text[:400] + ("..." if len(text) > 400 else "")),
            "key_points": key_points,
        }
    except Exception as exc:
        return err("summarize_url", exc)

