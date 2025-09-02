import { Menu } from 'lucide-react';
import styles from './Header.module.css';
const notoserif = Noto_Serif({ subsets: ['latin'], weight: '400' });
import { Noto_Serif } from 'next/font/google';
export default function Header() {
    return (
        <div className={styles.header}>
            <span className={`${notoserif.className} ${styles.title}`}>Mata Fome</span>

            <div>
                <button className={styles.toggleOptions}> <Menu size={40} color="#000" /></button>
            </div>
        </div >
    );
}