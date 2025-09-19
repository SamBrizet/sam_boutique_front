import React, { useState, useEffect} from 'react';
import { Heart, Menu, X, ShoppingCart} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loadFavorites } from '../store/favoritesSlice';
import { getCart } from '../api/cart';
import { getDeviceId } from "../utils/deviceId";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.favorites.items);
  
  // Cargar favoritos al montar el componente
  useEffect(() => {
    dispatch(loadFavorites());
  }, [dispatch]);

  // Contar productos en el carrito
  useEffect(() => {
    const fetchCartCount = async () => {
      try {
        const deviceId = getDeviceId();
        const cartData = await getCart(deviceId);
        setCartCount(cartData.length);
      } catch (error) {
        console.error("Error fetching cart count:", error);
      }
    };

    fetchCartCount();

    const interval = setInterval(fetchCartCount, 5000); // Actualizar cada 5 segundos

    return () => clearInterval(interval); // Limpiar intervalo al desmontar
  }, []);

  useEffect(() => {
    const handleCartUpdate = async () => {
      try {
        const deviceId = getDeviceId();
        const cartData = await getCart(deviceId);
        setCartCount(cartData.length);
      } catch (error) {
        console.error("Error fetching cart count:", error);
      }
    };

    window.addEventListener("cartUpdated", handleCartUpdate);

    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdate);
    };
  }, []);

  return (
    <div className="bg-gradient-to-br from-rose-100 via-pink-50 to-orange-100 relative">
      <header className="relative bg-gradient-to-r from-white/95 via-rose-50/95 to-pink-50/95 backdrop-blur-md shadow-lg border-b border-rose-200 z-40">
        <div className="absolute inset-0 bg-gradient-to-r from-rose-200/20 to-pink-200/20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <h1
                className="text-2xl font-serif bg-gradient-to-r from-rose-600 via-pink-600 to-orange-500 bg-clip-text text-transparent tracking-wide cursor-pointer"
                onClick={() => navigate('/')}
              >
                Brisa Boutique
              </h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {['Inicio', 'Favoritos', 'Ofertas', 'Nosotros'].map((item) => (
                <span
                  key={item}
                  onClick={() => item === 'Inicio' ? navigate('/') : navigate(`/${item.toLowerCase()}`)}
                  className="text-gray-700 hover:text-rose-600 px-3 py-2 text-sm font-medium transition-colors duration-200 relative group cursor-pointer"
                >
                  {item}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-rose-600 group-hover:w-full transition-all duration-300"></span>
                </span>
              ))}
            </nav>

            {/* Icons */}
            <div className="flex items-center space-x-4">
              <button 
                className="p-2 text-gray-600 hover:text-rose-600 transition-colors relative flex items-center justify-center"
                onClick={() => navigate('/favoritos')}
              >
                <Heart className="h-5 w-5" />
                {favorites.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                    {favorites.length}
                  </span>
                )}
              </button>
              <button 
                className="p-2 text-gray-600 hover:text-rose-600 transition-colors relative flex items-center justify-center"
                onClick={() => navigate('/cart')}
              >
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                    {cartCount}
                  </span>
                )}
              </button>
              <button
                className="md:hidden p-2 text-gray-600"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div 
            className="md:hidden fixed inset-0 bg-black/20 z-40"
            onClick={() => setIsMenuOpen(false)}
          />
        )}
        
        {/* Mobile Menu */}
        <div className={`md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md border-b border-rose-100 shadow-lg z-50 transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
        }`}>
          <div className="px-4 py-4 space-y-2">
            {['Inicio', 'Favoritos', 'Ofertas', 'Nosotros'].map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => {
                  const path = item === 'Inicio' ? '/' : `/${item.toLowerCase()}`;
                  navigate(path);
                  setIsMenuOpen(false);
                }}
                className="block text-left w-full text-gray-700 hover:text-rose-600 py-3 px-2 transition-colors border-b border-gray-100 last:border-b-0"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </header>
    </div>
  );
};


export default Navigation;
