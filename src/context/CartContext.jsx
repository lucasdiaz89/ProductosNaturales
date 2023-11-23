import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { db } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cartStorage, updateCartStorage] = useLocalStorage("cart", []);
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    updateCartStorage([...cartStorage, item]);
  };

  const removeFromCart = (item) => {
    const updatedCart = cartStorage.filter(
      (cartItem) => cartItem.productId !== item.productId
    );
    updateCartStorage(updatedCart);
    if (cartItems.length > 0) {
      cartItems = cartItems.filter(itemCart => itemCart.id !== item.productId);
  }
  };

  const updateQuantity = (updatedItem) => {
    const updatedCart = cartStorage.map((item) =>
      item.productId === updatedItem.productId ? updatedItem : item
    );
    updateCartStorage(updatedCart);
    if (cartItems.length > 0) {
      cartItems.forEach((item) => {
        if (item.id === updatedItem.productId) {
          item.productCount = updatedItem.productCount;
        }
      });
    }
  };

  const cartActions = {
    addToCart,
    removeFromCart,
    updateQuantity,
  };

  const itemsInCart =
    cartStorage.length > 0
      ? cartStorage.reduce((prev, act) => prev + act.productCount, 0)
      : 0;

  const isInCart = (idProduct) =>
    cartStorage.find((item) => (item.productId === idProduct ? true : false));

  const itemInACart = (idProduct) =>
    cartStorage.find((item) => (item.productId === idProduct ? item : null));

  const fetchCartItems = async (ItemsSearch) => {
    try {
      const promises = ItemsSearch.map(async (item) => {
        const itemRef = doc(db, "Productos", item.productId);

        const res = await getDoc(itemRef);

        if (res.exists()) {
          return { id: res.id, productCount: item.productCount, ...res.data() };
        } else {
          throw new Error();
        }
      });
      const itemsData = await Promise.all(promises);
      setCartItems(itemsData);
    } catch (error) {
      throw new Error(error);
    }
  };

  


  const emptyCart = () => {
    updateCartStorage([]);
    setCartItems([]);
  };
  const totalPrice =
    cartItems.length > 0
      ? cartItems.reduce((prev, act) => prev + act.productCount * act.precio, 0)
      : 0;

  return (
    <CartContext.Provider
      value={{
        cartStorage,
        cartItems,
        itemsInCart,
        isInCart,
        itemInACart,
        fetchCartItems,
        emptyCart,
        totalPrice,
        ...cartActions
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
