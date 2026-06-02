from __future__ import annotations

import os
from typing import Any

import requests

from tools._shared import TIMEOUT, domain, err


def _rapidapi_get(host: str, path: str, params: dict[str, Any]) -> dict[str, Any]:
    key = os.getenv("RAPIDAPI_KEY")
    if not key:
        raise RuntimeError("Missing RAPIDAPI_KEY env var")
    resp = requests.get(
        f"https://{host}{path}",
        params=params,
        headers={"x-rapidapi-key": key, "x-rapidapi-host": host},
        timeout=TIMEOUT,
    )
    resp.raise_for_status()
    try:
        return resp.json()
    except Exception:
        # Some RapidAPI proxies occasionally return text/html on error.
        return {"raw_text": resp.text[:4000]}


def tiktok_download(url: str = "") -> dict[str, Any]:
    """
    Minimal wrapper for RapidAPI TikTok Downloader26.

    The exact endpoint path can vary across providers; we try a small set of
    common paths used by RapidAPI TikTok downloader APIs.
    """
    try:
        host = os.getenv("RAPIDAPI_TIKTOK_HOST") or "tiktok-downloader26.p.rapidapi.com"
        url = str(url or "").strip()
        if not url:
            raise ValueError("Missing url")

        # Common endpoint patterns seen across RapidAPI TikTok downloader APIs.
        candidate_paths = [
            "/getVideo",
            "/getvideo",
            "/download",
            "/",
        ]

        last_data: dict[str, Any] | None = None
        last_err: Exception | None = None
        for path in candidate_paths:
            try:
                data = _rapidapi_get(host, path, {"url": url})
                last_data = data
                # Heuristic: consider success if it contains any plausible media URL fields.
                if any(k in data for k in ("download_url", "play", "wmplay", "nowm", "no_watermark", "data")):
                    break
            except Exception as exc:
                last_err = exc
                continue

        if last_data is None and last_err is not None:
            raise last_err

        data = last_data or {}

        # Normalize common response shapes into digest-style items.
        items: list[dict[str, Any]] = []

        def add_item(title: str, media_url: str):
            if not media_url:
                return
            items.append(
                {
                    "title": title,
                    "url": media_url,
                    "source": domain(media_url),
                    "summary": media_url,
                }
            )

        # Try to extract from known shapes.
        if isinstance(data.get("data"), dict):
            dd = data["data"]
            add_item("No-watermark", dd.get("nowm") or dd.get("no_watermark") or dd.get("play") or "")
            add_item("Watermarked", dd.get("wmplay") or "")
            add_item("Music", dd.get("music") or dd.get("music_url") or "")
        else:
            add_item("Download", data.get("download_url") or "")
            add_item("No-watermark", data.get("nowm") or data.get("no_watermark") or "")
            add_item("Watermarked", data.get("wmplay") or data.get("play") or "")
            add_item("Music", data.get("music") or data.get("music_url") or "")

        return {
            "tool": "tiktok_download",
            "input_url": url,
            "items": items,
            "raw": data,
        }
    except Exception as exc:
        return err("tiktok_download", exc)

