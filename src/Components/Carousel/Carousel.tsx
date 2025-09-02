'use client'
import { ReactNode } from 'react';
import styles from './Carousel.module.css';

interface CarouselProps {
    children: ReactNode[];
}

export default function Carousel({ children }: CarouselProps) {
    return (
        <div className={styles.carouselWrapper}>
            <div className={styles.carousel}>
                {children.map((child, i) => (
                    <div className={styles.carouselItem} key={i}>
                        {child}
                    </div>
                ))}
            </div>
        </div>
    );
}
