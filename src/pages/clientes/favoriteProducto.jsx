import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { favoritesAPI } from '../../api/favorites';

const FavoriteProducto = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await favoritesAPI.getFavoriteProducts();
        setFavorites(response);
      } catch (error) {
        console.error('Error fetching favorites:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-100 via-pink-50 to-orange-100 pt-2">
      <h1 className="text-4xl font-serif text-center text-gray-800">
        Productos Favoritos
      </h1>
      {favorites.length === 0 ? (
        <p className="text-center text-gray-600">
          No tienes productos favoritos.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          {favorites.map((product) => (
            <div
              key={product._id}
              className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden border border-rose-200/50 hover:border-pink-300"
            >
              <div
                onClick={() => navigate(`/producto/detail/${product._id}`)}
                className="cursor-pointer"
              >
                <img
                  src={product.images[0] || 'https://via.placeholder.com/300'}
                  alt={product.title}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h4 className="font-medium text-gray-800 mb-2 line-clamp-2">
                  {product.title}
                </h4>
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-xl font-semibold text-gray-800">
                    S/ {product.price}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoriteProducto;
