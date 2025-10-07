import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import produtosData from "/src/data/Produtos.json";

export type Produto = {
  id: number;
  name: string;
  preco: number;
  categoria: string;
  descricao: string;
  observacao?: string;
  quantidade: number;
};

type CarrinhoState = {
  produtosNoCarrinho: Produto[];
  produtosListagem: Produto[];
  updateQuantidade: (produto: Produto, novaQuantidade: number) => void;
  clearCarrinho: () => void;
  hasHydrated: boolean;
  setHasHydrated: (v: boolean) => void;
};

export const useCarrinho = create<CarrinhoState>()(
  persist(
    (set) => ({
      produtosListagem: produtosData.Produtos.map((p) => ({
        ...p,
        quantidade: 0,
      })),
      produtosNoCarrinho: [],
      hasHydrated: false,
      setHasHydrated: (v) => set({ hasHydrated: v }),

      updateQuantidade: (produto, novaQuantidade) =>
        set((state) => {
          const existente = state.produtosNoCarrinho.find(
            (p) => p.id === produto.id
          );

          let newCarrinho = state.produtosNoCarrinho;
          const newListagem = state.produtosListagem.map((p) =>
            p.id === produto.id ? { ...p, quantidade: novaQuantidade } : p
          );

          if (existente && novaQuantidade <= 0) {
            newCarrinho = state.produtosNoCarrinho.filter(
              (p) => p.id !== produto.id
            );
          } else if (existente) {
            newCarrinho = state.produtosNoCarrinho.map((p) =>
              p.id === produto.id ? { ...p, quantidade: novaQuantidade } : p
            );
          } else {
            newCarrinho = [
              ...state.produtosNoCarrinho,
              { ...produto, quantidade: novaQuantidade },
            ];
          }

          return {
            produtosNoCarrinho: newCarrinho,
            produtosListagem: newListagem,
          };
        }),

      clearCarrinho: () =>
        set({
          produtosNoCarrinho: [],
          produtosListagem: produtosData.Produtos.map((p) => ({
            ...p,
            quantidade: 0,
          })),
        }),
    }),
    {
      name: "carrinho-storage",
      storage: createJSONStorage(() => localStorage), // ✅ aqui é o correto
    }
  )
);
