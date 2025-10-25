"use client";
import { useState } from "react";
import ActionButtons from "../../../Components/ActionsButton/actions-button";
import DropdownEnderecosDisplay from "../../../Components/Dropdown/dropdown-endereco-display";
import UserInfoField from "../../../Components/UserInfoField/user-input-field";
import styles from "./perfil.module.css";
import Container from "/src/Components/ContentContainer/Container";
// import { SetUsuarioData, GetUsuarioData } from '/src/Services/LocalStorageManager';
import FormEndereco from "../../../Components/EnderecoForm/endereco-form";
import { usePerfil } from "/src/store/perfil";

export default function Perfil() {
  const { nome, numero } = usePerfil();

  const { setNome, setNumero } = usePerfil();

  const [editando, setEditando] = useState(false);

  const save = () => {
    setEditando(false);
  };

  const cancel = () => setEditando(false);

  return (
    <div>
      <Container>
        <div className={styles.userDataContainer}>
          <UserInfoField
            onChange={setNome}
            label="Nome"
            value={nome}
            editing={editando}
          />
          <UserInfoField
            onChange={setNumero}
            label="Telefone"
            value={numero}
            editing={editando}
          />

          {/* Exibição de endereços */}
          <DropdownEnderecosDisplay />

          {/* Formulário para adicionar/editar endereço */}
          {editando && <FormEndereco />}

          <ActionButtons
            editing={editando}
            onSave={save}
            onCancel={cancel}
            onEdit={() => setEditando(true)}
          />
        </div>
      </Container>

      <div className={styles.login}>
        <Container>
          <button className={styles.login_button}>Login</button>
          <button className={styles.cad_button}>Cadastrar</button>
        </Container>
      </div>
    </div>
  );
}
