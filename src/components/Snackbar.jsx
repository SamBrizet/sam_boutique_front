import React from "react";

const Snackbar = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded shadow-lg z-50">
      {message}
      <button
        onClick={onClose}
        className="ml-4 text-sm text-rose-400 hover:text-rose-600 focus:outline-none"
      >
        Cerrar
      </button>
    </div>
  );
};

export default Snackbar;