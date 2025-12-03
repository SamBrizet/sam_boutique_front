import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Heart, Instagram, Facebook, Twitter } from 'lucide-react';
import { toggleFavorite, loadFavorites } from '../store/favoritesSlice';
import { API_URL } from '../constantes/constantes';
import { addToCart, getCart } from "../api/cart";
import { getDeviceId } from "../utils/deviceId";
import Snackbar from "../components/Snackbar";
import SubscribeSection from "../components/SubscribeSection";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [cart, setCart] = useState([]);
  const [addingToCart, setAddingToCart] = useState({});
  const [isMobile, setIsMobile] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const favorites = useSelector(state => state.favorites.items || []);

  const handleToggleFavorite = (id) => {
    dispatch(toggleFavorite(id)); // Dispatch the async thunk
  };

  const handleAddToCart = async (productId) => {
    const deviceId = getDeviceId();
    setAddingToCart((prevState) => ({ ...prevState, [productId]: true }));
    try {
      await addToCart(deviceId, productId, 1);
      setSnackbarMessage("Producto agregado al carrito");

      // Actualizar el estado del carrito
      const updatedCart = await getCart(deviceId);
      setCart(updatedCart);
    } catch (error) {
      console.error("Error al agregar al carrito", error);
      setSnackbarMessage("Hubo un error al agregar el producto al carrito");
    } finally {
      setAddingToCart((prevState) => ({ ...prevState, [productId]: false }));
    }
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

    const fetchCart = async () => {
      const deviceId = getDeviceId();
      try {
        const cartData = await getCart(deviceId);
        setCart(cartData);
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };

    fetchProducts();
    fetchCart();
    // Cargar favoritos al montar el componente
    dispatch(loadFavorites());
  }, [dispatch]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); // Check on initial load
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const isProductInCart = (productId) => {
    return cart.some((item) => item.productId === productId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-100 via-pink-50 to-orange-100">
     
      {/* Hero Section */}
      <section className="relative h-80 sm:h-96 bg-gradient-to-br from-rose-200 via-pink-200 to-orange-200 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col sm:flex-row items-center">
          <div className="max-w-2xl text-center sm:text-left mb-4 sm:mb-0">
            <h2 className={`text-xl sm:text-3xl md:text-5xl font-serif text-gray-800 mb-1 leading-tight mt-2 ${isMobile ? 'block' : ''}`}>
              Nueva Colección
              <span className="block text-rose-600">Primavera 2025</span>
            </h2>
            <p className="hidden sm:block text-gray-600 text-xs sm:text-base mb-4 sm:mb-8 leading-relaxed">
              Descubre piezas únicas que definen tu estilo personal con la máxima elegancia y sofisticación.
            </p>
          </div>
          <SubscribeSection className="w-full sm:w-auto px-2 py-2 sm:px-6 sm:py-8 bg-white rounded-lg shadow-md" />
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
              onClick={() => navigate(`/producto/detail/${product._id}`)}
              className="group bg-white/0 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden border border-rose-200/0 hover:border-pink-300 h-[420px] sm:h-[460px] lg:h-[640px]"
            >
              <div className="relative h-full overflow-hidden">
                <img
                  src={product.images[0] || "https://via.placeholder.com/300"}
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                />

                {/* badges */}
                <div className="absolute top-4 left-4 flex flex-col space-y-2 z-10">
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

                {/* favorite button */}
                <button
                  onClick={(e) => { e.stopPropagation(); handleToggleFavorite(product._id); }}
                  className="absolute top-4 right-4 p-2 bg-white/90 rounded-full shadow-lg hover:bg-white transition-all duration-200 flex items-center justify-center z-10"
                >
                  <Heart
                    className={`h-4 w-4 ${
                      favorites.includes(product._id)
                        ? 'text-rose-600 fill-current'
                        : 'text-gray-600'
                    }`}
                  />
                </button>

                {/* Overlay: title always visible, actions on hover */}
                <div className="absolute inset-0 flex flex-col justify-end p-4 z-10">
                  <div className="bg-gradient-to-t from-black/60 to-transparent p-3 rounded-t-lg">
                    <h4 className="font-medium text-white mb-0 line-clamp-2 text-base sm:text-lg lg:text-xl">
                      {product.title || "Producto sin nombre"}
                    </h4>
                  </div>

                  <div className="mt-2 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <div className="bg-white/90 backdrop-blur-sm p-3 rounded-lg flex items-center justify-between">
                      <div>
                        <span className="text-lg sm:text-xl font-semibold text-gray-800">s/ {product.price}</span>
                        {product.originalPrice && (
                          <div className="text-xs text-gray-500 line-through">s/ {product.originalPrice}</div>
                        )}
                      </div>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleAddToCart(product._id); }}
                        disabled={addingToCart[product._id] || isProductInCart(product._id)}
                        className={`ml-4 bg-gradient-to-r from-gray-900 to-gray-800 text-white py-2 px-4 rounded-xl hover:from-rose-600 hover:to-pink-600 transition-all duration-300 font-medium ${addingToCart[product._id] || isProductInCart(product._id) ? "opacity-50 cursor-not-allowed" : ""}`}
                      >
                        {isProductInCart(product._id) ? "Ya en el carrito" : addingToCart[product._id] ? "Agregando..." : "Agregar"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            ))}
          </div>
        )}
      </section>

      {/* Newsletter Section */}
      <SubscribeSection />

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-8 sm:py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-rose-900/20 to-pink-900/20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            <div>
              <h4 className="text-2xl font-serif bg-gradient-to-r from-rose-400 via-pink-400 to-orange-400 bg-clip-text text-transparent mb-4">Brisa Boutique</h4>
              <p className="text-gray-400 mb-4">
                Redefiniendo la elegancia con piezas únicas y atemporales.
              </p>
              <div className="flex justify-center items-center space-x-4">
                {[Instagram, Facebook, Twitter].map((Icon, index) => (
                  <button
                    key={index}
                    className="p-4 bg-gradient-to-r from-gray-800 to-gray-700 rounded-full flex items-center justify-center hover:from-rose-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-110"
                  >
                    <Icon className="h-6 w-6 text-white" />
                  </button>
                ))}
              </div>
            </div>

            {[
              {
                title: 'Comprar',
                links: ['Nueva Colección', 'Vestidos', 'Accesorios', 'Ofertas'],
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
            <p>&copy; 2025 Brisa Boutique. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>

      <Snackbar message={snackbarMessage} onClose={() => setSnackbarMessage("")} />
    </div>
  );
}

export default Home;