
import { useState } from "react";

export function useLocalStorage(key, initialValue) {
  const [cartStorage, setCartStorage] = useState(() => {
    try {
      const storedValue = window.localStorage.getItem(key);
      return storedValue !== null ? JSON.parse(storedValue) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const updateCartStorage = (newValue) => {
    try {
      setCartStorage(newValue);
      window.localStorage.setItem(key, JSON.stringify(newValue));
    } catch (err) {
      console.log("Error LocalStorage:",err);
    }
  };

  return [cartStorage, updateCartStorage];
}
