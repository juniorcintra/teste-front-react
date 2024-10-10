// stores/globalStore.ts
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type GlobalState = {
  isAuthenticated: boolean;
  isLoading: boolean;
  authenticateUser: () => void;
  logoutUser: () => void;
  setIsLoading: () => void;
  setIsNotLoading: () => void;
};

export const useGlobalStore = create<GlobalState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      setUser: () =>
        set({
          isAuthenticated: true,
        }),
      authenticateUser: () => set({ isAuthenticated: true }),
      logoutUser: () =>
        set({
          isAuthenticated: false,
        }),
      setIsLoading: () => set({ isLoading: true }),
      setIsNotLoading: () => set({ isLoading: false }),
    }),
    {
      name: "globalStore", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);

export default useGlobalStore;
