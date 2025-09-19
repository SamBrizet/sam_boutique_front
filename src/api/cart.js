import axios from "axios";
import { API_URL } from '../constantes/constantes';

export const addToCart = async (deviceId, productId, quantity) => {
  const response = await axios.post(`${API_URL}/cart`, {
    deviceId,
    productId,
    quantity,
  });

  // Emitir evento cartUpdated
  window.dispatchEvent(new Event("cartUpdated"));

  return response.data;
};

export const getCart = async (deviceId) => {
  const response = await axios.get(`${API_URL}/cart`, {
    params: { deviceId },
  });
  return response.data;
};

export const updateCartItem = async (deviceId, productId, quantity) => {
  const response = await axios.put(`${API_URL}/cart`, {
    deviceId,
    productId,
    quantity,
  });
  return response.data;
};

export const removeFromCart = async (deviceId, productId) => {
  const response = await axios.delete(`${API_URL}/cart`, {
    data: { deviceId, productId },
  });

  // Emitir evento cartUpdated
  window.dispatchEvent(new Event("cartUpdated"));

  return response.data;
};