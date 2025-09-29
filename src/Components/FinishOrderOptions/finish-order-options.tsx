'use client'

import { useEffect, useState } from "react";
import Container from "/src/Components/Container/container";
import styles from "./finish-order-options.module.css"
import FormEndereco from "../EnderecoForm/endereco-form";
import { Endereco } from "/src/Models/Endereco";
import DropdownEnderecosDisplay from "../Dropdown/dropdown-endereco-display";

interface FinishOrderOptionsSettingProps {
    isEntrega: boolean;
    setIsEntrega: React.Dispatch<React.SetStateAction<boolean>>;
    metodoPagamento: string;
    setMetodoPagamento: React.Dispatch<React.SetStateAction<string>>;
    setEndereco: React.Dispatch<React.SetStateAction<Endereco | null>>;
}


//componente para selecionar opções de entrega e pagamento ao finalizar o pedido
export default function FinishOrderOptionsSetting({
    isEntrega,
    setIsEntrega,
    metodoPagamento,
    setMetodoPagamento,
    setEndereco,
}: FinishOrderOptionsSettingProps) {
    const [enderecosPerfil, setEnderecosPerfil] = useState<Endereco[]>([]);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const usuarioData = JSON.parse(localStorage.getItem("perfilUsuario") || "{}");
            const enderecos: Endereco[] = Array.isArray(usuarioData.endereco) ? usuarioData.endereco : [];
            setEnderecosPerfil(enderecos);
        }
    }, []);

    return (
        <Container>
            {/* Entrega / Retirada */}
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
                        <DropdownEnderecosDisplay saveOnProfile={false} setEnderecoSelecionado={setEndereco} enderecos={enderecosPerfil} />
                        <FormEndereco setEnderecoSelecionado={setEndereco} />
                    </>
                )}
            </div>

            {/* Pagamento */}
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
        </Container>
    );
}
