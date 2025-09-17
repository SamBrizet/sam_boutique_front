import axios from 'axios';
import { API_URL } from '../constantes/constantes';

export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/auth/login`, { email, password });
  return response.data; 
};