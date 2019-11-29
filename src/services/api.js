import { API_URL } from 'react-native-dotenv';
import { getToken, onSignOut } from './auth';
import axios from 'axios';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(async config => {
  const token = await getToken();
  const headers = { ...config.headers };
  console.log(headers);

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return { ...config, headers };
});

api.interceptors.response.use(
  response => response,
  async error => {
    console.log(error);
    if (error.response.status === 401 || error.response.status === 403) {
      console.log('unauthorized');
      await onSignOut();
    }
    return Promise.reject(error);
  },
);

export default api;
