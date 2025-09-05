'use client';
import { Menu, Settings, UserRound } from 'lucide-react';
import styles from './Header.module.css';
import { Noto_Serif } from 'next/font/google';
import { useState, useEffect } from 'react';

const notoserif = Noto_Serif({ subsets: ['latin'], weight: '400' });

export default function Header() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 640);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <div className={styles.header}>
            <span className={`${notoserif.className} ${styles.title}`}>Mata Fome</span>

            <div className={styles.rightSide}>
                <button className={styles.settings}>
                    <Settings size={isMobile ? 20 : 35} />
                </button>
                <button className={styles.user}>
                    <UserRound size={isMobile ? 20 : 35} />
                </button>
            </div>
        </div>
    );
}
