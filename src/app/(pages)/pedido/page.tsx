"use client";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import styles from "./Pedido.module.css";
import Container from "/src/Components/ContentContainer/Container";
import OrderTable from "/src/Components/Especifies/Table/finish-oder-table";
import OrderOptionsSetting from "/src/Components/FinishOrderOptions/finish-order-options";
import { Endereco } from "/src/Models/Endereco";
import { Produto, useCarrinho } from "/src/store/carrinho"; // ✅ caminho relativo corrigido

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

  const router = useRouter();

  // ✅ Zustand
  const { produtosNoCarrinho: produtos, clearCarrinho: clearProdutos } =
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

  const handleFinalizar = () => {
    const novoResp: respoApiProd[] = produtos.map((p: Produto) => ({
      idProduto: p.id,
      quantidade: p.quantidade,
      obs: p.observacao || "",
    }));

    const rp: apiRespo = {
      respoApiProd: novoResp,
      pagamentoMeth: metodoPagamento,
      endereco: isEntrega ? endereco ?? "" : "Retirada no Local",
      // coordenadas: { lat: 0, lon: 0 },
    };

    clearProdutos(); // ✅ limpa carrinho
    console.log("Pedido finalizado!", rp);
    alert("Pedido finalizado! Veja o console.");
    router.push("/"); // redireciona para home
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
