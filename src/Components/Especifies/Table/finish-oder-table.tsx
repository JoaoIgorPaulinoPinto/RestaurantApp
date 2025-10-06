"use client";

import { Check, Pencil } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import styles from "./finish-order-table.module.css";
import { useCarrinho } from "/src/store/carrinho"; // ✅ Zustand

export default function FinishingOrderTable() {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const prevEditingIndex = useRef<number | null>(null);

  // ✅ Zustand
  const { produtosNoCarrinho: produtosNoCarrinho, updateQuantidade } =
    useCarrinho();

  const aumentar = (itemIndex: number) => {
    const p = produtosNoCarrinho[itemIndex];
    updateQuantidade(p, p.quantidade + 1);
  };

  const diminuir = (itemIndex: number) => {
    const p = produtosNoCarrinho[itemIndex];
    updateQuantidade(p, Math.max(p.quantidade - 1, 0));
  };

  useEffect(() => {
    const saveChanges = () => {
      const carrinhoComObservacao = produtosNoCarrinho.map((p) => ({
        ...p,
        observacao: p.observacao ?? "",
      }));
    };

    if (prevEditingIndex.current !== null && editingIndex === null) {
      saveChanges();
    }
    prevEditingIndex.current = editingIndex;
  }, [editingIndex, produtosNoCarrinho]);

  const alterarObservacao = (index: number, valor: string) => {
    const p = produtosNoCarrinho[index];
    updateQuantidade(p, p.quantidade); // mantém quantidade
    // atualizar apenas a observação
    useCarrinho.setState((state) => ({
      produtosNoCarrinho: state.produtosNoCarrinho.map((prod, idx) =>
        idx === index ? { ...prod, observacao: valor } : prod
      ),
    }));
  };

  return (
    <div className={styles.body}>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            <th style={{ width: "5%" }}></th>
            <th>Produto</th>
            <th>Quantidade</th>
            <th>Preço</th>
          </tr>
        </thead>
        <tbody>
          {produtosNoCarrinho.map((p, i) => (
            <React.Fragment key={p.id ?? i}>
              {/* Linha principal */}
              <tr>
                <td>
                  <button
                    onClick={() =>
                      setEditingIndex(editingIndex === i ? null : i)
                    }
                    className={styles.editButton}
                  >
                    {editingIndex === i ? (
                      <Check size={16} />
                    ) : (
                      <Pencil size={16} />
                    )}
                  </button>
                </td>
                <td data-label="Produto">{p.name}</td>
                <td data-label="Quantidade">
                  {editingIndex === i ? (
                    <div className={styles.quantidadeControls}>
                      <button
                        onClick={() => diminuir(i)}
                        className={styles.qtdButton}
                      >
                        -
                      </button>
                      <span className={styles.quantidadeDisplay}>
                        {p.quantidade}
                      </span>
                      <button
                        onClick={() => aumentar(i)}
                        className={styles.qtdButton}
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <span>{p.quantidade}x</span>
                  )}
                </td>
                <td data-label="Preço">
                  {p.preco.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </td>
              </tr>

              {/* Linha da observação */}
              <tr className={styles.obsRow}>
                <td colSpan={4}>
                  {editingIndex === i ? (
                    <input
                      type="text"
                      placeholder="Adicionar observação"
                      value={p.observacao ?? ""}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          setEditingIndex(null);
                        }
                      }}
                      onChange={(e) => alterarObservacao(i, e.target.value)}
                      className={styles.obsInput}
                    />
                  ) : (
                    <span className={styles.obsText}>
                      {p.observacao || <em>Sem observação</em>}
                    </span>
                  )}
                </td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
