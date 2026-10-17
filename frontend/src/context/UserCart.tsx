import React, { createContext, useState } from "react";

type ContainerProps = {
  children: React.ReactNode;
};
type UserCartContextType = {
  userCart: any[];
  setUserCart: React.Dispatch<React.SetStateAction<any[]>>;
};

export const UserCartContext = createContext<UserCartContextType>({
  userCart: [],
  setUserCart: () => {},
});

export const UserCartProvider = (props: ContainerProps) => {
  const [userCart, setUserCart] = useState<any[]>([]);
  return (
    <UserCartContext.Provider value={{ userCart, setUserCart }}>
      {props.children}
    </UserCartContext.Provider>
  );
};
