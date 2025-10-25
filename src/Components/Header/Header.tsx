"use client";
import { ChevronLeft, Settings } from "lucide-react";
import { Dancing_Script } from "next/font/google";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Perfil from "../PerfilButton/perfil-dropdown";
import styles from "./Header.module.css";

const notoserif = Dancing_Script({ subsets: ["latin"], weight: "400" });

//componente de cabeçalho fixo no topo da página com navegação
export default function Header() {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const getRout = (rota: string) => {
    router.push(rota);
  };
  const backRout = () => {
    router.back();
  };

  return (
    <>
      <div className={styles.header}>
        {pathname != "/" && (
          <span
            onClick={() => {
              backRout();
            }}
          >
            {" "}
            <ChevronLeft />{" "}
          </span>
        )}

        <div className={styles.header}>
          <button
            className={styles.settings}
            onClick={() => {
              getRout("/configuracoes");
            }}
          >
            <Settings size={isMobile ? 20 : 35} />
          </button>
          <span
            onClick={() => {
              getRout("/");
            }}
            className={`${notoserif.className} ${styles.title}`}
          >
            Mata Fome
          </span>
          <Perfil />
        </div>
      </div>
    </>
  );
}
