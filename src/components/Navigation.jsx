import React, { useState} from 'react';
import { ShoppingBag, Search, Menu, X} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-br from-rose-100 via-pink-50 to-orange-100">
      <header className="relative bg-gradient-to-r from-white/95 via-rose-50/95 to-pink-50/95 backdrop-blur-md shadow-lg border-b border-rose-200">
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
              <button className="p-2 text-gray-600 hover:text-rose-600 transition-colors">
                <Search className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-600 hover:text-rose-600 transition-colors relative">
                <ShoppingBag className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  2
                </span>
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

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md border-b border-rose-100 shadow-lg">
            <div className="px-4 py-4 space-y-4">
              {['Colecciones', 'Nueva Temporada', 'Ofertas', 'Nosotros'].map((item) => (
                <a
                  key={item}
                  href="#" 
                  className="block text-gray-700 hover:text-rose-600 py-2 transition-colors"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>
    </div>
  );
};


export default Navigation;
