import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Heart, Star, ArrowRight, Instagram, Facebook, Twitter } from 'lucide-react';
import { toggleFavorite, loadFavorites } from '../store/favoritesSlice';
import { API_URL } from '../constantes/constantes';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const favorites = useSelector(state => state.favorites.items || []);

  const handleToggleFavorite = (id) => {
    dispatch(toggleFavorite(id)); // Dispatch the async thunk
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`${API_URL}/products`);
        
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Error al cargar los productos. Por favor, intenta de nuevo.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
    // Cargar favoritos al montar el componente
    dispatch(loadFavorites());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-100 via-pink-50 to-orange-100">
     
      {/* Hero Section */}
      <section className="relative h-80 sm:h-96 bg-gradient-to-br from-rose-200 via-pink-200 to-orange-200 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="max-w-2xl text-center sm:text-left">
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-serif text-gray-800 mb-4 leading-tight">
              Nueva
              <span className="block text-rose-600">Colección</span>
              <span className="text-xl sm:text-2xl md:text-3xl font-light">Primavera 2025</span>
            </h2>
            <p className="text-gray-600 text-base sm:text-lg mb-6 sm:mb-8 leading-relaxed">
              Descubre piezas únicas que definen tu estilo personal con la máxima elegancia y sofisticación.
            </p>
            <button className="bg-gradient-to-r from-rose-600 to-pink-600 text-white px-6 sm:px-8 py-3 rounded-full hover:from-pink-600 hover:to-orange-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center space-x-2 mx-auto sm:mx-0">
              <span>Explorar Colección</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
        
        {/* Decorative elements - hidden on mobile for better performance */}
        <div className="hidden sm:block absolute top-20 right-20 w-32 h-32 bg-gradient-to-r from-rose-300/40 to-pink-300/40 rounded-full blur-xl animate-pulse"></div>
        <div className="hidden sm:block absolute bottom-20 right-40 w-24 h-24 bg-gradient-to-r from-pink-300/40 to-orange-300/40 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="hidden sm:block absolute top-32 left-10 w-20 h-20 bg-gradient-to-r from-purple-300/30 to-pink-300/30 rounded-full blur-xl animate-pulse delay-500"></div>
      </section>

      {/* Featured Products */}
      <section className="py-8 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-600 mb-4"></div>
            <p className="text-gray-600 text-lg">Cargando productos...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <p className="text-red-600 text-lg mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-rose-600 text-white px-6 py-2 rounded-full hover:bg-rose-700 transition-colors"
            >
              Reintentar
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {products.map((product) => (
            <div
              key={product._id}
              className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden border border-rose-200/50 hover:border-pink-300"
            >
              <div className="relative overflow-hidden">
                <div
                  onClick={() => navigate(`/producto/detail/${product._id}`)}
                  className="cursor-pointer"
                >
                  <img
                    src={product.images[0] || "https://via.placeholder.com/300"}
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="absolute top-4 left-4 flex flex-col space-y-2">
                  {product.isNew && (
                    <span className="bg-gradient-to-r from-rose-600 to-pink-600 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg">
                      Nuevo
                    </span>
                  )}
                  {product.isFeatured && (
                    <span className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg">
                      Destacado
                    </span>
                  )}
                </div>
                <button
                  onClick={() => handleToggleFavorite(product._id)}
                  className="absolute top-4 right-4 p-2 bg-white/90 rounded-full shadow-lg hover:bg-white transition-all duration-200 flex items-center justify-center"
                >
                  <Heart
                    className={`h-4 w-4 ${
                      favorites.includes(product._id)
                        ? 'text-rose-600 fill-current'
                        : 'text-gray-600'
                    }`}
                  />
                </button>
                 
              </div>

              <div className="p-4 sm:p-6">
                <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3 w-3 sm:h-4 sm:w-4 ${
                        i < Math.floor(product.rating)
                          ? 'text-amber-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="text-xs sm:text-sm text-gray-600 ml-2">({product.rating})</span>
                </div>
                
                <h4 className="font-medium text-gray-800 mb-2 line-clamp-2 text-sm sm:text-base">
                  {product.name}
                </h4>
                
                <div className="flex items-center space-x-2 mb-3 sm:mb-4">
                  <span className="text-lg sm:text-xl font-semibold text-gray-800">
                    s/ {product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xs sm:text-sm text-gray-500 line-through">
                     s/ {product.originalPrice}
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap gap-1 sm:gap-2 mt-2">
                  {product.category.map((cat) => (
                    <span
                      key={cat._id}
                      className="bg-rose-100 text-rose-600 text-xs font-medium px-2 sm:px-3 py-1 rounded-full shadow-sm"
                    >
                      {cat.name}
                    </span>
                  ))}
                </div>

                <button className="w-full bg-gradient-to-r from-gray-900 to-gray-800 text-white py-2 sm:py-3 rounded-xl hover:from-rose-600 hover:to-pink-600 transition-all duration-300 font-medium transform hover:scale-105 mt-2 text-sm sm:text-base">
                  Agregar al Carrito
                </button>
              </div>
            </div>
            ))}
          </div>
        )}
      </section>

      {/* Newsletter Section */}
      <section className="bg-gradient-to-br from-rose-600 via-pink-600 to-orange-500 py-12 sm:py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20"></div>
        <div className="hidden sm:block absolute top-10 left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
        <div className="hidden sm:block absolute bottom-10 right-10 w-32 h-32 bg-pink-300/20 rounded-full blur-2xl"></div>
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
          <h3 className="text-2xl sm:text-3xl font-serif text-white mb-4">
            Mantente al día con las últimas tendencias
          </h3>
          <p className="text-pink-100 mb-6 sm:mb-8 text-base sm:text-lg">
            Suscríbete y recibe ofertas exclusivas y novedades antes que nadie
          </p>
          <div className="flex flex-col sm:flex-row max-w-md mx-auto space-y-4 sm:space-y-0 sm:space-x-4">
            <input
              type="email"
              placeholder="Tu email"
              className="flex-1 px-4 sm:px-6 py-3 rounded-full border-0 focus:ring-4 focus:ring-rose-300 focus:outline-none text-sm sm:text-base"
            />
            <button className="bg-white text-rose-600 px-6 sm:px-8 py-3 rounded-full hover:bg-gray-50 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:scale-105 text-sm sm:text-base">
              Suscribirse
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-8 sm:py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-rose-900/20 to-pink-900/20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            <div>
              <h4 className="text-2xl font-serif bg-gradient-to-r from-rose-400 via-pink-400 to-orange-400 bg-clip-text text-transparent mb-4">Sam Boutique</h4>
              <p className="text-gray-400 mb-4">
                Redefiniendo la elegancia con piezas únicas y atemporales.
              </p>
              <div className="flex space-x-4">
                {[Instagram, Facebook, Twitter].map((Icon, index) => (
                  <button
                    key={index}
                    className="p-2 bg-gradient-to-r from-gray-800 to-gray-700 rounded-full hover:from-rose-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-110"
                  >
                    <Icon className="h-4 w-4" />
                  </button>
                ))}
              </div>
            </div>

            {[
              {
                title: 'Comprar',
                links: ['Nueva Colección', 'Vestidos', 'Accesorios', 'Ofertas'],
              },
              {
                title: 'Ayuda',
                links: ['Contacto', 'Envíos', 'Devoluciones', 'Guía de Tallas'],
              },
              {
                title: 'Empresa',
                links: ['Nosotros', 'Carreras', 'Prensa', 'Sostenibilidad'],
              },
            ].map((section) => (
              <div key={section.title}>
                <h5 className="font-semibold mb-4">{section.title}</h5>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link}>
                      <button
                        type="button"
                        onClick={() => {
                          const path = `/${link.toLowerCase().replace(/\s+/g, '-')}`;
                          navigate(path);
                        }}
                        className="block w-full text-left text-gray-400 hover:text-white py-2 transition-colors"
                      >
                        {link}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Sam Boutique. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;