import apiFetch from './api';

export const cvService = {
  getMyCVs: () => apiFetch('/cvs'),

  getCVById: (id) => apiFetch(`/cvs/${id}`),

  createCV: (cvData) =>
    apiFetch('/cvs', {
      method: 'POST',
      body: JSON.stringify(cvData),
    }),

  updateCV: ({ id, ...cvData }) =>
    apiFetch(`/cvs/${id}`, {
      method: 'PUT',
      body: JSON.stringify(cvData),
    }),

  deleteCV: (id) =>
    apiFetch(`/cvs/${id}`, { method: 'DELETE' }),

  syncUser: (userData) =>
    apiFetch('/users/sync', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),

  getMe: () => apiFetch('/users/me'),

  getApplications: () => apiFetch('/applications'),

  createApplication: (appData) =>
    apiFetch('/applications', {
      method: 'POST',
      body: JSON.stringify(appData),
    }),

  updateApplication: ({ id, ...appData }) =>
    apiFetch(`/applications/${id}`, {
      method: 'PUT',
      body: JSON.stringify(appData),
    }),

  deleteApplication: (id) =>
    apiFetch(`/applications/${id}`, { method: 'DELETE' }),
};
