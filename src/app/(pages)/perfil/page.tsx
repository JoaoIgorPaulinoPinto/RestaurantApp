'use client'
import { useEffect, useState } from 'react';
import Container from '/src/Components/Container/Container';
import UserInfoField from '../../../Components/Perfil/UserInfoField/UserInfoField';
import EnderecoDropdown from '../../../Components/Perfil/EnderecoDropdown/EnderecoDropdown';
import ActionButtons from '../../../Components/Perfil/ActionsButton/ActionsButtons';
import styles from './perfil.module.css';

export default function Perfil() {
    const [editando, setEditando] = useState(false);
    const [nome, setNome] = useState('');
    const [numero, setNumero] = useState('');
    const [endereco, setEndereco] = useState<string[]>([]);
    const [enderecoSelecionado, setEnderecoSelecionado] = useState('');
    const saveToLocalStorage = () => {
        const userData = {
            nome,
            numero,
            endereco,
            enderecoSelecionado: endereco.includes(enderecoSelecionado) ? enderecoSelecionado : ''
        };
        localStorage.setItem("perfilUsuario", JSON.stringify(userData));
    };

    useEffect(() => {
        const savedData = localStorage.getItem("perfilUsuario");
        if (savedData) {
            const { nome, numero, endereco, enderecoSelecionado } = JSON.parse(savedData);
            setNome(nome);
            setNumero(numero);
            setEndereco(endereco);
            setEnderecoSelecionado(enderecoSelecionado);
        }
    }, []);
    const save = () => {
        setEditando(false)
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

                <EnderecoDropdown
                    editing={editando}
                    endereco={endereco}
                    setEndereco={setEndereco}
                    enderecoSelecionado={enderecoSelecionado}
                    setEnderecoSelecionado={setEnderecoSelecionado}
                />

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
