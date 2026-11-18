const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function apiClient<T>(endpoint: string, init?: RequestInit): Promise<T> {
  if (!API_BASE_URL) throw new Error("NEXT_PUBLIC_API_BASE_URL is required when mocks are disabled.");
  const response = await fetch(`${API_BASE_URL.replace(/\/$/, "")}/${endpoint.replace(/^\//, "")}`, { ...init, signal: init?.signal, headers: { Accept: "application/json", ...init?.headers } });
  if (!response.ok) throw new Error(`API request failed (${response.status})`);
  return response.json() as Promise<T>;
}
