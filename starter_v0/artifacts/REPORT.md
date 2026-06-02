# Day 04 Lab v2 Report — Research Agent

> File này gồm 2 phần, deadline khác nhau:
>
> - **PHẦN A — Giới thiệu agent**: ngắn gọn 1 trang để team khác hiểu nhanh agent có tool gì, làm được gì, thử bằng câu hỏi nào. **Xong trước 16:30** để làm tài liệu phụ trợ khi demo.
> - **PHẦN B — Chi tiết / Bằng chứng**: bảng đầy đủ (v0–v3, failure, eval, chat) dựa trên log thật. **Có thể hoàn thiện sau buổi debate để nộp bài.**

## Team

- Team: Team 5 - Zone 5
- **Team Members**:
  - Nguyễn Trọng Nguyên — 2A202600548
  - Nguyễn Thành Tài — 2A202600627
  - Ngô Thị Ánh — 2A202600979
- Provider/model: **OpenRouter** / `openai/gpt-4o-mini`

---

# PHẦN A — Giới thiệu agent

## A1. Agent này làm được gì

**Arionear** là research agent có **tool calling thật**: user hỏi → agent tự chọn tool → gọi API thật (Twitter/X, web news, URL, arXiv, company policy, Telegram) → trả lời có nguồn.

Khác chatbot thường ở chỗ nhóm **đo được đúng/sai** bằng eval case và tối ưu prompt qua **v0 → v3** (base eval từ 70% lên 95%).

Agent cũng biết:
- **Hỏi lại** khi thiếu handle/URL (`clarify`)
- **Xác nhận** trước khi gửi Telegram (`send`)
- **Từ chối** câu ngoài phạm vi (toán, code, meta)

**Web UI (bonus):**

| Trang | Làm gì |
| ----- | ------ |
| Overview | Dashboard token/cost/activity |
| Chat | Chat live với agent Python (`ui_turn.py`), streaming, hiển thị tool calls |
| History | Xem lại các cuộc hội thoại đã lưu |

**Link dùng thử:**

> **Local:** `http://localhost:8080/chat` — `cd frontend && npm run dev` (cần Python + `.env` trong `starter_v0/`)
>
> **Public (Vercel):** *(điền URL Vercel project — Root Directory: `frontend`)*

**Pitch 1 câu cho team khác:** *"Hỏi 'Tin AI hôm nay có gì?' — agent gọi web search thật, không bịa."*

## A2. Tool agent có

> Cột **"Tool mới nhóm thêm?"** = **có** nếu nhóm tự viết tool (có `TOOL.md`, đăng ký trong `tools/__init__.py` + `tools.yaml`). Tool có sẵn từ starter = **không**.

| Tên tool | Làm được gì | Tool mới nhóm thêm? |
| -------- | ----------- | ------------------- |
| `clarify` | Hỏi lại user khi thiếu handle/URL hoặc cần xác nhận trước hành động gửi | không |
| `timeline` | Lấy bài đăng gần đây của một tài khoản Twitter/X (`screenname`) | không |
| `social_search` | Tìm tweet theo chủ đề/từ khóa (Latest hoặc Top) | không |
| `lookup` | Tìm tin trên web; `topic=news` + `timeframe` day/week cho tin thời sự | không |
| `fetch` | Đọc và trích nội dung từ một URL cụ thể | không |
| `format` | Trình bày các item đã thu thập thành digest markdown | không |
| `send` | Gửi text lên Telegram — chỉ khi user đã xác nhận (`confirmed=true`) | không |
| `policy` | Tìm trong tài liệu company policy nội bộ | không |
| `papers` | Tìm paper trên arXiv theo từ khóa | không |
| `paper_text` | Tải và trích text từ PDF arXiv | không |
| `facebook_search` | Tìm posts/pages/people/events trên Facebook qua RapidAPI | **có** |
| `tiktok_download` | Lấy link tải video TikTok (no-watermark nếu có) qua RapidAPI | **có** |
| `summarize_url` | Tóm tắt nhanh nội dung một URL (fetch + summary + key points) | **có** |
| `github_repo_search` | Tìm GitHub repo theo ý tưởng, lọc language/stars | **có** |

## A3. Câu hỏi mẫu để thử

1. **Tweet theo người:** *"Tweet mới nhất của Sam Altman là gì?"* → `timeline(screenname="sama")`
2. **Tin web hôm nay:** *"Tin tức AI hôm nay có gì nổi bật?"* → `lookup(query="AI", topic="news", timeframe="day")`
3. **Đọc URL:** *"Tóm tắt bài này: https://openai.com/blog/gpt-5"* → `fetch(url=...)`
4. **Thiếu thông tin:** *"Tóm tắt 5 tweet mới nhất giúp mình"* → `clarify` (hỏi handle, không đoán)
5. **Hai nguồn song song:** *"Tìm trên web tin AI hôm nay và tìm thêm tweet về AI."* → `lookup` + `social_search`

---

# PHẦN B — Chi tiết / Bằng chứng

## B1. Version Evidence

Nguồn: `artifacts/version_log.csv` + `runs/v0–v3_B_base_openrouter_*.json` (base eval, 20 cases).

| Version | Changed Artifact | Hypothesis | Metric Before | Metric After | Run File |
| ------- | ---------------- | ---------- | ------------- | ------------ | -------- |
| v0 | baseline (`system_prompt.md` cố ý xấu) | Đo điểm xuất phát trước tối ưu | — | **70%** (14/20) | `runs/v0_B_base_openrouter_20260602T141846706698.json` |
| v1 | `system_prompt.md` — thêm rule `clarify` + confirm trước `send` | Hỏi lại thay vì đoán bừa → pass missing_info & wrong_boundary | 70% | **100%** (20/20) | `runs/v1_B_base_openrouter_20260602T141710151515.json` |
| v2 | `system_prompt.md` — routing out-of-scope, args convention, parallel tools | Rule routing rõ hơn; fix args `lookup` | 100% | **95%** (19/20) | `runs/v2_B_base_openrouter_20260602T142236874629.json` |
| v3 | `tools.yaml` — làm rõ tool descriptions + rule multi-turn | Model phân biệt tool tốt hơn; giữ 95% | 95% | **95%** (19/20) | `runs/v3_B_base_openrouter_20260602T142705991321.json` |

**Nhận xét:** v1 cải thiện mạnh nhất (+30pp). v2/v3 còn **1 case fail cố định: `M06_switch_tool`** (multi-turn “bỏ Twitter”).

## B2. Failure Analysis

| Case ID | Failure Type | Actual Tool Calls | What Failed | Fix |
| ------- | ------------ | ----------------- | ----------- | --- |
| R08_out_of_scope (v0) | out_of_scope | `send(text=…tích phân…)` | Câu toán học nhưng agent gọi `send` thay vì từ chối không tool | v1: thêm rule out-of-scope trong `system_prompt.md` |
| R10_missing_handle (v0) | missing_info | `timeline(screenname="sama")` | Thiếu handle nhưng đoán `sama` thay vì `clarify` | v1: rule “không đoán entity → clarify” |
| R12_confirm_before_send (v0) | wrong_boundary | `send(text="Bản tin này")` | Gửi Telegram ngay, không hỏi xác nhận | v1: flow confirm `clarify(yes_no)` trước `send` |
| R13_parallel_web_and_tweets (v0) | wrong_tool / wrong_arg | `lookup(query="AI news")` thiếu `topic=news` | Args `lookup` sai convention | v2: rule `query="AI"`, `topic="news"` |
| R14_out_of_scope_coding (v0) | out_of_scope | `send(text=code Fibonacci…)` | Câu coding nhưng gọi `send` | v2: rule refuse coding, no tool |
| M06_switch_tool (v2, v3) | wrong_tool | `lookup` + `social_search` | User nói “Bỏ Twitter” nhưng vẫn gọi `social_search` | Cần prompt mạnh hơn: chỉ `lookup` khi user bỏ Twitter; chưa fix được |

## B3. Team Eval Cases

File `data/eval_group.json` — **10 case** (5 single turn + 5 multi turn), chạy eval v3:

```bash
py run_eval.py --provider openrouter --version v3 --suite group --eval-cases data/eval_group.json
```

**Kết quả:** **9/10 pass (90%)** — run file: `runs/v3_B_group_openrouter_20260602T205332734931.json`

| Case ID | What It Tests | Expected Tool/Behavior | Result |
| ------- | ------------- | ---------------------- | ------ |
| G01_github_repo_routing | Tìm repo GitHub RAG + Python + min stars | `github_repo_search(idea, language, min_stars)` | PASS |
| G02_summarize_url_routing | URL + yêu cầu tóm tắt | `summarize_url(url)` | PASS |
| G03_facebook_posts_routing | Tìm post Facebook theo chủ đề | `facebook_search(resource=posts, query)` | PASS |
| G04_tiktok_download_routing | URL TikTok + tải no watermark | `tiktok_download(url)` | PASS |
| G05_papers_routing | Tìm paper arXiv | `papers(query)` | PASS |
| G06_clarify_then_tiktok | Multi-turn: thiếu URL → cung cấp link TikTok | `tiktok_download(url)` | PASS |
| G07_github_language_correction | Multi-turn: carry idea + Python + min_stars + sort | `github_repo_search(...)` | PASS |
| G08_facebook_switch_pages | Multi-turn: sửa posts → pages | `facebook_search(resource=pages)` | PASS |
| G09_clarify_then_summarize | Multi-turn: thiếu URL → summarize | `summarize_url(url)` | PASS |
| G10_policy_citation | Policy nội bộ về trích dẫn nguồn | `policy(query=...)` | **FAIL** — gọi đúng `policy` nhưng `query="trích dẫn nguồn"` (thiếu “publish”); thêm `policy_area=external_publishing` |

**Nhận xét:** Tool mới (GitHub, Facebook, TikTok, summarize_url) route tốt. Case fail duy nhất là arg `query` hơi ngắn — có thể nới expect hoặc thêm rule policy vào prompt.

## B4. Live Chat Evidence

Nguồn: `transcripts/*.transcript.json` + UI chat (`ui_turn.py` / History page).

| Turn | User Request | Tool Calls | Version Evidence | Outcome |
| ---- | ------------ | ---------- | ---------------- | ------- |
| 1 | "What can you do?" | *(none)* | v3 | PASS — meta question, trả lời trực tiếp không gọi tool (`transcripts/v3_openrouter_20260602T164002649948.transcript.json`) |
| 2 | *(demo đề xuất)* "Tin AI hôm nay có gì?" | `lookup(topic=news, timeframe=day)` | v3 | Kỳ vọng: gọi web search thật |
| 3 | *(demo đề xuất)* "Tóm tắt 5 tweet mới nhất" → bổ sung "Của Elon Musk" | `clarify` → `timeline(elonmusk, limit=5)` | v1+ | Kỳ vọng: hỏi lại rồi gọi đúng tool |

## B5. Bonus Evidence

| Bonus | Evidence File | What Worked | Risk / Guardrail |
| ----- | ------------- | ----------- | ---------------- |
| **UI (Arionear)** | `frontend/` — Overview, Chat, History; deploy Vercel | Chat live qua `ui_turn.py`, streaming, hiển thị tool rounds | Cần Python + `.env` local hoặc server khi demo |
| **Tool mới (×4)** | `tools/facebook_search/`, `tiktok_download/`, `summarize_url/`, `github_repo_search/` + `tools.yaml` | Đăng ký đủ `TOOL.md`, `__init__.py`, `tools.yaml` | RapidAPI / Firecrawl / GitHub token — cần env keys |
| send (Telegram) | `tools/send/` | Tool có sẵn; prompt v1 yêu cầu confirm trước khi gửi | Không gửi khi `confirmed=false`; không commit token |
| arXiv / company policy | `tools/papers/`, `tools/paper_text/`, `tools/policy/` | Tool có sẵn trong starter; dùng được khi prompt route đúng | arXiv rate limit; policy chỉ local markdown KB |

## B6. Reflection

- **`system_prompt.md`:** v1 fix clarify + confirm-send + out-of-scope; v2 fix args convention (`lookup` query/topic/timeframe), parallel tools, multi-turn carry-over; rule “bỏ Twitter” chưa đủ mạnh cho M06.
- **`tools.yaml`:** v3 làm rõ description `timeline` vs `social_search` vs `lookup` — giúp routing ổn định nhưng không fix M06.
- **Manual review:** M06 cần đọc full 3-turn context — auto-grader đúng nhưng model vẫn gọi thừa `social_search`; có thể cần negative example trong prompt.
- **Next:** (1) fix M06 → target 100% base eval, (2) thêm transcript chat có tool calls thật cho B4, (3) điền URL Vercel public trong PHẦN A, (4) fix G10 policy query arg nếu muốn 100% group eval

