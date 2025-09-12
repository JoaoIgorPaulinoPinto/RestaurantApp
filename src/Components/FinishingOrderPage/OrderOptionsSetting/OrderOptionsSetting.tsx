import Container from '../../Container/Container';
import styles from './OrderOptionsSetting.module.css'

interface FinishOrderOptionsSettingProps {
    isEntrega: boolean;
    setIsEntrega: React.Dispatch<React.SetStateAction<boolean>>;
    metodoPagamento: string;
    setMetodoPagamento: React.Dispatch<React.SetStateAction<string>>;
}

export default function FinishOrderOptionsSetting(props: FinishOrderOptionsSettingProps) {
    return (
        <Container>
            <div className={styles.optionColumn}>
                <h3>Entrega / Retirada</h3>
                <label>
                    <input
                        type="radio"
                        name="entrega"
                        value="Retirada"
                        checked={!props.isEntrega}
                        onChange={() => props.setIsEntrega(false)}
                    />
                    Retirada no Local
                </label>
                <label>
                    <input
                        type="radio"
                        name="entrega"
                        value="Entrega"
                        checked={props.isEntrega}
                        onChange={() => props.setIsEntrega(true)}
                    />
                    Entrega
                </label>
                {props.isEntrega && (
                    <>
                        <label className={styles.checkboxEndereco}>
                            <input type="checkbox" /> Meu endereço
                        </label>
                        <label className={styles.buttonEndereco}>
                            <button>Adicionar Endereço</button>
                        </label>
                    </>
                )}
            </div>

            <div className={styles.optionColumn}>
                <h3>Pagamento</h3>
                <label>
                    <input
                        type="radio"
                        name="pagamento"
                        value="pix"
                        checked={props.metodoPagamento === "pix"}
                        onChange={(e) => props.setMetodoPagamento(e.target.value)}
                    />
                    Pix
                </label>
                <label>
                    <input
                        type="radio"
                        name="pagamento"
                        value="dinheiro"
                        checked={props.metodoPagamento === "dinheiro"}
                        onChange={(e) => props.setMetodoPagamento(e.target.value)}
                    />
                    Dinheiro
                </label>
                <label>
                    <input
                        type="radio"
                        name="pagamento"
                        value="cartao"
                        checked={props.metodoPagamento === "cartao"}
                        onChange={(e) => props.setMetodoPagamento(e.target.value)}
                    />
                    Cartão
                </label>
            </div>
        </Container>

    );
}
