import styles from './user-input-field.module.css';

interface Props {
    label: string;
    value: string;
    editing: boolean;
    onChange: (val: string) => void;
}

//componente que exibe um campo de informação do usuário, podendo ser editável
export default function UserInfoField({ label, value, editing, onChange }: Props) {
    return (
        <div className={styles.userDataInfo}>
            <span>{label}:</span>
            {editing ? (
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                />
            ) : (
                <span>{value}</span>
            )}
        </div>
    );
}
