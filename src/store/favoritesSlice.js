import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { favoritesAPI } from '../api/favorites';

// Async thunk para cargar favoritos desde el servidor
export const loadFavorites = createAsyncThunk(
  'favorites/loadFavorites',
  async () => {
    const favorites = await favoritesAPI.getFavorites();
    return favorites;
  }
);

// Async thunk para toggle favorite
export const toggleFavorite = createAsyncThunk(
  'favorites/toggleFavorite',
  async (productId) => {
    const result = await favoritesAPI.toggleFavorite(productId);
    return { productId, isFavorite: result.isFavorite };
  }
);

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    items: [],
    loading: false,
    error: null
  },
  reducers: {
    resetFavorites: (state) => {
      state.items = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Load favorites
      .addCase(loadFavorites.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadFavorites.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(loadFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Toggle favorite
      .addCase(toggleFavorite.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleFavorite.fulfilled, (state, action) => {
        state.loading = false;
        const { productId, isFavorite } = action.payload;
        
        if (isFavorite) {
          // Add to favorites
          if (!state.items.includes(productId)) {
            state.items.push(productId);
          }
        } else {
          // Remove from favorites
          const index = state.items.indexOf(productId);
          if (index > -1) {
            state.items.splice(index, 1);
          }
        }
      })
      .addCase(toggleFavorite.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { resetFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;