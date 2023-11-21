import React, { createContext, useContext, useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  
  const [cart, updateCart] = useLocalStorage("cart", []);
  
  const addToCart = (item) => {
    updateCart([...cart, item]);
  };

  const removeFromCart = (item) => {
    const updatedCart = cart.filter((cartItem) => cartItem.productId !== item.productId);
    updateCart(updatedCart);
  };

  const updateQuantity = (updatedItem) => {
    const updatedCart = cart.map((item) =>
      item.productId === updatedItem.productId ? updatedItem : item
    );
    updateCart(updatedCart);
  };

  const cartActions = {
    addToCart,
    removeFromCart,
    updateQuantity,
  };

  return (
    <CartContext.Provider value={{ cart, ...cartActions }}>
      {children}
    </CartContext.Provider>
  );
}
