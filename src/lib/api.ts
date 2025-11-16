const BASE = (import.meta as any).env?.VITE_API_BASE_URL?.replace(/\/$/, "");

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  if (!BASE) throw new Error("VITE_API_BASE_URL is not set");
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(init?.headers || {}) },
    ...init,
  });
  const ct = res.headers.get('content-type') || '';
  const isJson = ct.includes('application/json') || ct.includes('json');
  const data = isJson ? await res.json() : await res.text();
  if (!res.ok) {
    throw new Error(typeof data === 'string' ? data : (data?.error || 'Request failed'));
  }
  return data as T;
}

export async function health() {
  try {
    return await request<{ ok: boolean }>(`/health`);
  } catch (e: any) {
    return { ok: false, error: e?.message || String(e) } as any;
  }
}

export async function chat(text: string) {
  const res = await request<{ response: string }>(`/chat`, {
    method: 'POST',
    body: JSON.stringify({ text }),
  });
  return res.response;
}

export function getApiBase(): string | undefined {
  return BASE;
}

export function connectDiscord() {
  if (!BASE) throw new Error('VITE_API_BASE_URL is not set');
  window.location.href = `${BASE}/discord/login`;
}

export async function getConnectedGuilds(): Promise<any[]> {
  const data = await request<{ connected: any[] }>(`/discord/connected`);
  return data.connected || [];
}
