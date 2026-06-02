export type ChatHistoryItem = {
  role: "user" | "assistant";
  content: string;
};

export type ChatApiResponse = {
  reply: string;
  status: string;
  session_id: string;
  tool_events: Array<Record<string, unknown>>;
};

function getApiBaseUrl() {
  const url = import.meta.env.VITE_API_URL?.trim();
  if (!url) return "";
  return url.replace(/\/$/, "");
}

export function isChatApiConfigured() {
  return Boolean(getApiBaseUrl());
}

export async function sendChatMessage(
  message: string,
  history: ChatHistoryItem[],
  sessionId?: string,
): Promise<ChatApiResponse> {
  const baseUrl = getApiBaseUrl();
  if (!baseUrl) {
    throw new Error("VITE_API_URL chưa được cấu hình. Thêm URL Python API trên Vercel Environment Variables.");
  }

  const response = await fetch(`${baseUrl}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message,
      history,
      session_id: sessionId ?? null,
    }),
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    const detail =
      typeof payload.detail === "string"
        ? payload.detail
        : `API error (${response.status})`;
    throw new Error(detail);
  }

  return payload as ChatApiResponse;
}
