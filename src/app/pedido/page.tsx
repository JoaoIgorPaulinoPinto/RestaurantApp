'use client'

import { useEffect, useState } from 'react';
import { Produto } from '/src/Components/ProductCard/Product';
import styles from './Pedido.module.css';
import { useRouter } from 'next/navigation';

interface respoApiProd {
    idProduto: number;
    quantidade: number;
    obs: string;
}
interface apiRespo {
    respoApiProd: respoApiProd[];
    pagamentoMeth: string;
    endereco: string;
    coordenadas: { lat: number; lon: number };
}

export default function PedidoPage() {
    const [isEntrega, setIsEntrega] = useState(false);
    const [metodoPagamento, setMetodoPagamento] = useState("");
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [total, setTotal] = useState(0);

    const router = useRouter();


    useEffect(() => {
        const carrinhoLocal = localStorage.getItem("carrinho");
        if (carrinhoLocal) setProdutos(JSON.parse(carrinhoLocal));
    }, []);

    useEffect(() => {
        const totalCalc = produtos.reduce(
            (acc, p) => acc + (p.quantidade || 0) * p.preco,
            0
        );
        setTotal(totalCalc);
    }, [produtos]);

    const handleFinalizar = () => {
        const novoResp: respoApiProd[] = produtos.map((p) => ({
            idProduto: p.id,
            quantidade: p.quantidade,
            obs: p.observacao || ""
        }));

        const rp: apiRespo = {
            respoApiProd: novoResp,
            pagamentoMeth: metodoPagamento,
            endereco: isEntrega ? "Endereço do Usuario" : "Retirada no Local",
            coordenadas: { lat: 0, lon: 0 },
        };

        console.log('Pedido finalizado!', rp);
        alert('Pedido finalizado! Veja o console.');
        localStorage.removeItem("carrinho");
        router.push("/"); // redireciona para a página Pedido

    };

    return (
        <div className={styles.content}>
            <div className={styles.header}>
                <span>Finalização do Pedido</span>
            </div>

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

            {/* Pagamento e entrega lado a lado */}
            <div className={styles.optionsContainer}>
                <div className={styles.optionColumn}>
                    <h3>Entrega / Retirada</h3>
                    <label>
                        <input
                            type="radio"
                            name="entrega"
                            value="Retirada"
                            checked={!isEntrega}
                            onChange={() => setIsEntrega(false)}
                        />
                        Retirada no Local
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="entrega"
                            value="Entrega"
                            checked={isEntrega}
                            onChange={() => setIsEntrega(true)}
                        />
                        Entrega
                    </label>
                    {isEntrega && (
                        <>
                            <label className={styles.checkboxEndereco}>
                                <input type="checkbox" /> Meu endereço
                            </label>
                            <label className={styles.buttonEndereco}>
                                <button>Adicionar Endereço</button>
                            </label>
                        </>

                    )}
                </div>

                <div className={styles.optionColumn}>
                    <h3>Pagamento</h3>
                    <label>
                        <input
                            type="radio"
                            name="pagamento"
                            value="pix"
                            checked={metodoPagamento === "pix"}
                            onChange={(e) => setMetodoPagamento(e.target.value)}
                        />
                        Pix
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="pagamento"
                            value="dinheiro"
                            checked={metodoPagamento === "dinheiro"}
                            onChange={(e) => setMetodoPagamento(e.target.value)}
                        />
                        Dinheiro
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="pagamento"
                            value="cartao"
                            checked={metodoPagamento === "cartao"}
                            onChange={(e) => setMetodoPagamento(e.target.value)}
                        />
                        Cartão
                    </label>
                </div>
            </div>

            {/* Frete e total */}
            <div className={styles.summary}>
                <span>Frete: <strong>R$4,00</strong></span>
                <span>Total: <strong>R${(total + 4).toFixed(2)}</strong></span>
            </div>

            <button className={styles.btn_finalizar} onClick={handleFinalizar}>
                Finalizar Pedido
            </button>
        </div>
    );
}
