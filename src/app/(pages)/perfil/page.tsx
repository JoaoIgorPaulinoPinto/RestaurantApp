'use client';

import { useEffect, useState } from 'react';
import Container from '/src/Components/Container/Container';
import UserInfoField from '../../../Components/Perfil/UserInfoField/UserInfoField';
import ActionButtons from '../../../Components/Perfil/ActionsButton/ActionsButtons';
import styles from './perfil.module.css';
import DropdownEnderecosDisplay from '/src/Components/FinishingOrderPage/OrderOptionsSetting/DropdownenderecosDisplay';
import { Endereco } from '/src/Models/Endereco';
// import { SetUsuarioData, GetUsuarioData } from '/src/Services/LocalStorageManager';
import FormEndereco from '/src/Components/Perfil/EnderecoDropdown/endereco-form';

export default function Perfil() {
    const [editando, setEditando] = useState(false);
    const [nome, setNome] = useState('');
    const [numero, setNumero] = useState('');
    const [endereco, setEndereco] = useState<Endereco[]>([]);
    const [enderecoSelecionado, setEnderecoSelecionado] = useState<Endereco | null>(null);

    const saveToLocalStorage = () => {
        const userData = {
            nome,
            numero,
            endereco,
            enderecoSelecionado:
                enderecoSelecionado && endereco.includes(enderecoSelecionado)
                    ? enderecoSelecionado
                    : null,
        };
        localStorage.setItem("perfilUsuario", JSON.stringify(userData));
    };

    useEffect(() => {
        const savedData = localStorage.getItem("perfilUsuario");
        if (savedData) {
            const { nome, numero, endereco, enderecoSelecionado } = JSON.parse(savedData);
            setNome(nome || '');
            setNumero(numero || '');
            setEndereco(Array.isArray(endereco) ? endereco : []);
            setEnderecoSelecionado(enderecoSelecionado || null);
        }
    }, []);

    const save = () => {
        setEditando(false);
        saveToLocalStorage();
    };

    const cancel = () => setEditando(false);

    // garante apenas objetos válidos
    const enderecosPerfil: Endereco[] = Array.isArray(endereco)
        ? endereco.filter((e) => typeof e === 'object' && e !== null)
        : [];

    return (
        <Container>
            <div className={styles.userDataContainer}>
                <UserInfoField label="Nome" value={nome} editing={editando} onChange={setNome} />
                <UserInfoField label="Telefone" value={numero} editing={editando} onChange={setNumero} />

                {/* Exibição de endereços */}
                <DropdownEnderecosDisplay enderecos={enderecosPerfil} />

                {/* Formulário para adicionar/editar endereço */}
                {editando && (
                    <FormEndereco setEnderecoSelecionado={setEnderecoSelecionado} />
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
