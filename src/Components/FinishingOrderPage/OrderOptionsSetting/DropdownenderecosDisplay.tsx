'use client';
import { useState } from "react";
import { Endereco } from "/src/Models/Endereco";
import styles from "./dropdownenderecodisplay.module.css";

interface Props {
    enderecos: Endereco[] | null;
}

export default function DropdownEnderecosDisplay({ enderecos }: Props) {
    const [enderecoSelecionado, setEnderecoSelecionado] = useState<Endereco | null>(null);

    return (
        <div className="optionColumn">
            <h3>Endereços</h3>

            <div className={styles.dropdown}>
                <select
                    className={styles.header}
                    value={
                        enderecoSelecionado && enderecos
                            ? enderecos.indexOf(enderecoSelecionado).toString()
                            : ""
                    }
                    onChange={(e) => {
                        if (!enderecos) return;
                        const idx = parseInt(e.target.value, 10);
                        setEnderecoSelecionado(enderecos[idx]);
                    }}
                >
                    {/* Opção padrão */}
                    <option value="">
                        {enderecoSelecionado
                            ? `${enderecoSelecionado.rua}, ${enderecoSelecionado.numero} - ${enderecoSelecionado.bairro}, ${enderecoSelecionado.cidade} - ${enderecoSelecionado.estado}`
                            : "Selecione um endereço..."}
                    </option>

                    {/* Demais endereços */}
                    {enderecos &&
                        enderecos.map((endereco, i) => (
                            <option key={i} value={i}>
                                {`${endereco.rua}, ${endereco.numero} - ${endereco.bairro}, ${endereco.cidade} - ${endereco.estado}`}
                            </option>
                        ))}
                </select>
            </div>
        </div>
    );
}
