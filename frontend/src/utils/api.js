import axios from 'axios';

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export const notesAPI = {
  generateNotes: (videoUrl, mode) => {
    return api.post('/notes/generate', { videoUrl, mode }, {
      responseType: 'stream',
    });
  },

  fetchNotes: () => {
    return api.get('/notes');
  },

  fetchNote: (id) => {
    return api.get(`/notes/${id}`);
  },

  updateNote: (id, contentMarkdown) => {
    return api.put(`/notes/${id}`, { contentMarkdown });
  },

  deleteNote: (id) => {
    return api.delete(`/notes/${id}`);
  },
};

export const authAPI = {
  login: (email, password) => {
    return api.post('/auth/login', { email, password });
  },

  register: (name, email, password) => {
    return api.post('/auth/register', { name, email, password });
  },
};

export default api;
