import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCategories } from '../../api/category';
import { updateProduct } from '../../api/product';
import { API_URL } from '../../constantes/constantes';

const EditProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [mainImage, setMainImage] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${API_URL}/products/${id}`);
        const data = await response.json();
        setProduct(data);
        setMainImage(data.images[0]); // Default main image
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchProduct();
    fetchCategories();
  }, [id]);

  const handleDeleteImage = (image) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta imagen?')) {
      setProduct({
        ...product,
        images: product.images.filter((img) => img !== image),
      });
    }
  };

  const handleSetMainImage = (image) => {
    setMainImage(image);
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    try {
      const updatedProduct = {
        title: product.title || '',
        description: product.description || '',
        price: parseFloat(product.price) || 0, // Asegurar que sea un número
        category: product.category || [], // Asegurar que sea un array de strings
        stock: parseInt(product.stock, 10) || 0, // Asegurar que sea un número entero
        images: product.images.map((image) => ({ url: image })), // Transformar a array de objetos con clave `url`
      };

      const response = await updateProduct(id, updatedProduct);

      if (!response || response.error) {
        throw new Error(response ? response.error : 'Error actualizando el producto');
      }

      alert('Producto actualizado correctamente');
    } catch (error) {
      console.error('Error actualizando producto:', error);
      alert('Error al actualizar el producto: ' + error.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold mb-6">Editar Producto</h1>
        <form className="space-y-4" onSubmit={handleUpdateProduct}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Título</label>
            <input
              type="text"
              value={product.title || ''}
              onChange={(e) => setProduct({ ...product, title: e.target.value })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Descripción</label>
            <textarea
              value={product.description || ''}
              onChange={(e) => setProduct({ ...product, description: e.target.value })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Precio</label>
            <input
              type="number"
              value={product.price || ''}
              onChange={(e) => setProduct({ ...product, price: e.target.value })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Stock</label>
            <input
              type="number"
              value={product.stock || ''}
              onChange={(e) => setProduct({ ...product, stock: e.target.value })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Categorías</label>
            <select
              multiple
              value={product.category || []}
              onChange={(e) =>
                setProduct({
                  ...product,
                  category: Array.from(e.target.selectedOptions, (option) => option.value),
                })
              }
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500 sm:text-sm"
            >
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Imágenes</label>
            <div className="grid grid-cols-2 gap-4 mt-2">
              {product.images.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={image}
                    alt={`Imagen ${index + 1}`}
                    className="w-full h-40 object-cover rounded-md shadow-md"
                  />
                  <button
                    onClick={() => handleDeleteImage(image)}
                    className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded-md shadow-md hover:bg-red-700"
                  >
                    Eliminar
                  </button>
                  <button
                    onClick={() => handleSetMainImage(image)}
                    className={`absolute bottom-2 right-2 px-2 py-1 rounded-md shadow-md ${
                      mainImage === image
                        ? 'bg-yellow-500 text-white'
                        : 'bg-gray-300 text-black hover:bg-yellow-500 hover:text-white'
                    }`}
                  >
                    {mainImage === image ? 'Principal' : 'Seleccionar'}
                  </button>
                </div>
              ))}
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-gray-900 to-gray-800 text-white py-2 rounded-lg hover:from-rose-600 hover:to-pink-600 transition-all duration-300 font-medium transform hover:scale-105"
          >
            Guardar Cambios
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
