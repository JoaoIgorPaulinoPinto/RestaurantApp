
import { ShoppingCart } from 'lucide-react';
import styles from './FinishOrder.module.css';
export default function FinishOrder() {
    return (
        <>
            <div className={styles.actions}>
                <ShoppingCart size={40} className={styles.ShoppingCart} />
                <span className={styles.totalPreco}>R$300,00</span>
            </div>
        </>
    );
}
