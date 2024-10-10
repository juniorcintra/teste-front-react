import { User } from "@/types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type UsersState = {
  users: User[];
  user?: User;
  setUsers: (users: User[]) => void;
  setUserSelected: (user: User | undefined) => void;
};

export const useUserStore = create<UsersState>()(
  persist(
    (set) => ({
      users: [],
      user: undefined,
      setUsers: (users) => set({ users: users }),
      setUserSelected: (user) => set({ user: user }),
    }),
    {
      name: "users",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useUserStore;
