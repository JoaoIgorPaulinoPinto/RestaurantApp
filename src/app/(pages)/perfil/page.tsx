'use client'
import { Check, Pencil, Plus, X, X as XIcon, ChevronDown, ChevronUp, Forward } from 'lucide-react';
import styles from './perfil.module.css'
import Container from '/src/Components/Container/Container'
import { useState, useRef, useEffect } from 'react';

export default function Perfil() {
    const [novoEndereco, setNovoEndereco] = useState<string>("");
    const [editando, setEditando] = useState<boolean>(false);
    const [nome, setNome] = useState<string>('');
    const [numero, setNumero] = useState<string>('');
    const [endereco, setEndereco] = useState<string[]>([]);
    const [enderecoSelecionado, setEnderecoSelecionado] = useState<string>("");
    const [adicionando, setAdicionando] = useState<boolean>(false);
    const [dropdownAberto, setDropdownAberto] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const save = () => setEditando(false);
    const edit = () => setEditando(true);
    const cancel = () => setEditando(false);

    useEffect(() => {
        if (adicionando && inputRef.current) {
            inputRef.current.focus();
        }
    }, [adicionando]);
    const addEndereco = () => {
        if (novoEndereco.trim() !== "") {
            setEndereco([...endereco, novoEndereco]);
            setEnderecoSelecionado(novoEndereco);
            setNovoEndereco("");
            setAdicionando(false);
        }
    };

    const deleteEndereco = (item: string) => {
        setEndereco(endereco.filter((e) => e !== item));
        if (enderecoSelecionado === item) setEnderecoSelecionado("");
    };


    return (
        <Container>
            <div className={styles.userDataContainer}>
                {/* Nome */}
                <div className={styles.userDataInfo}>
                    <span>Nome:</span>
                    {editando ? (
                        <input
                            type="text"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                        />
                    ) : (
                        <span>{nome}</span>
                    )}
                </div>

                {/* Telefone */}
                <div className={styles.userDataInfo}>
                    <span>Telefone:</span>
                    {editando ? (
                        <input
                            type="text"
                            value={numero}
                            onChange={(e) => setNumero(e.target.value)}
                        />
                    ) : (
                        <span>{numero}</span>
                    )}
                </div>

                {/* Endereços */}
                <div className={styles.enderecoContainer}>
                    <span>Endereço:</span>
                    {/* Dropdown e botão de adicionar */}
                    <div className={styles.enderecoInputWrapper}>
                        {!adicionando && (
                            <>
                                <div className={styles.customDropdown}>
                                    <div
                                        className={styles.customDropdownSelected}
                                        onClick={() => setDropdownAberto(!dropdownAberto)}
                                    >
                                        <span>{enderecoSelecionado || "Selecione..."}</span>
                                        {editando
                                            ? (dropdownAberto ? <ChevronUp size={16} /> : <ChevronDown size={16} />)
                                            : (dropdownAberto ? <ChevronUp size={16} /> : <ChevronDown size={16} />)
                                        }
                                    </div>

                                    {dropdownAberto && (
                                        <div className={styles.customDropdown}>


                                            {dropdownAberto && (

                                                <ul className={styles.customDropdownList}>
                                                    {endereco.map((item, idx) => (
                                                        <li key={idx} className={styles.customDropdownItem}>
                                                            <span
                                                                className={styles.enderecoItemText}
                                                                onClick={() => {
                                                                    setEnderecoSelecionado(item);
                                                                    setDropdownAberto(false);
                                                                }}
                                                            >
                                                                {item}
                                                            </span>
                                                            {editando && (
                                                                <button
                                                                    type="button"
                                                                    className={styles.deleteButton}
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        deleteEndereco(item);
                                                                    }}
                                                                    aria-label={`Excluir ${item}`}
                                                                >
                                                                    <XIcon size={14} />
                                                                </button>
                                                            )}
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    )}
                                </div>

                                {/* Botão de adicionar endereço */}
                                <button
                                    type="button"
                                    className={styles.btn_adicionarEndereco}
                                    onClick={() => setAdicionando(true)}
                                >
                                    {editando ? <Plus size={14} /> : <Forward size={14} />}
                                </button>
                            </>
                        )}

                        {adicionando && editando && (
                            <>
                                <input
                                    type="text"
                                    ref={inputRef}
                                    value={novoEndereco}
                                    onChange={(e) => setNovoEndereco(e.target.value)}
                                    placeholder="Digite novo endereço"
                                    className={styles.dropdown}
                                />
                                <button
                                    type="button"
                                    className={styles.btn_adicionarEndereco}
                                    onClick={addEndereco}
                                >
                                    {editando ? <Forward size={14} /> : <Plus size={14} />}
                                </button>
                            </>
                        )}
                    </div>

                </div>

                {/* Botões de ação */}
                <div className={styles.btn_final}>
                    {editando ? (
                        <>
                            <button className={styles.button} onClick={save}><Check /></button>
                            <button className={styles.button} onClick={cancel}><XIcon /></button>
                        </>
                    ) : (
                        <button className={styles.button} onClick={edit}><Pencil /></button>
                    )}
                </div>
            </div>
        </Container>
    );
}
