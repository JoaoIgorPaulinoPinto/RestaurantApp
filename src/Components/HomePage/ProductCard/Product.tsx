'use client';

import { Noto_Serif } from 'next/font/google';
import { useEffect, useState } from 'react';
import styles from './Product.module.css';
import Image from 'next/image';

export interface Produto {
    id: number;
    name: string;
    preco: number;
    categoria: string;
    descricao: string;
    quantidade: number; // quantidade inicial
    observacao?: string;
}

interface ProductCardProps {
    produto: Produto;
    onQuantidadeChange?: (novaQuantidade: number) => void;
}

const notoserif = Noto_Serif({ subsets: ['latin'], weight: '400' });

export default function ProductCard({ produto, onQuantidadeChange }: ProductCardProps) {
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
                    style={{ objectFit: 'cover' }}
                />
            </div>

            <div className={styles.cardapioRight}>
                <span className={`${notoserif.className} ${styles.cardapioPreco}`}>
                    R$ {produto.preco.toFixed(2)}
                </span>

                <div className={styles.cardapioDescricao}>
                    {produto.descricao}
                </div>
                <div className={styles.footer}>
                    <div className={styles.quantidadeControls}>
                        <button onClick={diminuir} className={styles.qtdButton}>-</button>
                        <span className={styles.quantidadeDisplay}>{quantidade}</span>
                        <button onClick={aumentar} className={styles.qtdButton}>+</button>
                    </div>
                </div>

            </div>
        </div>
    );
}
