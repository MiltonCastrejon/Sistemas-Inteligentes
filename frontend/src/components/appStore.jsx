import { create } from "zustand";
import { persist } from "zustand/middleware";

let appStore = (set) => ({
  dopen: true,
  updateOpen: (dopen) => set((state) => ({ dopen: dopen })),

  username: "",
  setUserName: (username) => set((state) => ({ username: username })),

});

appStore = persist(appStore, { name: "appStore" });
export const useAppStore = create(appStore);
/*import { create } from "zustand";
import { persist } from "zustand/middleware";

let appStore = (set) => ({
  dopen: true,
  updateOpen: (dopen) => set((state) => ({ dopen: dopen })),
});

appStore = persist(appStore, { name: "appStore" });
export const useAppStore = create(appStore); */
