import React, { createContext, useState } from "react";

type ContainerProps = {
  children: React.ReactNode;
};
type LoadingContexttType = {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export const LoadingContext = createContext<LoadingContexttType>({
  loading: true,
  setLoading: () => {},
});

export const LoadingProvider = (props: ContainerProps) => {
  const [loading, setLoading] = useState<boolean>(true);
  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {props.children}
    </LoadingContext.Provider>
  );
};
