import styles from './FinishOrder.module.css';
import { ReactNode } from 'react';

interface FinishOrderProps {
    total: number;
    children?: ReactNode; // permite colocar elementos dentro
}

export default function FinishOrder({ total, children }: FinishOrderProps) {
    return (
        <div className={styles.actions}>
            <span className={styles.totalPreco}>R${total.toFixed(2)}</span>
            {children} {/* Aqui fica o botão ou outros elementos */}
        </div>
    );
}

