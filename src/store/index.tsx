/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, ReactNode } from "react";
import useGlobalStore, { GlobalState } from "./slices/global.slice";

export const GlobalStoreContext = createContext<GlobalState | null>(null);

interface GlobalStoreProviderProps {
  children: ReactNode;
}

export const GlobalStoreProvider = ({ children }: GlobalStoreProviderProps) => {
  const store = useGlobalStore();
  return (
    <GlobalStoreContext.Provider value={store}>
      {children}
    </GlobalStoreContext.Provider>
  );
};

export const useGlobalStoreContext = () => {
  const context = useContext(GlobalStoreContext);
  if (!context) {
    throw new Error(
      "useGlobalStoreContext must be used within a GlobalStoreProvider"
    );
  }
  return context;
};
