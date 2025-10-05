import { ReactNode } from "react";
import styles from "./Container.module.css";

interface ContainerProps {
  children: ReactNode;
}

//componente container para envolver outros componentes e aplicar estilos de layout
export default function Container({ children }: ContainerProps) {
  return <div className={styles.container}>{children}</div>;
}
