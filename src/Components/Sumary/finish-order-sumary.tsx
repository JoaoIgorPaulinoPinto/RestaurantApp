import Container from '../Container/container';
import styles from './finish-order-sumary.module.css'

interface values {
    total: number;
    frete: number;
}

//componente que exibe o resumo do pedido com total e frete
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