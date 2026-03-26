import { createContext, useState, useContext } from "react";

const CartContext = createContext(); 
export const useCart = () => useContext(CartContext); 

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existingProduct = prev.find((item) => item._id === product._id);
      if (existingProduct) {
        return prev.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  const removeProductCart = (_id) => {
    setCartItems((prev) => prev.filter((item) => item._id !== _id));
  };

  const sumProduct = (_id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === _id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const restProduct = (_id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === _id
          ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
          : item
      )
    );
  };

  const total = cartItems.reduce(
    (totalProduct, product) =>
      totalProduct + Number(product.price || 0) * product.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeProductCart,
        sumProduct,
        restProduct,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};