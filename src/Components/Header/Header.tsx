'use client';
import { ChevronLeft, Settings, UserRound } from 'lucide-react';
import styles from './Header.module.css';
import { Noto_Serif } from 'next/font/google';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';


const notoserif = Noto_Serif({ subsets: ['latin'], weight: '400' });

export default function Header() {
    const pathname = usePathname();
    const [isMobile, setIsMobile] = useState(false);
    const router = useRouter();
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 640);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const getRout = (rota: string) => {
        router.push(rota);
    }
    const backRout = () => {
        router.back();
    }

    return (
        <>
            <div className={styles.header}>

                <div className={styles.leftSide}>
                    {pathname != '/' &&
                        <span onClick={() => { backRout() }}>  <ChevronLeft /> </span>
                    }
                    <span onClick={() => { getRout('/') }} className={`${notoserif.className} ${styles.title}`} >Mata Fome</span>
                </div>
                <div className={styles.rightSide}>
                    <button className={styles.settings}
                        onClick={() => { getRout('/configuracoes') }}
                    >
                        <Settings size={isMobile ? 20 : 35} />
                    </button>
                    <button
                        onClick={() => { getRout('/perfil') }}
                        className={styles.user}>
                        <UserRound size={isMobile ? 20 : 35} />
                    </button>
                </div>
            </div >

        </>
    );
}
