export const BASE_URL = "http://localhost:3000";

export async function postJson<TResponse>(
  path: string,
  body: unknown,
): Promise<TResponse> {
  const response = await fetch(`${BASE_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`요청 실패: ${response.status}`);
  }

  return response.json() as Promise<TResponse>;
}
