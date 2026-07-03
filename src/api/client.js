import { tokenStorage } from './tokenStorage';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

let refreshPromise = null;

async function refreshAccessToken() {
  if (!refreshPromise) {
    refreshPromise = (async () => {
      const refreshToken = tokenStorage.getRefreshToken();
      if (!refreshToken) throw new ApiError('Sessione scaduta.', 401);

      const res = await fetch(`${BASE_URL}/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
      });
      if (!res.ok) throw new ApiError('Sessione scaduta.', 401);

      const data = await res.json();
      tokenStorage.setSession({ accessToken: data.accessToken, refreshToken: data.refreshToken });
      return data.accessToken;
    })().finally(() => {
      refreshPromise = null;
    });
  }
  return refreshPromise;
}

// wrapper fetch: aggiunge il token, e su 401 tenta un refresh + un solo retry
export async function apiFetch(path, { method = 'GET', body, auth = true, retry = true } = {}) {
  const headers = { 'Content-Type': 'application/json' };

  if (auth) {
    const token = tokenStorage.getAccessToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  if (res.status === 401 && auth && retry && path !== '/auth/refresh') {
    try {
      await refreshAccessToken();
      return apiFetch(path, { method, body, auth, retry: false });
    } catch {
      tokenStorage.clear();
      window.location.assign('/login');
      throw new ApiError('Sessione scaduta. Effettua di nuovo il login.', 401);
    }
  }

  const isJson = res.headers.get('content-type')?.includes('application/json');
  const data = isJson ? await res.json().catch(() => null) : null;

  if (!res.ok) {
    throw new ApiError(data?.message || 'Si è verificato un errore.', res.status);
  }

  return data;
}
