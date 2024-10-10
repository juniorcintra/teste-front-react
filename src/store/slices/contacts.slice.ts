import { Contact } from "@/types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type ContactsState = {
  contacts: Contact[];
  contact?: Contact;
  setContacts: (contacts: Contact[]) => void;
  setContactSelected: (contact: Contact | undefined) => void;
};

export const useContactStore = create<ContactsState>()(
  persist(
    (set) => ({
      contacts: [],
      contact: undefined,
      setContacts: (contacts) => set({ contacts: contacts }),
      setContactSelected: (contact) => set({ contact: contact }),
    }),
    {
      name: "contacts",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useContactStore;
