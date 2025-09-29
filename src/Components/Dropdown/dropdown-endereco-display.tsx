'use client';
import { useEffect, useState } from "react";
import { Endereco } from "/src/Models/Endereco";
import styles from "./dropdown-endereco-display.module.css";

interface Props {
    saveOnProfile: boolean;
    enderecos: Endereco[];
    setEnderecoSelecionado: (e: Endereco) => void;
}


/// Dropdown para selecionar endereços salvos no perfil do usuário
export default function DropdownEnderecosDisplay({ saveOnProfile, enderecos, setEnderecoSelecionado }: Props) {
    const [enderecoSelecionado, setEndSelec] = useState<Endereco | null>(null);

    useEffect(() => {

        const perfilUsuarioStr = localStorage.getItem("perfilUsuario");
        if (perfilUsuarioStr) {
            const perfilUsuario = JSON.parse(perfilUsuarioStr);
            setEndSelec(perfilUsuario.enderecoSelecionado || null);
        }

    }, []);

    const handleSelectChange = (endereco: Endereco) => {
        const novo: Endereco = {
            rua: endereco.rua,
            numero: Number(endereco.numero),
            bairro: endereco.bairro,
            cidade: endereco.cidade,
            estado: endereco.estado,
        };

        setEnderecoSelecionado(novo);
        //salvando no perfil se necessário
        if (!saveOnProfile) return;
        const perfilUsuarioStr = localStorage.getItem("perfilUsuario");
        const perfilUsuario = perfilUsuarioStr ? JSON.parse(perfilUsuarioStr) : {};
        const userData = {
            ...perfilUsuario,
            enderecoSelecionado: novo,
        };
        localStorage.setItem("perfilUsuario", JSON.stringify(userData));
    };
    return (
        <div className="optionColumn">
            <h3>Endereços</h3>

            <div className={styles.dropdown}>
                <select className={styles.header}
                    onChange={(e) => {
                        const i = Number(e.target.value);
                        handleSelectChange(enderecos[i]);
                    }}
                >
                    {/* Opção padrão */}
                    <option value="">
                        {enderecoSelecionado
                            ? `${enderecoSelecionado.rua}, ${enderecoSelecionado.numero} - ${enderecoSelecionado.bairro}, ${enderecoSelecionado.cidade} - ${enderecoSelecionado.estado}`
                            : "Selecione um endereço..."}
                    </option>

                    {enderecos &&
                        enderecos.map((endereco, i) => (
                            <option key={i} value={i}>
                                {`${endereco.rua}, ${endereco.numero} - ${endereco.bairro}, ${endereco.cidade} - ${endereco.estado}`}
                            </option>
                        ))}
                </select>
            </div>
        </div >
    );
}
