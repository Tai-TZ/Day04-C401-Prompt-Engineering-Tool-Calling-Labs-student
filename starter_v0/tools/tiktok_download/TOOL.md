---
name: tiktok_download
track: bonus
kind: live_api
provider: RapidAPI (tiktok-downloader26)
requires_env: [RAPIDAPI_KEY]
inputs: [url]
outputs: [items]
side_effect: false
---

Get TikTok download info (no-watermark links when available) via RapidAPI TikTok Downloader26.

Notes:
- Requires `RAPIDAPI_KEY`.
- Optional: set `RAPIDAPI_TIKTOK_HOST` to override default RapidAPI host.

