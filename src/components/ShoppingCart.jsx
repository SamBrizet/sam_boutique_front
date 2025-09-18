import React, { useEffect, useState } from "react";
import { getDeviceId } from "../utils/deviceId";
import { addToCart, getCart, updateCartItem, removeFromCart } from "../api/cart";

const ShoppingCart = () => {
  const [cart, setCart] = useState([]);
  const deviceId = getDeviceId();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const cartData = await getCart(deviceId);
        setCart(cartData);
      } catch (error) {
        console.error("Failed to fetch cart", error);
      }
    };

    fetchCart();
  }, [deviceId]);

  const handleAddToCart = async (productId, quantity) => {
    try {
      await addToCart(deviceId, productId, quantity);
      const updatedCart = await getCart(deviceId);
      setCart(updatedCart);
    } catch (error) {
      console.error("Failed to add to cart", error);
    }
  };

  const handleUpdateCartItem = async (productId, quantity) => {
    try {
      await updateCartItem(deviceId, productId, quantity);
      const updatedCart = await getCart(deviceId);
      setCart(updatedCart);
    } catch (error) {
      console.error("Failed to update cart item", error);
    }
  };

  const handleRemoveFromCart = async (productId) => {
    try {
      await removeFromCart(deviceId, productId);
      const updatedCart = await getCart(deviceId);
      setCart(updatedCart);
    } catch (error) {
      console.error("Failed to remove from cart", error);
    }
  };

  return (
    <div>
      <h1>Shopping Cart</h1>
      <ul>
        {cart.map((item) => (
          <li key={item.productId}>
            {item.productName} - Quantity: {item.quantity}
            <button onClick={() => handleUpdateCartItem(item.productId, item.quantity + 1)}>+</button>
            <button onClick={() => handleUpdateCartItem(item.productId, item.quantity - 1)}>-</button>
            <button onClick={() => handleRemoveFromCart(item.productId)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShoppingCart;