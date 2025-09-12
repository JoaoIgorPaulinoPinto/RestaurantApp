import { Produto } from '../../HomePage/ProductCard/Product';
import styles from './OrderTable.module.css'

interface TableProps {
    produtos: Produto[];
    setProdutos: React.Dispatch<React.SetStateAction<Produto[]>>;
}

export default function FinishingOrderTable({ produtos, setProdutos }: TableProps) {
    return (
        <div className={styles.body}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Produto</th>
                        <th>Quantidade</th>
                        <th>Preço</th>
                        <th>Observação</th>
                    </tr>
                </thead>
                <tbody>
                    {produtos.map((p, i) => (
                        <tr key={i}>
                            <td>{p.name}</td>
                            <td>{p.quantidade}x</td>
                            <td>R${(p.preco * (p.quantidade || 0)).toFixed(2)}</td>
                            <td>
                                <input
                                    type="text"
                                    placeholder="Adicionar observação"
                                    value={p.observacao || ""}
                                    onChange={(e) => {
                                        const novosProdutos = [...produtos];
                                        novosProdutos[i] = { ...novosProdutos[i], observacao: e.target.value };
                                        setProdutos(novosProdutos);
                                    }}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
