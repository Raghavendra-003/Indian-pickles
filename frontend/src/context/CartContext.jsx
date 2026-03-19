import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

/* PROVIDER */

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
  try {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  } catch {
    return [];
  }
});

  // useEffect(() => {
  //   try{
  //      const savedCart = localStorage.getItem("cart");

  //   if (savedCart) {
  //     setCartItems(JSON.parse(savedCart));
  //   }
  //   } catch (errors){
  //     console.error("Error parsing cart:", error);
  //   setCartItems([]);
  //   }
  //   },[]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  /* Add To Cart */

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existingItem = prev.find(
        (item) =>
          item.id === product.id &&
          item.weight === product.weight
      );

      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id &&
          item.weight === product.weight
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const increaseQty = (id, weight) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.weight === weight
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQty = (id, weight) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id && item.weight === weight
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getGrandTotal = () => {
    return cartItems.reduce(
      (total, item) =>
        total + item.price * item.quantity,
      0
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        increaseQty,
        decreaseQty,
        clearCart,
        getGrandTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};