'use client'

import { useEffect, useState } from 'react';
import { Produto } from '/src/Components/HomePage/ProductCard/Product'
import styles from './Pedido.module.css';
import { useRouter } from 'next/navigation';
import OrderTable from '/src/Components/FinishingOrderPage/Table/OrderTable'
import OrderOptionsSetting from '/src/Components/FinishingOrderPage/OrderOptionsSetting/OrderOptionsSetting'
import Sumary from '/src/Components/FinishingOrderPage/Sumary/Sumary';
import Container from '/src/Components/Container/Container';
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
    const [endereco, setEndereco] = useState('');
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
            endereco: isEntrega ? endereco.toString() : "Retirada no Local",
            coordenadas: { lat: 0, lon: 0 },
        };

        console.log('Pedido finalizado!', rp);
        alert('Pedido finalizado! Veja o console.');
        localStorage.removeItem("carrinho");
        router.push("/"); // redireciona para a página Pedido

    };

    return (
        <div className={styles.content}>
            {/* <div className={styles.header}>
                <span>Finalização do Pedido</span>
            </div> */}
            <Container>
                <OrderTable produtos={produtos} setProdutos={setProdutos} />

            </Container>

            <Sumary total={total} frete={4} />

            <OrderOptionsSetting
                isEntrega={isEntrega}
                setIsEntrega={setIsEntrega}
                metodoPagamento={metodoPagamento}
                setMetodoPagamento={setMetodoPagamento}
                setEndereco={setEndereco}
            />


            <button className={styles.btn_finalizar} onClick={handleFinalizar}>
                Finalizar Pedido
            </button>
        </div>
    );
}
