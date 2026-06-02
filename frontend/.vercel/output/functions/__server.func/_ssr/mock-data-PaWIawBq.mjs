const evalVersions = ["v0", "v1", "v2", "v3"];
const trendData = [
  { version: "v0", case_accuracy: 55, routing: 62, args: 58 },
  { version: "v1", case_accuracy: 68, routing: 74, args: 70 },
  { version: "v2", case_accuracy: 81, routing: 86, args: 79 },
  { version: "v3", case_accuracy: 90, routing: 94, args: 88 }
];
const failureBreakdown = [
  { name: "wrong_tool", value: 4, fill: "var(--color-chart-4)" },
  { name: "wrong_arg_value", value: 6, fill: "var(--color-chart-3)" },
  { name: "missing_info", value: 3, fill: "var(--color-chart-6)" },
  { name: "unnecessary_tool", value: 2, fill: "var(--color-chart-5)" },
  { name: "wrong_boundary", value: 3, fill: "var(--color-chart-1)" },
  { name: "out_of_scope", value: 2, fill: "var(--color-chart-2)" }
];
const testCases = [
  {
    id: "case_001",
    status: "FAIL",
    expectedTool: "papers",
    actualTool: "lookup",
    failureType: "wrong_tool",
    details: {
      observed_mismatch: "Agent used web lookup instead of academic papers tool for arxiv query",
      failures: ["wrong_tool", "missing freshness filter"],
      actual_args: { query: "transformer architecture survey", limit: 5 },
      expected_args: { query: "transformer architecture survey", venue: "arxiv", year_from: 2023 }
    }
  },
  {
    id: "case_002",
    status: "FAIL",
    expectedTool: "send",
    actualTool: "send",
    failureType: "wrong_arg_value",
    details: {
      observed_mismatch: "Telegram chat_id mismatch and missing confirmation flag",
      failures: ["wrong_arg_value: chat_id", "confirmed not set"],
      actual_args: { chat_id: "@public", message: "Daily digest" },
      expected_args: { chat_id: "@research_lab", message: "Daily digest", confirmed: true }
    }
  },
  { id: "case_003", status: "PASS", expectedTool: "lookup", actualTool: "lookup" },
  { id: "case_004", status: "PASS", expectedTool: "clarify", actualTool: "clarify", multiturn: true },
  { id: "case_005", status: "PASS", expectedTool: "format", actualTool: "format" },
  { id: "case_006", status: "PASS", expectedTool: "timeline", actualTool: "timeline" },
  { id: "case_007", status: "PASS", expectedTool: "fetch", actualTool: "fetch" },
  { id: "case_008", status: "PASS", expectedTool: "social_search", actualTool: "social_search" },
  { id: "case_009", status: "PASS", expectedTool: "papers", actualTool: "papers" },
  { id: "case_010", status: "PASS", expectedTool: "paper_text", actualTool: "paper_text" },
  ...Array.from({ length: 10 }, (_, i) => ({
    id: `case_0${11 + i}`,
    status: "PASS",
    expectedTool: "lookup",
    actualTool: "lookup",
    multiturn: i % 3 === 0
  }))
];
const versionLog = [
  {
    version: "v0",
    author: "baseline",
    artifact: "system_prompt.md",
    hypothesis: "Establish baseline behavior with minimal instructions.",
    rationale: "Start point for measuring downstream improvements.",
    prompt_hash: "pa0000",
    tools_hash: "ta0000",
    metrics: { case: [0, 55], routing: [0, 62], args: [0, 58] }
  },
  {
    version: "v1",
    author: "alex",
    artifact: "system_prompt.md",
    hypothesis: "Adding explicit tool selection rubric will reduce wrong_tool failures.",
    rationale: "Baseline showed 12% wrong_tool errors; rubric maps query intent → tool.",
    prompt_hash: "pa1b2c",
    tools_hash: "ta0000",
    metrics: { case: [55, 68], routing: [62, 74], args: [58, 70] }
  },
  {
    version: "v2",
    author: "jordan",
    artifact: "tools.yaml",
    hypothesis: "Tightening parameter schemas eliminates wrong_arg_value errors.",
    rationale: "Added enums and required fields for chat_id and confirmed flags.",
    prompt_hash: "pa1b2c",
    tools_hash: "tb3d4e",
    metrics: { case: [68, 81], routing: [74, 86], args: [70, 79] }
  },
  {
    version: "v3",
    author: "mira",
    artifact: "system_prompt.md",
    hypothesis: "Clarify-first policy reduces missing_info on ambiguous prompts.",
    rationale: "Agent now invokes clarify before fan-out when intent is underspecified.",
    prompt_hash: "pa5f6g",
    tools_hash: "tb3d4e",
    metrics: { case: [81, 90], routing: [86, 94], args: [79, 88] }
  }
];
const systemPromptContent = `# Research Agent — System Prompt v3

You are a research agent for an academic lab. You answer questions by routing
to the smallest set of tools that satisfies the user's intent.

## Tool selection rubric
- General web facts → \`lookup\`
- Academic literature → \`papers\` (then \`paper_text\` for full text)
- Social signals → \`timeline\` or \`social_search\`
- Ambiguous intent → \`clarify\` BEFORE any other tool
- External delivery → \`format\` then \`send\` (always confirmed=true)

## Output style
- Markdown with concise bullets
- Cite sources by domain
- Never invoke \`send\` without explicit user confirmation
`;
const toolsSchema = [
  { name: "lookup", desc: "Web search via Tavily for general facts and news.", core: true, params: ["query", "limit", "freshness"] },
  { name: "fetch", desc: "Fetch and parse a URL via Firecrawl.", core: true, params: ["url", "mode"] },
  { name: "papers", desc: "Search arXiv / Semantic Scholar.", core: true, params: ["query", "venue", "year_from"] },
  { name: "paper_text", desc: "Pull full text for a known paper id.", core: true, params: ["paper_id"] },
  { name: "timeline", desc: "Get a user's recent posts.", core: true, params: ["handle", "limit"] },
  { name: "social_search", desc: "Search posts across the social graph.", core: true, params: ["query", "limit"] },
  { name: "clarify", desc: "Ask the user a disambiguating question.", core: true, params: ["question"] },
  { name: "format", desc: "Format a structured digest for delivery.", core: true, params: ["items", "style"] },
  { name: "send", desc: "Send a formatted digest to Telegram.", core: false, params: ["chat_id", "message", "confirmed"] },
  { name: "policy", desc: "Internal policy check for sensitive actions.", core: false, params: ["action"] }
];
const transcripts = [
  { id: "2026-06-02_ai-news.transcript.json", title: "AI news digest", date: "2026-06-02 09:14" },
  { id: "2026-06-01_arxiv-survey.transcript.json", title: "arXiv transformer survey", date: "2026-06-01 16:02" },
  { id: "2026-05-31_altman-tweets.transcript.json", title: "Altman timeline scan", date: "2026-05-31 11:48" }
];
export {
  transcripts as a,
  testCases as b,
  trendData as c,
  evalVersions as e,
  failureBreakdown as f,
  systemPromptContent as s,
  toolsSchema as t,
  versionLog as v
};
