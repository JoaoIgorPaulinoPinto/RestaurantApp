'use client'
import { Check, Pencil } from 'lucide-react'
import styles from './perfil.module.css'
import Container from '/src/Components/Container/Container'
import { useState } from 'react';

export default function Perfil() {
    const [editando, setEditando] = useState(false);
    const [nome, setNome] = useState('');
    const [numero, setNumero] = useState('');
    const [endereco, setEndereco] = useState('');

    return <>
        <Container>
            <div className={styles.userDataContainer}>
                {editando ? (
                    <>
                        <div className={styles.userDataInfo}>
                            <span>Nome:</span>
                            <input onChange={(e) => setNome(e.target.value)}
                                type="Text"
                                value={nome}>
                            </input>
                        </div>

                        <div className={styles.userDataInfo}>
                            <span>Numero:</span>
                            <input onChange={(e) => setNumero(e.target.value)}
                                type="Text"
                                value={numero}>
                            </input>
                        </div>

                        <div className={styles.userDataInfo}>
                            <span>Endereço:</span>
                            <input onChange={(e) => setEndereco(e.target.value)}
                                type="Text"
                                value={endereco}>
                            </input>
                        </div>
                        <button className={styles.button} onClick={() => { setEditando(false) }}><Check /></button>
                    </>
                ) : (
                    <>
                        <div className={styles.userDataInfo}>
                            <span>Nome:</span><span>{nome}</span>
                        </div>

                        <div className={styles.userDataInfo}>
                            <span>Numero:</span><span>{numero}</span>
                        </div>

                        <div className={styles.userDataInfo}>
                            <span>Endereço:</span><span>{endereco}</span>
                        </div>
                        <button className={styles.button} onClick={() => { setEditando(true) }}><Pencil /></button>
                    </>
                )}
            </div>
        </Container >
    </>
}