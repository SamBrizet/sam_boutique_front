import { API_URL } from '../constantes/constantes';
import { getDeviceId } from '../utils/deviceId';

export const favoritesAPI = {
  // Toggle favorite (add/remove)
  toggleFavorite: async (productId) => {
    const deviceId = getDeviceId();
    const response = await fetch(`${API_URL}/favorites/toggle`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ deviceId, productId }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to toggle favorite');
    }
    
    return response.json();
  },

  // Get all favorites for current device
  getFavorites: async () => {
    const deviceId = getDeviceId();
    console.log('Fetching favorites for device:', deviceId);
    const response = await fetch(`${API_URL}/favorites/${deviceId}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch favorites');
    }
    
    return response.json();
  },

  getFavoriteProducts: async () => {
    const deviceId = getDeviceId();
    const response = await fetch(`${API_URL}/favorites/products/${deviceId}`);

    if (!response.ok) {
      throw new Error('Failed to fetch favorite products');
    }

    return response.json();
  },

  // Check if a product is favorite
  checkFavorite: async (productId) => {
    const deviceId = getDeviceId();
    const response = await fetch(`${API_URL}/favorites/${deviceId}/${productId}`);
    
    if (!response.ok) {
      throw new Error('Failed to check favorite');
    }
    
    return response.json();
  },
};
