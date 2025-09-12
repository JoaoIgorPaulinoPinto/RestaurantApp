import styles from './Sumary.module.css'

interface values {
    total: number;
    frete: number;
}

export default function Sumary(props: values) {
    return (
        <div className={styles.summary}>
            <span>Frete: <strong>R${(props.frete + 4).toFixed(2)}</strong></span>
            <span>Total: <strong>R${(props.total + 4).toFixed(2)}</strong></span>
        </div>
    )
}