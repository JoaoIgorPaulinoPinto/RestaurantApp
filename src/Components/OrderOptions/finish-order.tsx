import styles from './finish-order.module.css';
import { ReactNode, useEffect, useState } from 'react';

interface FinishOrderProps {
    total: number;
    children?: ReactNode; // permite colocar elementos dentro
}

//componente que exibe o total do pedido e um botão para finalizar a compra
export default function FinishOrder({ total, children }: FinishOrderProps) {
    const [t, setTotal] = useState(total);
    useEffect(() => {
        setTotal(total)
    }, [total]);
    return (
        <div className={styles.actions}>
            <span className={styles.totalPreco}>R${t.toFixed(2)}</span>
            {children} {/* Aqui fica o botão ou outros elementos */}
        </div>
    );
}

