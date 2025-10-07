"use client";
import { useEffect } from "react";
import Container from "../../../Components/ContentContainer/Container";
import styles from "./perfil.module.css";
import { usePreferencias } from "/src/store/preferencias";

export default function Perfil() {
  const { temaDark, setTema, notificar, setNotificar } = usePreferencias();
  useEffect(() => {
    document.body.dataset.theme = temaDark ? "dark" : "light";
  }, [temaDark]);

  return (
    <Container>
      <div>
        <div className={styles.config}>
          <span>Tema: {temaDark ? "Escuro" : "Claro"}</span>
          <label className={styles.toggle}>
            <input
              type="checkbox"
              checked={temaDark}
              onChange={() => setTema(!temaDark)}
            />
            <span className={styles.slider}></span>
          </label>
        </div>

        <div className={styles.config}>
          <span>Notificações: {notificar ? "Ligadas" : "Desligadas"}</span>
          <label className={styles.toggle}>
            <input
              type="checkbox"
              checked={notificar}
              onChange={() => setNotificar(!notificar)}
            />
            <span className={styles.slider}></span>
          </label>
        </div>
      </div>
    </Container>
  );
}
