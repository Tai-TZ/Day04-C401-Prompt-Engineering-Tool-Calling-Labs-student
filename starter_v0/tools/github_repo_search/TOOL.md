---
name: github_repo_search
track: bonus
kind: live_api
provider: GitHub Search API v3
requires_env: [GITHUB_TOKEN]
inputs: [idea, language_or_framework, min_stars, sort, max_results, token]
outputs: [items, api_url]
side_effect: false
---

Search GitHub repositories by idea/topic using the official GitHub Search API.

Notes:
- Optional auth: pass `token` or set `GITHUB_TOKEN` to increase rate limits.
- Always includes `User-Agent` header.

