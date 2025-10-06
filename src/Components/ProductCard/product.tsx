"use client";

import { Inclusive_Sans } from "next/font/google";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./product.module.css";
import { Produto, useCarrinho } from "/src/store/carrinho";

interface ProductCardProps {
  produto: Produto;
}

const notoserif = Inclusive_Sans({ subsets: ["latin"], weight: "300" });

//componente que exibe as informações do produto e permite ajustar a quantidade
export default function ProductCard({ produto }: ProductCardProps) {
  const [quantidade, setQuantidade] = useState(0);

  const { updateQuantidade: updateQuantidade } = useCarrinho();

  const aumentar = () => {
    setQuantidade(quantidade + 1);
  };

  const diminuir = () => {
    setQuantidade(quantidade - 1);
  };

  useEffect(() => {
    setQuantidade(produto.quantidade ?? 0);
  }, [produto.quantidade]);

  useEffect(() => {
    updateQuantidade(produto, quantidade);
  }, [quantidade]);
  return (
    <div className={styles.cardapioItem}>
      {/* conteúdo à esquerda */}
      <div className={styles.cardapioRight}>
        <div className={styles.cardapioFoto}>
          <Image
            src="/xburguer.png"
            alt={produto.name}
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className={styles.content}>
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
        </div>
      </div>

      {/* controles na direita */}
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
  );
}
