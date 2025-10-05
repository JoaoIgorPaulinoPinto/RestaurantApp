"use client";

import { Check, Pencil } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import styles from "./finish-order-table.module.css";
import { Produto } from "/src/Models/Produto";

interface TableProps {
  produtos: Produto[];
  setProdutos: React.Dispatch<React.SetStateAction<Produto[]>>;
}

export default function FinishingOrderTable({
  produtos,
  setProdutos,
}: TableProps) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const prevEditingIndex = useRef<number | null>(null);

  const aumentar = (itemIndex: number) => {
    setProdutos((prev) =>
      prev.map((p, idx) =>
        idx === itemIndex ? { ...p, quantidade: p.quantidade + 1 } : p
      )
    );
  };

  const diminuir = (itemIndex: number) => {
    setProdutos((prev) =>
      prev.map((p, idx) =>
        idx === itemIndex
          ? { ...p, quantidade: Math.max(p.quantidade - 1, 0) }
          : p
      )
    );
  };

  useEffect(() => {
    const saveChanges = () => {
      const carrinhoComObservacao = produtos.map((p) => ({
        ...p,
        observacao: p.observacao ?? "",
      }));
      localStorage.setItem(
        "perfilUsuario",
        JSON.stringify(carrinhoComObservacao)
      );
    };

    if (prevEditingIndex.current !== null && editingIndex === null) {
      saveChanges();
    }
    prevEditingIndex.current = editingIndex;
  }, [editingIndex, produtos]);

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
          {produtos.map((p, i) => (
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
                      onChange={(e) => {
                        setProdutos((prev) =>
                          prev.map((prod, idx) =>
                            idx === i
                              ? { ...prod, observacao: e.target.value }
                              : prod
                          )
                        );
                      }}
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
