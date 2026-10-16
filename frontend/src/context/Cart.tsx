import React, { createContext, useState } from "react";

type ContainerProps = {
  children: React.ReactNode;
};
type CartContextType = {
  cartCount: number;
  setCartCount: React.Dispatch<React.SetStateAction<number>>;
};

export const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = (props: ContainerProps) => {
  const [cartCount, setCartCount] = useState<number>(0);
  return (
    <CartContext value={{ cartCount, setCartCount }}>
      {props.children}
    </CartContext>
  );
};
