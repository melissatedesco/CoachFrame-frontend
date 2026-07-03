import { apiFetch } from './client';

export const exercisesApi = {
  getAll: ({ muscleGroup, difficulty, myEquipment } = {}) => {
    const params = new URLSearchParams();
    if (muscleGroup) params.set('muscle_group', muscleGroup);
    if (difficulty) params.set('difficulty', difficulty);
    if (myEquipment) params.set('my_equipment', 'true');
    const qs = params.toString();
    return apiFetch(`/exercises${qs ? `?${qs}` : ''}`);
  },

  getById: (id) => apiFetch(`/exercises/${id}`),

  getRules: (id) => apiFetch(`/exercises/${id}/rules`),
};
