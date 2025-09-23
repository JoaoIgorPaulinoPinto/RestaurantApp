import { useEffect, useState } from 'react';
import Container from '../../Container/Container';
import styles from './OrderOptionsSetting.module.css'
import EnderecoDropdown from '../../Perfil/EnderecoDropdown/EnderecoDropdown';
import { Endereco } from '../../../Models/Endereco';

interface FinishOrderOptionsSettingProps {
    isEntrega: boolean;
    setIsEntrega: React.Dispatch<React.SetStateAction<boolean>>;
    metodoPagamento: string;
    setMetodoPagamento: React.Dispatch<React.SetStateAction<string>>;
    setEndereco: React.Dispatch<React.SetStateAction<string>>;
}

export default function FinishOrderOptionsSetting(props: FinishOrderOptionsSettingProps) {
    const [meuEndereco, setMeuEndereco] = useState(false);
    const [addEndereco, setaddEndereco] = useState(true);
    const [enderecos, setEnderecos] = useState<string[]>([]); // lista de endereços extras
    const [enderecoSelecionado, setEnderecoSelecionado] = useState(''); // endereço selecionado pelo dropdown
    const [enderecoPerfil, setEnderecoPerfil] = useState<Endereco | undefined>();
    useEffect(() => {
        const savedData = localStorage.getItem('perfilUsuario');
        if (savedData) {
            const perfil = JSON.parse(savedData);
            if (perfil.endereco) {
                props.setEndereco(perfil.endereco);
                setEnderecoPerfil(perfil.enderecoSelecionado);
                setMeuEndereco(true); // marca checkbox se há endereço salvo
            } else {
                setMeuEndereco(false); // não marca se não há endereço
            }
        }
    }, []);

    const formattedEndereco = enderecoPerfil ?
        `${enderecoPerfil.rua}, ${enderecoPerfil.numero} - ${enderecoPerfil.bairro}, ${enderecoPerfil.cidade} - ${enderecoPerfil.estado}`
        : '';

    return (
        <>
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
                        {/* Checkbox Meu Endereço */}
                        <label className={styles.checkboxEndereco}>
                            <input
                                type="checkbox"
                                checked={meuEndereco}
                                onChange={(e) => {
                                    setMeuEndereco(e.target.checked);
                                    if (e.target.checked) {
                                        // usa endereço do perfil
                                        props.setEndereco(enderecoSelecionado);
                                    } else {
                                        // limpa para adicionar outro
                                        props.setEndereco('');
                                    }
                                }}
                            />
                            Meu endereço
                        </label>
                        {
                            meuEndereco ?
                                <label className={styles.meuEnderecoDisplay}>

                                    {formattedEndereco}

                                </label> : ''
                        }

                        {/* Dropdown aparece apenas se "Meu endereço" estiver desmarcado */}
                        {!meuEndereco && (
                            <EnderecoDropdown
                                editing={true}
                                endereco={enderecos}
                                setEndereco={setEnderecos}
                                enderecoSelecionado={enderecoSelecionado}
                                setEnderecoSelecionado={(e) => {
                                    setEnderecoSelecionado(e);
                                    props.setEndereco(e); // atualiza endereço do pedido
                                }}
                            />
                        )}
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
        </>
    );
}
