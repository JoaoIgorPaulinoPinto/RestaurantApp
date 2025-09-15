import styles from './UserInfoField.module.css';

interface Props {
    label: string;
    value: string;
    editing: boolean;
    onChange: (val: string) => void;
}

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
