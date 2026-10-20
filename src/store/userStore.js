import { create } from "zustand";

export const useUserStore = create((set) => ({
  id: "",
  username: "",
  role: "",

  setUser: (id, username, role) => {
    set({ id, username, role });
  },

  setUserNull: () => {
    set({ id: "", username: "", role: "" });
  },
}));
