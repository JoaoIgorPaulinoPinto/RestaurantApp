import { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp, Forward, Plus, X as XIcon } from 'lucide-react';

import styles from './EnderecoDropown.module.css'

interface Props {
    editing: boolean;
    endereco: string[];
    setEndereco: (e: string[]) => void;
    enderecoSelecionado: string;
    setEnderecoSelecionado: (e: string) => void;
}

export default function EnderecoDropdown({
    editing,
    endereco,
    setEndereco,
    enderecoSelecionado,
    setEnderecoSelecionado
}: Props) {
    const [novoEndereco, setNovoEndereco] = useState('');
    const [adicionando, setAdicionando] = useState(false);
    const [dropdownAberto, setDropdownAberto] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (adicionando && inputRef.current) inputRef.current.focus();
    }, [adicionando]);

    const addEndereco = () => {
        if (novoEndereco.trim() === '') return;
        const novosEnderecos = [...endereco, novoEndereco];
        setEndereco(novosEnderecos);
        setEnderecoSelecionado(novoEndereco);
        setNovoEndereco('');
        setAdicionando(false);

        const savedData = JSON.parse(localStorage.getItem('perfilUsuario') || '{}');
        savedData.endereco = novosEnderecos;
        savedData.enderecoSelecionado = novoEndereco;
        localStorage.setItem('perfilUsuario', JSON.stringify(savedData));
    };

    const deleteEndereco = (item: string) => {
        setEndereco(endereco.filter((e) => e !== item));
        if (enderecoSelecionado === item) setEnderecoSelecionado('');
    };

    useEffect(() => {
        if (!editing && novoEndereco.trim().length > 0) {
            addEndereco();
        }
    }, [editing]);
    return (
        <div className={styles.enderecoContainer}>
            <span>Novo Endereço:</span>
            <div className={styles.enderecoInputWrapper}>
                {!adicionando && (
                    <>
                        <div className={styles.customDropdown}>
                            <div
                                className={styles.customDropdownSelected}
                                onClick={() => setDropdownAberto(!dropdownAberto)}
                            >
                                <span>{enderecoSelecionado || 'Selecione...'}</span>
                                {dropdownAberto ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                            </div>

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
                                            {editing && (
                                                <button
                                                    type="button"
                                                    className={styles.deleteButton}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        deleteEndereco(item);
                                                    }}
                                                >
                                                    <XIcon size={14} />
                                                </button>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        {editing && (
                            <button
                                type="button"
                                className={styles.btn_adicionarEndereco}
                                onClick={() => setAdicionando(true)}
                            >
                                <Plus size={14} />
                            </button>
                        )}
                    </>
                )}

                {adicionando && editing && (
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
                            <Forward size={14} />
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}
