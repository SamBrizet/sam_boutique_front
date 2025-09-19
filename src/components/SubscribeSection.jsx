import React from "react";

const SubscribeSection = () => {
  return (
    <div className="bg-gradient-to-br from-rose-200 via-pink-200 to-orange-200 py-6 sm:py-8 rounded-lg shadow-md border border-rose-300 ml-auto mr-0 max-w-md overflow-hidden">
      <div className="text-center px-4 sm:px-6 lg:px-8">
        <h3 className="text-lg sm:text-xl font-serif text-gray-800 mb-2">
          Mantente al día con las últimas tendencias
        </h3>
        <p className="text-gray-600 mb-3 text-sm sm:text-base">
          Suscríbete y recibe ofertas exclusivas y novedades antes que nadie
        </p>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
          <input
            type="email"
            placeholder="Tu email"
            className="flex-1 px-3 py-2 rounded-full border border-gray-300 focus:ring-2 focus:ring-rose-300 focus:outline-none text-sm sm:text-base"
          />
          <button className="bg-rose-600 text-white px-4 py-2 rounded-full hover:bg-rose-700 transition-all duration-300 font-medium shadow-md hover:shadow-lg transform hover:scale-105 text-sm sm:text-base">
            Suscribirse
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscribeSection;