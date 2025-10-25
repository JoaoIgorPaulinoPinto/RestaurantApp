import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { Produto } from "../Models/Produto";
import { getProdutos } from "../Services/API/server";

type CarrinhoState = {
  limparLista: () => void;
  carregarProdutos: () => void;
  produtosNoCarrinho: Produto[];
  produtosListagem: Produto[];
  updateQuantidade: (produto: Produto, novaQuantidade: number) => void;
  hasHydrated: boolean;
  setHasHydrated: (v: boolean) => void;
};

export const useCarrinho = create<CarrinhoState>()(
  persist(
    (set, get) => ({
      produtosListagem: [],
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
      carregarProdutos: async () => {
        try {
          const produtosFetch = await getProdutos();
          const { produtosNoCarrinho } = get(); // ✅ agora você consegue acessar

          produtosFetch.forEach((p) => {
            const noCarrinho = produtosNoCarrinho.find(
              (item: Produto) => item.id === p.id
            );
            if (noCarrinho) {
              p.quantidade = noCarrinho.quantidade; // sincroniza quantidade
            } else {
            }
          });

          set({ produtosListagem: produtosFetch }); // atualiza lista de produtos
        } catch (error) {
          console.error("Erro ao carregar produtos:", error);
        }
      },
      limparLista: () =>
        set((state) => ({
          produtosNoCarrinho: [],
          produtosListagem: state.produtosListagem.map((p) => ({
            ...p,
            quantidade: 0,
          })),
        })),
    }),
    {
      name: "carrinho-storage",
      storage: createJSONStorage(() => localStorage), // ✅ aqui é o correto
    }
  )
);
