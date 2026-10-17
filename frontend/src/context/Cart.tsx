import React, { createContext, useState } from "react";

type ContainerProps = {
  children: React.ReactNode;
};
type CartContextType = {
  cartCount: number;
  setCartCount: React.Dispatch<React.SetStateAction<number>>;
};

export const CartContext = createContext<CartContextType>({
  cartCount: 0,
  setCartCount: () => {},
});

export const CartProvider = (props: ContainerProps) => {
  const [cartCount, setCartCount] = useState<number>(0);
  return (
    <CartContext.Provider value={{ cartCount, setCartCount }}>
      {props.children}
    </CartContext.Provider>
  );
};
