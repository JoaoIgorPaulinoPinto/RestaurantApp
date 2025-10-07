import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { Endereco } from "../Models/Endereco";

type PerfilState = {
  nome: string;
  numero: string;
  endereco: Endereco;
  enderecos: Endereco[];
  enderecoSelecionado: Endereco | null;

  setNome: (nome: string) => void;
  setNumero: (numero: string) => void;
  setEnderecos: (enderecos: Endereco[]) => void;
  setEnderecoSelecionado: (endereco: Endereco | null) => void;
};

export const usePerfil = create<PerfilState>()(
  persist(
    (set) => ({
      nome: "",
      numero: "",
      endereco: {
        rua: "",
        numero: "",
        bairro: "",
        cidade: "",
        estado: "",
      },
      enderecos: [],
      enderecoSelecionado: null,

      setNome: (nome) => set({ nome }),
      setNumero: (numero) => set({ numero }),
      setEnderecos: (enderecos) => set({ enderecos }),
      setEnderecoSelecionado: (endereco) =>
        set({ enderecoSelecionado: endereco }),
    }),
    {
      name: "perfil-storage", // chave usada no localStorage
      storage: createJSONStorage(() => localStorage),
    }
  )
);
