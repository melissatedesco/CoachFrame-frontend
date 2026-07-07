import { apiFetch } from './client';

export const usersApi = {
  getProfile: () => apiFetch('/users/profilo'),
  update: (id, { name, surname, email }) =>
    apiFetch(`/users/${id}`, { method: 'PUT', body: { name, surname, email } }),
};
