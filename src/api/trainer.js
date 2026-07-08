import { apiFetch } from './client';

// API per la gestione dei clienti da parte del trainer
export const trainerApi = {
  getClients: () => apiFetch('/trainer/clients'),
  addClient: (email) => apiFetch('/trainer/clients', { method: 'POST', body: { email } }),
  removeClient: (clientId) => apiFetch(`/trainer/clients/${clientId}`, { method: 'DELETE' }),
  getClientAssignments: (clientId) => apiFetch(`/trainer/clients/${clientId}/assignments`),
  assignProgram: (clientId, programId) =>
    apiFetch(`/trainer/clients/${clientId}/assignments`, { method: 'POST', body: { programId } }),
  removeAssignment: (assignmentId) => apiFetch(`/trainer/assignments/${assignmentId}`, { method: 'DELETE' }),
};
