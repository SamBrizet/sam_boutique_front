import axios from 'axios';
import { API_URL } from '../constantes/constantes';


// Get all categories
export const getCategories = async () => {
  try {
    const response = await axios.get(`${API_URL}/categories`);
    console.log('Fetched categories:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

// Get a category by ID
export const getCategoryById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/categories/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching category by ID:', error);
    throw error;
  }
};

// Create a new category
export const createCategory = async (categoryData) => {
  try {
    const response = await axios.post(`${API_URL}/categories`, categoryData);
    return response.data;
  } catch (error) {
    console.error('Error creating category:', error);
    throw error;
  }
};

// Update a category by ID
export const updateCategory = async (id, categoryData) => {
  try {
    const response = await axios.put(`${API_URL}/categories/${id}`, categoryData);
    return response.data;
  } catch (error) {
    console.error('Error updating category:', error);
    throw error;
  }
};

// Delete a category by ID
export const deleteCategory = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/categories/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting category:', error);
    throw error;
  }
};