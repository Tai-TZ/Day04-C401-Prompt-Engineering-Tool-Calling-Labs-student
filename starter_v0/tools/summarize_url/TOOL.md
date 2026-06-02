---
name: summarize_url
track: bonus
kind: live_api
provider: Firecrawl
requires_env: [FIRECRAWL_API_KEY]
inputs: [url, max_chars]
outputs: [title, url, source, summary, key_points]
side_effect: false
---

Fetch a URL (markdown) and return a short Vietnamese summary + key points for quick demo.

Notes:
- Uses the same Firecrawl key as `fetch`.
- Safe for classroom demo: no side effects, just reads.

