"use client";

import { Inclusive_Sans } from "next/font/google";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./product.module.css";
import { Produto } from "/src/Models/Produto";

interface ProductCardProps {
  produto: Produto;
  onQuantidadeChange?: (novaQuantidade: number) => void;
}

const notoserif = Inclusive_Sans({ subsets: ["latin"], weight: "300" });

//componente que exibe as informações do produto e permite ajustar a quantidade
export default function ProductCard({
  produto,
  onQuantidadeChange,
}: ProductCardProps) {
  const [quantidade, setQuantidade] = useState(0);

  const aumentar = () => {
    const novaQtd = quantidade + 1;
    setQuantidade(novaQtd);
    onQuantidadeChange?.(novaQtd);
  };

  const diminuir = () => {
    if (quantidade <= 0) return;
    const novaQtd = quantidade - 1;
    setQuantidade(novaQtd);
    onQuantidadeChange?.(novaQtd);
  };

  useEffect(() => {
    setQuantidade(produto.quantidade ?? 0);
  }, [produto.quantidade]);

  return (
    <div className={styles.cardapioItem}>
      <div className={styles.cardapioFoto}>
        <Image
          src="/xburguer.png"
          alt={produto.name}
          fill
          style={{ objectFit: "cover" }}
        />
      </div>

      <div className={styles.cardapioRight}>
        <span className={`${notoserif.className} ${styles.cardapioNome}`}>
          {produto.name}
        </span>

        <span className={`${notoserif.className} ${styles.cardapioPreco}`}>
          {produto.preco.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </span>

        <div className={styles.cardapioDescricao}>{produto.descricao}</div>
        <div className={styles.footer}>
          <div className={styles.quantidadeControls}>
            <button onClick={diminuir} className={styles.qtdButton}>
              -
            </button>
            <span className={styles.quantidadeDisplay}>{quantidade}</span>
            <button onClick={aumentar} className={styles.qtdButton}>
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
