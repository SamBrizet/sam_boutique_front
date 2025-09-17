import React from 'react';
import { ShoppingBag, Search, X } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';

const Navigation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/admin/login');
  };

  return (
    <div className="bg-gradient-to-br from-rose-100 via-pink-50 to-orange-100">
      <header className="relative bg-gradient-to-r from-white/95 via-rose-50/95 to-pink-50/95 backdrop-blur-md shadow-lg border-b border-rose-200">
        <div className="absolute inset-0 bg-gradient-to-r from-rose-200/20 to-pink-200/20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <h1
                onClick={() => navigate('/admin/dashboard')}
                className="text-2xl font-serif bg-gradient-to-r from-rose-600 via-pink-600 to-orange-500 bg-clip-text text-transparent tracking-wide cursor-pointer"
              >
                Sam Boutique
              </h1>
            </div>

            {/* Navigation */}
            <nav className="flex space-x-8">
              {['Uploads', 'Products', 'Logs', 'Remarketing'].map((item) => (
                <button
                  key={item}
                  onClick={() =>
                    item === 'Products' ? navigate('/admin/products') : null
                  }
                  className="text-gray-700 hover:text-rose-600 px-3 py-2 text-sm font-medium transition-colors duration-200 relative group"
                >
                  {item}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-rose-600 group-hover:w-full transition-all duration-300"></span>
                </button>
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
                className="p-2 text-gray-600 hover:text-rose-600 transition-colors"
                onClick={handleLogout}
              >
                <span className="sr-only">Cerrar sesión</span>
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navigation;
