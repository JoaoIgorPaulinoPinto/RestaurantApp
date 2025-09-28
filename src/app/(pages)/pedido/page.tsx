'use client';
import { useEffect, useState } from 'react';
import { Produto } from '/src/Components/HomePage/ProductCard/Product'
import styles from './Pedido.module.css';
import { useRouter } from 'next/navigation';
import OrderTable from '/src/Components/FinishingOrderPage/Table/OrderTable'
import OrderOptionsSetting from '/src/Components/FinishingOrderPage/OrderOptionsSetting/OrderOptionsSetting'
import Sumary from '/src/Components/FinishingOrderPage/Sumary/Sumary';
import Container from '/src/Components/Container/Container';

import { Endereco as Endereco } from '/src/Models/Endereco';

interface respoApiProd {
    idProduto: number;
    quantidade: number;
    obs: string;
}
interface apiRespo {
    respoApiProd: respoApiProd[];
    pagamentoMeth: string;
    endereco: Endereco | string;
    // coordenadas: { lat: number; lon: number };
}

export default function PedidoPage() {
    const [isEntrega, setIsEntrega] = useState(false);
    const [metodoPagamento, setMetodoPagamento] = useState("");
    const [endereco, setEndereco] = useState<Endereco | null>(null);
    const total = 0; // substituir pelo cálculo real do total
    const router = useRouter();
    const [produtos, setProdutos] = useState<Produto[]>([]);

    useEffect(() => {
        const carrinho = localStorage.getItem("carrinho");
        if (carrinho) setProdutos(JSON.parse(carrinho));
    }, []);
    useEffect(() => {
        if (typeof window !== "undefined") {
            const perfilUsuario = localStorage.getItem("perfilUsuario");
            if (perfilUsuario) setEndereco(JSON.parse(perfilUsuario).enderecoSelecionado || null);
        }
    }, []);
    useEffect(() => {
        if (produtos.length > 0) {
            localStorage.setItem("carrinho", JSON.stringify(produtos));
        }
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
            endereco: isEntrega ? endereco ?? '' : "Retirada no Local",
            // coordenadas: { lat: 0, lon: 0 },
        };

        localStorage.getItem("carrinho") && localStorage.removeItem("carrinho");
        console.log('Pedido finalizado!', rp);
        alert('Pedido finalizado! Veja o console.');
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
