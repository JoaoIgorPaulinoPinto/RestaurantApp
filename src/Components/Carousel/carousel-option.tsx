import { ReactNode } from 'react';
import styles from './carousel-option.module.css';

interface CarouselOptionProps {
    children: ReactNode;
    selected: boolean;
    onClick?: () => void; // opcional: ação ao clicar no ícone
}

//opção individual do carrossel
export default function CarouselOption({ selected, children, onClick }: CarouselOptionProps) {
    return (
        <div className={selected ? styles.selectedCarouselOption : styles.carouselOption} onClick={onClick} >
            {children}
        </div >
    );
}
