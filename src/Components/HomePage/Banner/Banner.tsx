import styles from './Banner.module.css'
import Image from 'next/image';
import { Open_Sans } from 'next/font/google';

const opensans = Open_Sans({ subsets: ['latin'] });

export default function Banner() {
    return (
        <div className={`${styles.bannerContainer} ${opensans.className}`}>
            <Image
                src="/Brown and Cream Modern Restaurant Presentation.png"
                alt="banner"
                fill
                style={{ objectFit: "cover" }}
            />
        </div>
    )
}