import { apiFetch } from './client';

export const sessionsApi = {
  start: (programId) => apiFetch('/sessions', { method: 'POST', body: { program_id: programId ?? null } }),
  close: (id) => apiFetch(`/sessions/${id}/close`, { method: 'PATCH' }),

  getAll: () => apiFetch('/sessions'),
  getById: (id) => apiFetch(`/sessions/${id}`),

  logExercise: (sessionId, { exercise_id, sets_done, reps_done, form_score }) =>
    apiFetch(`/sessions/${sessionId}/exercises`, {
      method: 'POST',
      body: { exercise_id, sets_done, reps_done, form_score },
    }),

  getStats: () => apiFetch('/sessions/stats'),
  getExerciseHistory: (exerciseId) => apiFetch(`/sessions/exercises/${exerciseId}/history`),
};
