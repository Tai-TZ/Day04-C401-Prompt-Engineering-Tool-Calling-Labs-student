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

Research agent hỗ trợ tra cứu và tổng hợp thông tin từ nhiều nguồn: tweet theo tài khoản hoặc chủ đề, tin tức web, nội dung URL, paper arXiv và policy nội bộ. Agent tự chọn tool phù hợp, hỏi lại khi thiếu thông tin (handle, URL), xác nhận trước khi gửi Telegram, và từ chối các câu ngoài phạm vi (toán, code, meta).

**Link dùng thử (deploy):**

> UI chat (local): `http://localhost:8080/chat` — chạy `npm run dev` trong thư mục `frontend`.
>
> URL public (nếu deploy): *(điền sau khi deploy Cloudflare Tunnel / Vercel)*

## A2. Tool agent có

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

## A3. Câu hỏi mẫu để thử

1. **Tweet theo người:** *"Tweet mới nhất của Sam Altman là gì?"* → kỳ vọng gọi `timeline(screenname="sama")`
2. **Tin web hôm nay:** *"Tin tức AI hôm nay có gì nổi bật?"* → kỳ vọng gọi `lookup(query="AI", topic="news", timeframe="day")`
3. **Đọc URL:** *"Tóm tắt bài này giúp mình: https://openai.com/blog/gpt-5"* → kỳ vọng gọi `fetch(url=...)`
4. **Thiếu thông tin:** *"Tóm tắt 5 tweet mới nhất giúp mình"* → kỳ vọng gọi `clarify` hỏi handle (không đoán bừa)
5. **Hai nguồn song song:** *"Tìm trên web tin AI hôm nay và tìm thêm tweet về AI."* → kỳ vọng gọi cả `lookup` và `social_search`

---

# PHẦN B — Chi tiết / Bằng chứng

## B1. Version Evidence

Fill from `artifacts/version_log.csv` and `runs/*.json`.


| Version | Changed Artifact | Hypothesis | Metric Before | Metric After | Run File |
| ------- | ---------------- | ---------- | ------------- | ------------ | -------- |
| v0      | baseline         |            |               |              |          |
| v1      |                  |            |               |              |          |
| v2      |                  |            |               |              |          |
| v3      |                  |            |               |              |          |


## B2. Failure Analysis

Use actual failures from `results[*].result.failures`.


| Case ID | Failure Type | Actual Tool Calls | What Failed | Fix |
| ------- | ------------ | ----------------- | ----------- | --- |
|         |              |                   |             |     |


## B3. Team Eval Cases

List the 10 cases added to `data/eval_group.json` (5 single turn + 5 multi turn).


| Case ID | What It Tests | Expected Tool/Behavior | Result |
| ------- | ------------- | ---------------------- | ------ |
|         |               |                        |        |


## B4. Live Chat Evidence

Use `transcripts/*.transcript.json`.


| Turn | User Request | Tool Calls | Version Evidence | Outcome |
| ---- | ------------ | ---------- | ---------------- | ------- |
|      |              |            |                  |         |


## B5. Bonus Evidence

Only fill if your team did bonus.


| Bonus                | Evidence File | What Worked | Risk / Guardrail |
| -------------------- | ------------- | ----------- | ---------------- |
| send (Telegram)      |               |             |                  |
| arXiv/company policy |               |             |                  |
| UI                   |               |             |                  |


## B6. Reflection

- Which fixes belonged in `system_prompt.md`?
- Which fixes belonged in `tools.yaml`?
- Which failure needed manual review instead of automatic grading?
- What would you improve next?

