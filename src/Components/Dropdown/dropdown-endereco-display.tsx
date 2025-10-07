"use client";
import styles from "./dropdown-endereco-display.module.css";
import { Endereco } from "/src/Models/Endereco";
import { usePerfil } from "/src/store/perfil";

/// Dropdown para selecionar endereços salvos no perfil do usuário
export default function DropdownEnderecosDisplay() {
  const { enderecoSelecionado, setEnderecoSelecionado, enderecos } =
    usePerfil();

  const handleSelectChange = (endereco: Endereco) => {
    const novo: Endereco = {
      rua: endereco.rua,
      numero: endereco.numero,
      bairro: endereco.bairro,
      cidade: endereco.cidade,
      estado: endereco.estado,
    };

    setEnderecoSelecionado(novo);
  };
  return (
    <div className="optionColumn">
      <h3>Endereços</h3>

      <div className={styles.dropdown}>
        <select
          className={styles.header}
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
    </div>
  );
}
