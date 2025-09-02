'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './Pedido.module.css';
import { Produto } from '/src/Components/ProductCard/Product';
export default function PedidoPage() {
    const router = useRouter();
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [total, setTotal] = useState(0);

    // Buscar carrinho da API
    const loadCarrinho = async () => {
        try {
            const res = await fetch('/src/api/carrinho');
            if (!res.ok) throw new Error('Erro ao buscar carrinho');
            const data = await res.json();
            setProdutos(data.Produtos || []);
        } catch (err) {
            console.error(err);
        }
    };

    // Calcular total sempre que produtos mudarem
    useEffect(() => {
        loadCarrinho();
    }, []);

    useEffect(() => {
        const totalCalc = produtos.reduce(
            (acc, p) => acc + (p.quantidade || 0) * p.preco,
            0
        );
        setTotal(totalCalc);
    }, [produtos]);

    // Finalizar pedido (apenas console.log)
    const handleFinalizar = () => {
        console.log('Pedido finalizado!', produtos);
        alert('Pedido finalizado! Veja o console.');
    };

    return (
        <div className={styles.content}>
            <div className={styles.header}>
                <span>Finalização do Pedido</span>
            </div>

            <div className={styles.body}>
                <table className={styles.table}>
                    <thead>
                        <tr className={styles.tableh}>
                            <th className={styles.tableh_prodName}>Produto</th>
                            <th className={styles.tableh_prodQuant}>Quantidade</th>
                            <th className={styles.tableh_prodPrice}>Preço</th>
                            <th className={styles.tableh_prodObs}>Obs</th>
                        </tr>
                    </thead>

                    <tbody>
                        {produtos.map((p, i) => (
                            <tr key={i}>
                                <td>{p.name}</td>
                                <td>{p.quantidade}</td>
                                <td>R${(p.preco * (p.quantidade || 0)).toFixed(2)}</td>
                                <td>Sem observações por enquanto</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className={styles.footer}>
                <span>Frete: R$4,00</span>
                <span>Total: R${(total + 4).toFixed(2)}</span>
                <button className={styles.btn_finalizar} onClick={handleFinalizar}>
                    Finalizar
                </button>
                <button className={styles.btn_cancelar} onClick={loadCarrinho}>
                    Cancelar
                </button>
            </div>
        </div>
    );
}
