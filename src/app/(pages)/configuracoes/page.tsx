'use client';
import { useEffect, useState } from 'react';
import styles from './perfil.module.css';
import Container from '../../../Components/Container/container';

export default function Perfil() {
    const [temaClaro, setTemaClaro] = useState(true);
    const [notificacoesLigadas, setNotificacoesLigadas] = useState(true);

    useEffect(() => {
        document.body.dataset.theme = temaClaro ? 'light' : 'dark';
    }, [temaClaro]);

    return (
        <Container>
            <div>
                <div className={styles.config}>
                    <span>Tema: {temaClaro ? 'Claro' : 'Escuro'}</span>
                    <label className={styles.toggle}>
                        <input
                            type="checkbox"
                            checked={temaClaro}
                            onChange={() => setTemaClaro(!temaClaro)}
                        />
                        <span className={styles.slider}></span>
                    </label>
                </div>

                <div className={styles.config}>
                    <span>Notificações: {notificacoesLigadas ? 'Ligadas' : 'Desligadas'}</span>
                    <label className={styles.toggle}>
                        <input
                            type="checkbox"
                            checked={notificacoesLigadas}
                            onChange={() => setNotificacoesLigadas(!notificacoesLigadas)}
                        />
                        <span className={styles.slider}></span>
                    </label>
                </div>
            </div>
        </Container>
    );
}
