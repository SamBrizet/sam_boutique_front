import React, { useEffect, useState } from "react";
import { getCart, updateCartItem, removeFromCart } from "../api/cart";
import { getDeviceId } from "../utils/deviceId";
import axios from "axios";
import { API_URL } from '../constantes/constantes';


const Cart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const deviceId = getDeviceId();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        setLoading(true);
        const cartData = await getCart(deviceId);
        const updatedCart = await Promise.all(
          cartData.map(async (item) => {
            const productResponse = await axios.get(
              `${API_URL}/products/${item.productId}`
            );
            const product = productResponse.data;
            return {
              ...item,
              productName: product.title,
              image: product.images[0],
            };
          })
        );
        setCart(updatedCart);
      } catch (err) {
        console.error("Error fetching cart:", err);
        setError("Error al cargar el carrito. Por favor, intenta de nuevo.");
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [deviceId]);

  const handleUpdateQuantity = async (productId, quantity) => {
    const previousCart = [...cart];
    const updatedCart = cart.map((item) =>
      item.productId === productId ? { ...item, quantity } : item
    );
    setCart(updatedCart);

    try {
      await updateCartItem(deviceId, productId, quantity);
    } catch (err) {
      console.error("Error updating cart item:", err);
      alert("Error al actualizar la cantidad del producto.");
      setCart(previousCart); // Revert changes on error
    }
  };

  const handleRemoveItem = async (productId) => {
    const previousCart = [...cart];
    const updatedCart = cart.filter((item) => item.productId !== productId);
    setCart(updatedCart);

    try {
      await removeFromCart(deviceId, productId);
    } catch (err) {
      console.error("Error removing cart item:", err);
      alert("Error al eliminar el producto del carrito.");
      setCart(previousCart); // Revert changes on error
    }
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  if (loading) {
    return <p>Cargando carrito...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-100 via-pink-50 to-orange-100">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-12">
        <h1 className="text-2xl sm:text-3xl font-serif text-gray-800 mb-6">
          Carrito de Compras
        </h1>
        {cart.length === 0 ? (
          <p className="text-gray-600 text-lg">Tu carrito está vacío.</p>
        ) : (
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <ul className="divide-y divide-gray-200">
              {cart.map((item) => (
                <li key={item.productId} className="flex flex-col sm:flex-row items-center justify-between p-4">
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.image || "https://via.placeholder.com/100"}
                      alt={item.productName}
                      className="w-16 h-16 sm:w-24 sm:h-24 rounded object-cover"
                    />
                    <div>
                      <h2 className="text-lg font-medium text-gray-800">{item.productName}</h2>
                      <p className="text-sm text-gray-500">Cantidad: {item.quantity}</p>
                      <p className="text-sm text-gray-500">Precio: ${item.price}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 mt-4 sm:mt-0">
                    <button
                      onClick={() => handleUpdateQuantity(item.productId, item.quantity + 1)}
                      className="px-3 py-1 bg-rose-600 text-white rounded hover:bg-rose-700"
                    >
                      +
                    </button>
                    <button
                      onClick={() => handleUpdateQuantity(item.productId, item.quantity - 1)}
                      className="px-3 py-1 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                    >
                      -
                    </button>
                    <button
                      onClick={() => handleRemoveItem(item.productId)}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Eliminar
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="p-4 text-right">
              <h2 className="text-xl font-semibold text-gray-800">Total: ${calculateTotal()}</h2>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;