import { UserRound } from "lucide-react";
import { useState } from "react";
import ActionButtons from "../ActionsButton/actions-button";
import DropdownEnderecosDisplay from "../Dropdown/dropdown-endereco-display";
import FormEndereco from "../EnderecoForm/endereco-form";
import UserInfoField from "../UserInfoField/user-input-field";
import styles from "./perfil-dropdown.module.css";
import { usePerfil } from "/src/store/perfil";

export default function Perfil() {
  const [isOpen, setIsOpen] = useState(false);
  const [editando, setEditando] = useState(false);

  const { nome, numero, setNome, setNumero } = usePerfil();

  const save = () => setEditando(false);
  const cancel = () => setEditando(false);

  return (
    <div className={styles.dropdownContainer}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={styles.profileButton}
      >
        <UserRound size={28} />
        <span>Meu Perfil</span>
      </button>

      {isOpen && (
        <div className={styles.dropdownContent}>
          <UserInfoField
            label="Nome"
            value={nome}
            onChange={setNome}
            editing={editando}
          />
          <UserInfoField
            label="Telefone"
            value={numero}
            onChange={setNumero}
            editing={editando}
          />
          <DropdownEnderecosDisplay />
          {editando && <FormEndereco />}
          <ActionButtons
            editing={editando}
            onSave={save}
            onCancel={cancel}
            onEdit={() => setEditando(true)}
          />
        </div>
      )}
    </div>
  );
}
