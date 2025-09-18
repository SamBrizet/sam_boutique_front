import React from "react";
import { useNavigate } from "react-router-dom";

const Snackbar = ({ message, onClose }) => {
  const navigate = useNavigate();

  if (!message) return null;

  return (
    <div
      className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-3 py-2 rounded shadow-lg z-50 text-sm sm:text-base"
    >
      {message}
      <button
        onClick={onClose}
        className="ml-4 text-xs sm:text-sm text-rose-400 hover:text-rose-600 focus:outline-none"
      >
        Cerrar
      </button>
      <button
        onClick={() => navigate('/cart')}
        className="ml-4 text-xs sm:text-sm text-blue-400 hover:text-blue-600 focus:outline-none"
      >
        Ver carrito
      </button>
    </div>
  );
};

export default Snackbar;