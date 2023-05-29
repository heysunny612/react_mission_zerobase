import { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext();

const CART_ITEMS = 'Cart_Items';
const fromLocalStorage = () => {
  const cartItems = localStorage.getItem(CART_ITEMS);
  return cartItems ? JSON.parse(cartItems) : [];
};
export const CartContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => fromLocalStorage());

  useEffect(() => {
    localStorage.setItem(CART_ITEMS, JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <CartContext.Provider value={{ cartItems, setCartItems }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => useContext(CartContext);
