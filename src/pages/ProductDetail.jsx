import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShoppingBag, Star, Heart } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite, loadFavorites } from '../store/favoritesSlice';
import { API_URL } from '../constantes/constantes';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const favorites = useSelector(state => state.favorites.items || []);
  const dispatch = useDispatch();

  const handleToggleFavorite = (id) => {
    dispatch(toggleFavorite(id)); // Dispatch the async thunk
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`${API_URL}/products/${id}`);
        
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        setProduct(data);
        if (data.images && data.images.length > 0) {
          setSelectedImage(data.images[0]);
        }
      } catch (error) {
        console.error('Error fetching product details:', error);
        setError('Error al cargar el producto. Por favor, intenta de nuevo.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
    // Cargar favoritos al montar el componente
    dispatch(loadFavorites());
  }, [id, dispatch]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-rose-100 via-pink-50 to-orange-100">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-rose-600 mb-4"></div>
        <p className="text-gray-600 text-xl">Cargando producto...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-rose-100 via-pink-50 to-orange-100">
        <div className="text-red-500 text-8xl mb-4">⚠️</div>
        <p className="text-red-600 text-xl mb-4">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="bg-rose-600 text-white px-6 py-3 rounded-full hover:bg-rose-700 transition-colors"
        >
          Reintentar
        </button>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-rose-100 via-pink-50 to-orange-100">
        <div className="text-gray-500 text-8xl mb-4">📦</div>
        <p className="text-gray-600 text-xl">Producto no encontrado</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-100 via-pink-50 to-orange-100">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-12 grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
        {/* Galería */}
        <div>
          <div className="relative rounded-2xl overflow-hidden shadow-lg mb-4">
            <img
              src={selectedImage}
              alt={product.title}
              className="w-full h-64 sm:h-80 lg:h-[500px] object-cover transition-transform duration-500 hover:scale-105"
            />
            <button
              onClick={() => handleToggleFavorite(product._id)}
              className="absolute top-4 right-4 p-3 bg-white/90 rounded-full shadow-lg hover:bg-white transition-all"
            >
              <Heart
                className={`h-5 w-5 ${
                  favorites.includes(product._id) ? 'text-rose-600 fill-current' : 'text-gray-600'
                }`}
              />
            </button>
          </div>
          {/* Miniaturas */}
          <div className="grid grid-cols-4 gap-2 sm:gap-3">
            {product.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumbnail ${index}`}
                className={`w-full h-16 sm:h-20 lg:h-24 object-cover rounded-lg cursor-pointer border-2 transition-all ${
                  selectedImage === img ? 'border-rose-500' : 'border-transparent'
                }`}
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>
        </div>

        {/* Información del producto */}
        <div className="flex flex-col justify-center">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-gray-800 mb-4">{product.title}</h1>
          <div className="flex items-center mb-4">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 sm:h-5 sm:w-5 ${
                  i < Math.floor(product.rating || 4) ? 'text-amber-400 fill-current' : 'text-gray-300'
                }`}
              />
            ))}
            <span className="ml-2 text-gray-600 text-sm">
              ({product.rating || '4.0'})
            </span>
          </div>
          <p className="text-gray-600 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">{product.description}</p>

          <div className="flex items-center space-x-4 mb-6 sm:mb-8">
            <span className="text-2xl sm:text-3xl font-bold text-gray-900">
              S/ {product.price}
            </span>
            {product.originalPrice && (
              <span className="text-base sm:text-lg text-gray-500 line-through">
                S/ {product.originalPrice}
              </span>
            )}
          </div>

          <p className="text-gray-700 mb-4 sm:mb-6 text-sm sm:text-base">
            <span className="font-semibold">Stock disponible:</span> {product.stock}
          </p>

          <button className="flex items-center justify-center w-full bg-gradient-to-r from-gray-900 to-gray-800 text-white py-3 sm:py-4 rounded-xl hover:from-rose-600 hover:to-pink-600 transition-all duration-300 font-medium shadow-lg transform hover:scale-105 text-sm sm:text-base">
            <ShoppingBag className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
