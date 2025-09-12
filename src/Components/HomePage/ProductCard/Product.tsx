'use client';

import { Noto_Serif } from 'next/font/google';
import { useEffect, useState } from 'react';
import styles from './Product.module.css';
import Image from 'next/image';

export interface Produto {
    id: number,
    name: string;
    preco: number;
    categoria: string;
    descricao: string;
    quantidade: number; // agora vem da página
    observacao?: string;
}

interface ProductCardProps {
    produto: Produto;
    onQuantidadeChange?: (novaQuantidade: number) => void; // callback para a página

}
const notoserif = Noto_Serif({ subsets: ['latin'], weight: '400' });

export default function ProductCard({ produto, onQuantidadeChange }: ProductCardProps) {

    // inicializa o estado com a quantidade que vem da prop
    const [quantidade, setQuantidade] = useState(0);
    const aumentar = () => {
        onQuantidadeChange?.(produto.quantidade + 1);
    };

    const diminuir = () => {
        if (produto.quantidade <= 0) return;
        onQuantidadeChange?.(produto.quantidade - 1);
    };
    useEffect(() => {
        setQuantidade(produto.quantidade ?? 0);
    }, [produto.quantidade]);

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
