import styles from './perfil.module.css'
import Container from '/src/Components/Container/Container'

export default function perfil() {
    return <>
        <Container>
            <div>
                <div className={styles.config}>
                    <span>Tema: Claro</span>
                    <label className={styles.toggle}>
                        <input type="checkbox" />
                        <span className={styles.slider}></span>
                    </label>
                </div>

                <div className={styles.config}>
                    <span>
                        Notificações: Ligadas
                    </span>
                    <label className={styles.toggle}>
                        <input type="checkbox" />
                        <span className={styles.slider}></span>
                    </label>
                </div>
            </div>
        </Container>
    </>
}