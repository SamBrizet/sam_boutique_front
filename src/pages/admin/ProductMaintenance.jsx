import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../constantes/constantes';

const ProductMaintenance = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_URL}/products`);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold mb-6">Editar Productos</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product._id}
              className="group bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-200"
            >
              <div
                onClick={() => navigate(`/producto/detail/${product._id}`)}
                className="cursor-pointer"
              >
                <img
                  src={product.images[0] || 'https://via.placeholder.com/300'}
                  alt={product.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h4 className="font-medium text-gray-800 mb-2 line-clamp-2">
                  {product.name}
                </h4>
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-xl font-semibold text-gray-800">
                    s/ {product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">
                      s/ {product.originalPrice}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => navigate(`/admin/product/edit/${product._id}`)}
                  className="w-full bg-gradient-to-r from-gray-900 to-gray-800 text-white py-2 rounded-lg hover:from-rose-600 hover:to-pink-600 transition-all duration-300 font-medium transform hover:scale-105"
                >
                  Editar Producto
                </button>
                <button className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-all duration-300 font-medium transform hover:scale-105 mt-2">
                  Eliminar Producto
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductMaintenance;