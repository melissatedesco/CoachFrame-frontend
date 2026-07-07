import { apiFetch } from './client';

export const programsApi = {
  getAll: ({ myEquipment } = {}) => {
    const qs = myEquipment ? '?my_equipment=true' : '';
    return apiFetch(`/programs${qs}`);
  },

  getById: (id) => apiFetch(`/programs/${id}`),

  create: (data) => apiFetch('/programs', { method: 'POST', body: data }),
  update: (id, data) => apiFetch(`/programs/${id}`, { method: 'PUT', body: data }),
  remove: (id) => apiFetch(`/programs/${id}`, { method: 'DELETE' }),
};
