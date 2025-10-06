import { create } from "zustand";
import { persist } from "zustand/middleware";

// Tipo produto
export type Produto = {
  id: number;
  name: string;
  preco: number;
  categoria: string;
  descricao: string;
  observacao?: string;
  quantidade: number;
};

// Estado do carrinho
type CarrinhoState = {
  produtosNoCarrinho: Produto[];
  updateQuantidade: (produto: Produto, novaQuantidade: number) => void;
  clearCarrinho: () => void;
};

export const useCarrinho = create<CarrinhoState>()(
  persist(
    (set) => ({
      produtosNoCarrinho: [],

      updateQuantidade: (produto: Produto, novaQuantidade: number) =>
        set((state) => {
          const existente = state.produtosNoCarrinho.find(
            (p) => p.id === produto.id
          );

          // ✅ Se já existe e a nova quantidade é 0 ou menor → remover
          if (existente && novaQuantidade <= 0) {
            return {
              produtosNoCarrinho: state.produtosNoCarrinho.filter(
                (p) => p.id !== produto.id
              ),
            };
          }

          // ✅ Se não existe → adicionar
          return {
            produtosNoCarrinho: [
              ...state.produtosNoCarrinho,
              { ...produto, quantidade: novaQuantidade },
            ],
          };
        }),

      clearCarrinho: () => set({ produtosNoCarrinho: [] }),
    }),
    {
      name: "carrinho-storage", // salva no localStorage
    }
  )
);
