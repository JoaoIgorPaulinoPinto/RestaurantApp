"use client";
import { Inclusive_Sans } from "next/font/google";
import Image from "next/image";
import styles from "./product.module.css";
import { Produto, useCarrinho } from "/src/store/carrinho";

interface ProductCardProps {
  produto: Produto;
}

const notoserif = Inclusive_Sans({ subsets: ["latin"], weight: "300" });

export default function ProductCard({ produto }: ProductCardProps) {
  const { updateQuantidade } = useCarrinho();

  const aumentar = () => updateQuantidade(produto, produto.quantidade + 1);
  const diminuir = () =>
    updateQuantidade(
      produto,
      produto.quantidade > 0 ? produto.quantidade - 1 : 0
    );

  return (
    <div className={styles.cardapioItem}>
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

      <div className={styles.footer}>
        <div className={styles.quantidadeControls}>
          <button onClick={diminuir} className={styles.qtdButton}>
            -
          </button>
          <span className={styles.quantidadeDisplay}>{produto.quantidade}</span>
          <button onClick={aumentar} className={styles.qtdButton}>
            +
          </button>
        </div>
      </div>
    </div>
  );
}
