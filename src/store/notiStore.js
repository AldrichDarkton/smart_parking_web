import { create } from "zustand";

export const useNotiStore = create((set) => ({
  notiType: "",
  notiMessage: "",
  notiId: 0,

  setNoti: (notiType, notiMessage) =>
    set((state) => ({
      notiType,
      notiMessage,
      notiId: state.notiId + 1,
    })),

  setNotiNull: () =>
    set({
      notiType: "",
      notiMessage: "",
    }),
}));
