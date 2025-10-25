"use client";

import { useEffect } from "react";
import Container from "../ContentContainer/Container";
import DropdownEnderecosDisplay from "../Dropdown/dropdown-endereco-display";
import FormEndereco from "../EnderecoForm/endereco-form";
import styles from "./finish-order-options.module.css";
import { Endereco } from "/src/Models/Endereco";

interface FinishOrderOptionsSettingProps {
  setEnderecos?: (e: Endereco[]) => void;
  isEntrega: boolean;
  setIsEntrega: (e: boolean) => void;
  metodoPagamento: string;
  setMetodoPagamento: (e: string) => void;
  setEndereco: (e: Endereco) => void;
}

// Componente para selecionar opções de entrega e pagamento
export default function FinishOrderOptionsSetting({
  isEntrega,
  setIsEntrega,
  metodoPagamento,
  setMetodoPagamento,
  setEndereco,
}: FinishOrderOptionsSettingProps) {
  // Carrega endereços do localStorage ao montar
  useEffect(() => {
    if (typeof window !== "undefined") {
      const usuarioData = JSON.parse(
        localStorage.getItem("perfilUsuario") || "{}"
      );
      const enderecos: Endereco[] = Array.isArray(usuarioData.endereco)
        ? usuarioData.endereco
        : [];

      if (usuarioData.enderecoSelecionado) {
        setEndereco(usuarioData.enderecoSelecionado);
      } else if (enderecos.length > 0) {
        setEndereco(enderecos[0]);
      }
    }
  }, [setEndereco]);

  return (
    <>
      {/* Entrega / Retirada */}
      <Container>
        <div className={styles.optionColumn}>
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
              <DropdownEnderecosDisplay />
              <FormEndereco />
            </>
          )}
        </div>
      </Container>

      {/* Pagamento */}
      <Container>
        <div className={styles.optionColumn}>
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
      </Container>
    </>
  );
}
