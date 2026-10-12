const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api/v1';

async function request(path) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: { 'Accept': 'application/json' }
  });
  if (!response.ok) throw new Error(`API request failed (${response.status})`);
  return response.json();
}

export const getOverview = () => request('/dashboard/overview');
export const getComputers = () => request('/computers');
export const getActiveSessions = () => request('/sessions/active');
export const getSessions = (query = '') => request(`/sessions${query}`);
