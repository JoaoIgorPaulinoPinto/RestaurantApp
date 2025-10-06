"use client";
import { useEffect, useState } from "react";
import ActionButtons from "../../../Components/ActionsButton/actions-button";
import DropdownEnderecosDisplay from "../../../Components/Dropdown/dropdown-endereco-display";
import UserInfoField from "../../../Components/UserInfoField/user-input-field";
import styles from "./perfil.module.css";
import Container from "/src/Components/ContentContainer/Container";
import { Endereco } from "/src/Models/Endereco";
// import { SetUsuarioData, GetUsuarioData } from '/src/Services/LocalStorageManager';
import FormEndereco from "/src/Components/Especifies/EnderecoForm/endereco-form";

export default function Perfil() {
  const [editando, setEditando] = useState(false);
  const [nome, setNome] = useState("");
  const [numero, setNumero] = useState("");
  const [endereco, setEndereco] = useState<Endereco[]>([]);
  const [enderecoSelecionado, setEnderecoSelecionado] =
    useState<Endereco | null>(null);

  const saveToLocalStorage = () => {
    const userData = {
      nome,
      numero,
      endereco,
      enderecoSelecionado:
        enderecoSelecionado && endereco.includes(enderecoSelecionado)
          ? enderecoSelecionado
          : endereco[0],
    };
    localStorage.setItem("perfilUsuario", JSON.stringify(userData));
  };

  useEffect(() => {
    const savedData = localStorage.getItem("perfilUsuario");
    if (savedData) {
      const data = JSON.parse(savedData);
      setNome(data.nome || "");
      setNumero(data.numero || "");
      setEndereco(Array.isArray(data.endereco) ? data.endereco : []);
      setEnderecoSelecionado(
        data.enderecoSelecionado
          ? data.enderecoSelecionado
          : data.endereco
          ? data.endereco[0]
          : null
      );
    }
  }, []);

  const save = () => {
    setEditando(false);
    saveToLocalStorage();
  };

  const cancel = () => setEditando(false);

  return (
    <Container>
      <div className={styles.userDataContainer}>
        <UserInfoField
          label="Nome"
          value={nome}
          editing={editando}
          onChange={setNome}
        />
        <UserInfoField
          label="Telefone"
          value={numero}
          editing={editando}
          onChange={setNumero}
        />

        {/* Exibição de endereços */}
        <DropdownEnderecosDisplay
          saveOnProfile={true}
          setEnderecoSelecionado={setEnderecoSelecionado}
          enderecos={endereco}
        />

        {/* Formulário para adicionar/editar endereço */}
        {editando && (
          <FormEndereco
            setEnderecos={setEndereco}
            enderecos={endereco}
            setEnderecoSelecionado={setEnderecoSelecionado}
          />
        )}

        <ActionButtons
          editing={editando}
          onSave={save}
          onCancel={cancel}
          onEdit={() => setEditando(true)}
        />
      </div>
    </Container>
  );
}
