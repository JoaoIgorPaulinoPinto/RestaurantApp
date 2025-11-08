import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { Produto } from "../Models/Produto";
import api from "../Services/API/api";

type CarrinhoState = {
  produtosNoCarrinho: Produto[];
  produtosListagem: Produto[];
  hasHydrated: boolean;

  setHasHydrated: (v: boolean) => void;
  carregarProdutos: () => Promise<void>;
  updateQuantidade: (produto: Produto, novaQuantidade: number) => void;
  limparLista: () => void;
};

export const useCarrinho = create<CarrinhoState>()(
  persist(
    (set, get) => ({
      produtosNoCarrinho: [],
      produtosListagem: [],
      hasHydrated: false,

      setHasHydrated: (v) => set({ hasHydrated: v }),

      carregarProdutos: async () => {
        try {
          const produtosFetch = await api.get<Produto[]>("/produtos");
          const { produtosNoCarrinho } = get();

          // Sincroniza quantidades com o carrinho persistido
          const produtosComQuantidade = produtosFetch.data.map((p) => {
            const noCarrinho = produtosNoCarrinho.find((c) => c.id === p.id);
            return { ...p, quantidade: noCarrinho?.quantidade || 0 };
          });

          set({ produtosListagem: produtosComQuantidade });
        } catch (error) {
          console.error("❌ Erro ao carregar produtos:", error);
        }
      },

      updateQuantidade: (produto, novaQuantidade) =>
        set((state) => {
          const existente = state.produtosNoCarrinho.find(
            (p) => p.id === produto.id
          );

          let novoCarrinho = [...state.produtosNoCarrinho];

          if (existente) {
            if (novaQuantidade <= 0) {
              novoCarrinho = novoCarrinho.filter((p) => p.id !== produto.id);
            } else {
              novoCarrinho = novoCarrinho.map((p) =>
                p.id === produto.id ? { ...p, quantidade: novaQuantidade } : p
              );
            }
          } else if (novaQuantidade > 0) {
            novoCarrinho.push({ ...produto, quantidade: novaQuantidade });
          }

          const novaListagem = state.produtosListagem.map((p) =>
            p.id === produto.id ? { ...p, quantidade: novaQuantidade } : p
          );

          return {
            produtosNoCarrinho: novoCarrinho,
            produtosListagem: novaListagem,
          };
        }),

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
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
