import { apiFetch } from './client';

export const equipmentApi = {
  getAll: () => apiFetch('/equipment'),

  getMine: () => apiFetch('/users/me/equipment'),
  add: (equipmentId) => apiFetch(`/users/me/equipment/${equipmentId}`, { method: 'POST' }),
  remove: (equipmentId) => apiFetch(`/users/me/equipment/${equipmentId}`, { method: 'DELETE' }),
  replaceMine: (equipmentIds) => apiFetch('/users/me/equipment', { method: 'PUT', body: { equipment_ids: equipmentIds } }),
};
