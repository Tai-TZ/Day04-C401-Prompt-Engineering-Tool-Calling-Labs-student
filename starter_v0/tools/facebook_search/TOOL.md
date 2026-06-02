---
name: facebook_search
track: bonus
kind: live_api
provider: RapidAPI (facebook-scraper3)
requires_env: [RAPIDAPI_KEY]
inputs: [resource, query, limit, cursor]
outputs: [items]
side_effect: false
---

Search public Facebook resources (posts/pages/people/groups/events/videos/hashtags) via the Facebook Scraper3 API on RapidAPI.

Notes:
- Requires `RAPIDAPI_KEY`.
- Optional: set `RAPIDAPI_FACEBOOK_HOST` to override default RapidAPI host.
- This tool is for *Facebook* only (not Twitter/X).

