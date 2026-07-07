import { apiFetch } from './client';

export const authApi = {
  register: ({ name, surname, email, password }) =>
    apiFetch('/auth/register', { method: 'POST', body: { name, surname, email, password }, auth: false }),

  login: ({ email, password }) =>
    apiFetch('/auth/login', { method: 'POST', body: { email, password }, auth: false }),

  logout: (refreshToken) =>
    apiFetch('/auth/logout', { method: 'POST', body: { refreshToken }, auth: false }),

  forgotPassword: (email) =>
    apiFetch('/auth/forgot-password', { method: 'POST', body: { email }, auth: false }),

  resetPassword: ({ token, password }) =>
    apiFetch('/auth/reset-password', { method: 'POST', body: { token, password }, auth: false }),
};
