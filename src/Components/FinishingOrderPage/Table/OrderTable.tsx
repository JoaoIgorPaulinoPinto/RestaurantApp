import { useEffect, useRef, useState } from 'react';
import ProductCard, { Produto } from '../../HomePage/ProductCard/Product';
import styles from './OrderTable.module.css'
import { Check, Edit, Pencil, Save } from 'lucide-react';

import LocalStorageManager from '/src/Services/LocalStorageManager'
interface TableProps {
    produtos: Produto[];
    setProdutos: React.Dispatch<React.SetStateAction<Produto[]>>;
}

export default function FinishingOrderTable({ produtos, setProdutos }: TableProps) {
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const prevEditingIndex = useRef<number | null>(null);

    const aumentar = (itemIndex: number) => {
        setProdutos(prev =>
            prev.map((p, idx) =>
                idx === itemIndex ? { ...p, quantidade: p.quantidade + 1 } : p
            )
        );
    };

    const diminuir = (itemIndex: number) => {
        setProdutos(prev =>
            prev.map((p, idx) =>
                idx === itemIndex
                    ? { ...p, quantidade: Math.max(p.quantidade - 1, 0) }
                    : p
            )
        );
    };

    const saveChanges = () => {
        const carrinhoComObservacao = produtos.map(p => ({
            ...p,
            observacao: p.observacao ?? "" // garante que não seja undefined
        }));
        LocalStorageManager.SaveData("carrinho", carrinhoComObservacao);
    };

    useEffect(() => {
        // se editingIndex mudou de um número para null, salva alterações
        if (prevEditingIndex.current !== null && editingIndex === null) {
            saveChanges();
        }
        prevEditingIndex.current = editingIndex;
    }, [editingIndex, produtos]);

    return (
        <div className={styles.body}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Produto</th>
                        <th>Quantidade</th>
                        <th>Preço</th>
                        <th>Observação</th>
                        <th>Editar</th>

                    </tr>
                </thead>
                <tbody>
                    {produtos.map((p, i) => (
                        <tr key={p.id ?? i}>
                            <td data-label="Produto">{p.name}</td>

                            <td data-label="Quantidade">
                                {editingIndex == null ? (
                                    // Apenas mostra quantidade quando está editando outra linha
                                    <span>{p.quantidade}x</span>
                                ) : (
                                    // Controles de aumentar/diminuir
                                    <div className={styles.quantidadeControls}>
                                        <button onClick={() => diminuir(i)} className={styles.qtdButton}>-</button>
                                        <span className={styles.quantidadeDisplay}>{p.quantidade}</span>
                                        <button onClick={() => aumentar(i)} className={styles.qtdButton}>+</button>
                                    </div>
                                )}
                            </td>


                            <td data-label="Preço">
                                {p.preco.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                            </td>
                            {editingIndex === i ? (
                                <td className="td_obs" data-label="Observação">
                                    <input
                                        type="text"
                                        placeholder="Adicionar observação"
                                        value={p.observacao || ""}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                e.preventDefault();            // evita quebra de linha
                                                setEditingIndex(null);         // “salvar” e sair do modo edição
                                            }
                                        }}
                                        onChange={(e) => {
                                            setProdutos(prev =>
                                                prev.map((prod, idx) =>
                                                    idx === i ? { ...prod, observacao: e.target.value } : prod
                                                )
                                            );
                                        }}
                                    />

                                </td>
                            ) : (
                                <td data-label="Observação">{p.observacao ?? ""}</td>
                            )
                            }
                            <div className={styles.btn_command}>
                                <button onClick={() => setEditingIndex(editingIndex === i ? null : i)}>
                                    {editingIndex === i ? <Check size={10} /> : <Pencil size={10} />}
                                </button>
                            </div>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div >
    );
}
