import { Check, Pencil, X as XIcon } from 'lucide-react';
import styles from './actions-button.module.css';

interface Props {
    editing: boolean;
    onSave: () => void;
    onCancel: () => void;
    onEdit: () => void;
}
//botao para editar e salvar os dados do perfil
export default function ActionButtons({ editing, onSave, onCancel, onEdit }: Props) {
    return (
        <div className={styles.btn_final}>
            {editing ? (
                <>
                    <button className={styles.button} onClick={onSave}><Check /></button>
                    <button className={styles.button} onClick={onCancel}><XIcon /></button>
                </>
            ) : (
                <button className={styles.button} onClick={onEdit}><Pencil /></button>
            )}
        </div>
    );
}
