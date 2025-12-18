import axios from 'axios';
import { API_TOKEN, BASE_URL } from '../config/apiConfig';
import { store } from '../store';

export const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use(
  config => {
    const token = store.getState().auth.token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    config.headers['X-Api-Token'] = API_TOKEN;
    config.headers['Content-Type'] = 'application/json';

    return config;
  },
  error => Promise.reject(error)
);