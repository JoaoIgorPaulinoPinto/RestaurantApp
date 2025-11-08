"use client";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import OrderTable from "../../../Components/Table/finish-oder-table";
import styles from "./Pedido.module.css";
import Container from "/src/Components/ContentContainer/Container";
import OrderOptionsSetting from "/src/Components/FinishOrderOptions/finish-order-options";

import { Endereco } from "/src/Models/Endereco";
import api from "/src/Services/API/api";
import { useCarrinho } from "/src/store/carrinho";
import { usePerfil } from "/src/store/perfil";

// ✅ Tipos
interface PedidoProduto {
  produtoId: number;
  quantidade: number;
  obs?: string;
}

interface PedidoRequest {
  metodoPagamento: string;
  idEstabelecimento: number;
  endereco: string;
  usuario: string;
  pedidoProdutos: PedidoProduto[];
}

// ✅ Página principal
export default function PedidoPage() {
  const { enderecoSelecionado } = usePerfil();

  const [isEntrega, setIsEntrega] = useState(false);
  const [metodoPagamento, setMetodoPagamento] = useState("");
  const [endereco, setEndereco] = useState<Endereco | null>(null);
  const router = useRouter();

  const { produtosNoCarrinho, limparLista } = useCarrinho();

  // ✅ Calcula total de forma memoizada
  const total = useMemo(
    () =>
      produtosNoCarrinho.reduce((acc, p) => acc + p.preco * p.quantidade, 0),
    [produtosNoCarrinho]
  );

  useEffect(() => {
    console.log("📍 Endereço selecionado:", endereco);
  }, [endereco]);

  // ✅ Função separada para montar o corpo do pedido
  const montarPedido = useCallback((): PedidoRequest => {
    const pedidoProdutos = produtosNoCarrinho.map((p) => ({
      produtoId: p.id,
      quantidade: p.quantidade,
      obs: p.obs || "",
    }));

    const enderecoFormatado =
      isEntrega && enderecoSelecionado
        ? `${enderecoSelecionado.rua}, ${enderecoSelecionado.numero} - ${enderecoSelecionado.bairro}, ${enderecoSelecionado.cidade}`
        : isEntrega
        ? "Entrega no Local"
        : "Retirada no Local";

    return {
      metodoPagamento,
      idEstabelecimento: 1, // ⚙️ futuro: pegar do contexto ou API
      endereco: enderecoFormatado,
      usuario: "cliente_teste", // ⚙️ futuro: pegar do auth
      pedidoProdutos,
    };
  }, [isEntrega, enderecoSelecionado, metodoPagamento, produtosNoCarrinho]);

  // ✅ Envia pedido para API
  const enviarPedido = useCallback(async () => {
    const pedido = montarPedido();

    try {
      console.log("📦 Corpo final do pedido:", JSON.stringify(pedido, null, 2));

      const response = await api.post("/pedidos", pedido);
      console.log("✅ Pedido finalizado:", response.data);

      limparLista();
      alert("Pedido finalizado com sucesso!");
      router.push("/");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(
        "❌ Erro ao enviar pedido:",
        error.response?.data || error.message
      );
      alert("Erro ao finalizar pedido. Tente novamente.");
    }
  }, [montarPedido, limparLista, router]);

  return (
    <div className={styles.content}>
      <Container>
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
          <button
            className={styles.btn_finalizar}
            onClick={enviarPedido}
            disabled={!metodoPagamento || produtosNoCarrinho.length === 0}
          >
            Finalizar Pedido
          </button>
        </div>
      </Container>
    </div>
  );
}
