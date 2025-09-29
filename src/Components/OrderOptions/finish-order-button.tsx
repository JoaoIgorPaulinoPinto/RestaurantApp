'use client'
import { ShoppingCart } from 'lucide-react';
import styles from './finish-order-button.module.css';
import { useRouter } from 'next/navigation';

interface FinishOrderButtonProps {
    onClick?: () => void;
}
//botão flutuante para finalizar o pedido e ir para a página de confirmação
export default function FinishOrderButton({ onClick }: FinishOrderButtonProps) {
    const router = useRouter();

    const handleClick = () => {
        if (onClick) onClick();
        router.push('/pedido');
    }

    return (
        <button className={styles.container} onClick={handleClick}>
            <ShoppingCart color='white' className={styles.ShoppingCart} />
        </button>
    );
}
