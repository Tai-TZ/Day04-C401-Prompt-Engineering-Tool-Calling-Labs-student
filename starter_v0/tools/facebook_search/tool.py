from __future__ import annotations

import os
from typing import Any

import requests

from tools._shared import TIMEOUT, domain, err


_RESOURCE_TO_PATH: dict[str, str] = {
    "posts": "/search/posts",
    "pages": "/search/pages",
    "people": "/search/people",
    "groups_posts": "/search/groups_posts",
    "events": "/search/events",
    "videos": "/search/videos",
    "hashtags": "/search/hashtags",
}


def facebook_search(
    resource: str = "posts",
    query: str = "",
    limit: int = 5,
    cursor: str | None = None,
) -> dict[str, Any]:
    """
    RapidAPI Facebook Scraper3 wrapper.

    Returns a normalized list of items (title/url/source/summary) plus raw payload.
    """
    try:
        key = os.getenv("RAPIDAPI_KEY")
        if not key:
            raise RuntimeError("Missing RAPIDAPI_KEY env var")

        host = os.getenv("RAPIDAPI_FACEBOOK_HOST") or "facebook-scraper3.p.rapidapi.com"
        base_url = f"https://{host}"

        path = _RESOURCE_TO_PATH.get(str(resource or "").strip().lower())
        if not path:
            raise ValueError(f"Unsupported resource={resource!r}. Use one of: {sorted(_RESOURCE_TO_PATH)}")

        params: dict[str, Any] = {
            "query": query,
            "limit": int(limit or 5),
        }
        if cursor:
            params["cursor"] = cursor

        resp = requests.get(
            f"{base_url}{path}",
            params=params,
            headers={
                "x-rapidapi-key": key,
                "x-rapidapi-host": host,
                "accept": "application/json",
            },
            timeout=TIMEOUT,
        )
        if resp.status_code >= 400:
            return {
                "tool": "facebook_search",
                "resource": resource,
                "query": query,
                "limit": int(limit or 5),
                "cursor": cursor,
                "error": "HTTPError",
                "status_code": resp.status_code,
                "response_text": (resp.text or "")[:2000],
            }

        try:
            data = resp.json()
        except Exception:
            return {
                "tool": "facebook_search",
                "resource": resource,
                "query": query,
                "limit": int(limit or 5),
                "cursor": cursor,
                "error": "InvalidJSON",
                "status_code": resp.status_code,
                "response_text": (resp.text or "")[:2000],
            }

        raw_items = (
            data.get("data")
            or data.get("items")
            or data.get("results")
            or []
        )
        items: list[dict[str, Any]] = []
        for it in raw_items if isinstance(raw_items, list) else []:
            url = it.get("url") or it.get("link") or it.get("post_url") or ""
            title = it.get("title") or it.get("name") or it.get("caption") or it.get("text") or url
            summary = it.get("text") or it.get("snippet") or it.get("description") or it.get("message") or ""
            items.append(
                {
                    "title": str(title)[:200],
                    "url": url,
                    "source": domain(url) if url else "facebook",
                    "summary": str(summary)[:400],
                }
            )

        return {
            "tool": "facebook_search",
            "resource": resource,
            "query": query,
            "limit": int(limit or 5),
            "cursor": cursor,
            "items": items,
            "raw": data,
        }
    except Exception as exc:
        return err("facebook_search", exc)

