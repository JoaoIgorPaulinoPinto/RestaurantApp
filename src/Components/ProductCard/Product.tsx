'use client';

import { Noto_Serif } from 'next/font/google';
import { useState } from 'react';
import styles from '/src/Components/ProductCard/Product.module.css';
import Image from 'next/image';

export interface Produto {
    id: number,
    name: string;
    preco: number;
    categoria: string;
    descricao: string;
    quantidade: number; // agora vem da página
}

interface ProductCardProps {
    produto: Produto;
    onQuantidadeChange?: (novaQuantidade: number) => void; // callback para a página

}
const notoserif = Noto_Serif({ subsets: ['latin'], weight: '400' });

export default function ProductCard({ produto, onQuantidadeChange }: ProductCardProps) {

    // inicializa o estado com a quantidade que vem da prop
    const [quantidade, setQuantidade] = useState(produto.quantidade);
    const aumentar = () => {
        const novaQtd = quantidade + 1;
        setQuantidade(novaQtd);
        onQuantidadeChange?.(novaQtd); // avisa a página
    };

    const diminuir = () => {
        if (quantidade <= 0) return;
        const novaQtd = quantidade - 1;
        setQuantidade(novaQtd);
        onQuantidadeChange?.(novaQtd); // avisa a página
    };

    return (
        <div className={styles.cardapioItem}>
            <div className={styles.cardapioFoto}>
                <Image
                    src="/xburguer.png"
                    alt="X-Burger"
                    fill
                    style={{ objectFit: 'contain' }}
                />
            </div>
            <div className={styles.cardapioTextContent}>
                <div className={styles.cardapioInfoTop}>
                    <span className={`${notoserif.className} ${styles.cardapioNome}`}>
                        {produto.name}
                    </span>{' '}
                    <span className={styles.cardapioPreco}>R$ {produto.preco}</span>
                </div>
                <div className={styles.cardapioInfoBottom}>
                    <div className={styles.cardapioDescricao}>{produto.descricao}</div>
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
