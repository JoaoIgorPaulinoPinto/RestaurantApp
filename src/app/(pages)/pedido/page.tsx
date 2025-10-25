"use client";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import OrderTable from "../../../Components/Table/finish-oder-table";
import styles from "./Pedido.module.css";
import Container from "/src/Components/ContentContainer/Container";
import OrderOptionsSetting from "/src/Components/FinishOrderOptions/finish-order-options";
import { Endereco } from "/src/Models/Endereco";
import { Produto } from "/src/Models/Produto";
import { postPedido } from "/src/Services/API/server";
import { useCarrinho } from "/src/store/carrinho"; // ✅ caminho relativo corrigido

export interface apiRespo {
  produtos: Produto[];
  pagamentoMeth: string;
  endereco: Endereco | string;
  // coordenadas: { lat: number; lon: number };
}

export default function PedidoPage() {
  const [isEntrega, setIsEntrega] = useState(false);
  const [metodoPagamento, setMetodoPagamento] = useState("");
  const [endereco, setEndereco] = useState<Endereco | null>(null);

  const router = useRouter();

  // ✅ Zustand
  const { produtosNoCarrinho: produtos, limparLista: clearProdutos } =
    useCarrinho();

  // total do pedido
  const total = useMemo(
    () =>
      produtos.reduce(
        (acc: number, p: Produto) => acc + p.preco * p.quantidade,
        0
      ),
    [produtos]
  );

  useEffect(() => {
    console.log("Endereço selecionado:", endereco);
  }, [endereco]);

  const enviarPedido = async (data: apiRespo) => {
    try {
      await postPedido(1, 1, data);
      clearProdutos(); // ✅ limpa carrinho
      console.log("Pedido finalizado!", data);
      alert("Pedido finalizado! Veja o console.");
      router.push("/"); // redireciona para home
    } catch (error) {
      console.log(error);
    }
  };

  const handleFinalizar = () => {
    const rp: apiRespo = {
      produtos: produtos,
      pagamentoMeth: metodoPagamento,
      endereco: isEntrega ? endereco ?? "" : "Retirada no Local",
      // coordenadas: { lat: 0, lon: 0 },
    };
    enviarPedido(rp);
  };

  return (
    <div className={styles.content}>
      <Container>
        {/* ✅ passa função que atualiza quantidades no zustand */}
        <OrderTable />
      </Container>

      <OrderOptionsSetting
        isEntrega={isEntrega}
        setIsEntrega={setIsEntrega}
        metodoPagamento={metodoPagamento}
        setMetodoPagamento={setMetodoPagamento}
        setEndereco={setEndereco}
      />

      <Container>
        <div className={styles.summary}>
          <span>Frete: R${(7).toFixed(2)}</span>
          <span>Total: R${total.toFixed(2).replace(".", ",")}</span>
          <button className={styles.btn_finalizar} onClick={handleFinalizar}>
            Finalizar Pedido
          </button>
        </div>
      </Container>
    </div>
  );
}
