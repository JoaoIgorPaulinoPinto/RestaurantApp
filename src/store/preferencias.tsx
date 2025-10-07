import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type PreferenciasState = {
  notificar: boolean;
  temaDark: boolean;

  setTema: (tema: boolean) => void;
  setNotificar: (ligado: boolean) => void;
};
export const usePreferencias = create<PreferenciasState>()(
  persist(
    (set) => ({
      temaDark: true,
      notificar: false,
      setNotificar: (notificar) => set({ notificar }),
      setTema: (temaDark) => set({ temaDark }),
    }),
    {
      name: "preferencias-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
