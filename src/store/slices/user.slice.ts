import { User } from "@/types";
import { usersConst } from "@/utils/constants";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type UsersState = {
  users: User[];
  user?: User;
  setUsers: (groups: User[]) => void;
  setUserSelected: (group: User | undefined) => void;
};

export const useUserStore = create<UsersState>()(
  persist(
    (set) => ({
      users: usersConst,
      user: undefined,
      setUsers: (users) =>
        set({
          users: users,
        }),
      setUserSelected: (user) => set({ user: user }),
    }),
    {
      name: "users",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useUserStore;
