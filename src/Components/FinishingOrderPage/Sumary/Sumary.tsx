import Container from '../../Container/Container';
import styles from './Sumary.module.css'

interface values {
    total: number;
    frete: number;
}

export default function Sumary(props: values) {
    return (
        <Container>
            <div className={styles.summary}>
                <span>Frete: R${(props.frete + 4).toFixed(2)}</span>
                <span>Total: R${(props.total + 4).toFixed(2)}</span>
            </div>
        </Container>

    )
}