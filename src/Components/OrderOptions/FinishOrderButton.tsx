'use client'
import styles from './FinishOrderButton.module.css';
import { useRouter } from 'next/navigation';

interface FinishOrderButtonProps {
    onClick?: () => void;
}

export default function FinishOrderButton({ onClick }: FinishOrderButtonProps) {
    const router = useRouter();

    const handleClick = () => {
        if (onClick) onClick();
        router.push('/pedido');
    }

    return (
        <button className={styles.ShoppingCart} onClick={handleClick}>
            Finalizar Pedido
        </button>
    );
}
