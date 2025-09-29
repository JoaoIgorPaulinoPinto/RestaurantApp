import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "./endereco-form.module.css";

interface Props {
    setEnderecoSelecionado: (e: Endereco) => void;
}

import { Endereco, Endereco as EnderecoForm } from "/src/Models/Endereco";
const enderecoSchema = yup.object({
    numero: yup
        .number()
        .typeError("Esse campo deve conter um número")
        .positive("Esse número não pode ser negativo ou zero")
        .required("Número é obrigatório"),
    rua: yup.string().required("Rua é obrigatória"),
    bairro: yup.string().required("Bairro é obrigatório"),
    cidade: yup.string().required("Cidade é obrigatória"),
    estado: yup.string().required("Estado é obrigatório"),
});


//formulário para adicionar novo endereço ao perfil do usuário  
export default function FormEndereco({
    setEnderecoSelecionado,
}: Props) {
    //react hook form
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset, // adiciona reset
    } = useForm<EnderecoForm>({
        resolver: yupResolver(enderecoSchema),
    });

    function salvarEndereco(data: Endereco) {
        const novo: Endereco = {
            rua: data.rua,
            numero: Number(data.numero),
            bairro: data.bairro,
            cidade: data.cidade,
            estado: data.estado,
        };
        const perfildata = localStorage.getItem("perfilUsuario") || "{}";
        const enderecos = localStorage.getItem("perfilUsuario") ? JSON.parse(perfildata).endereco : [];

        // Adiciona o novo endereço ao array existente
        const novosEnderecos = [...enderecos, novo];

        setEnderecoSelecionado(novo); // define como selecionado

        // Atualiza localStorage sem remover os endereços existentes
        const perfilUsuarioStr = localStorage.getItem("perfilUsuario");
        const perfilUsuario = perfilUsuarioStr ? JSON.parse(perfilUsuarioStr) : {};

        const userData = {
            ...perfilUsuario,
            endereco: [...novosEnderecos], // mantém todos
        };

        localStorage.setItem("perfilUsuario", JSON.stringify(userData));

        // Limpa apenas os campos do formulário
        reset();
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit(salvarEndereco)}>
            <div className={styles.campo}>
                <label htmlFor="rua">Logradouro *</label>
                <input
                    id="rua"
                    placeholder="Rua..."
                    {...register("rua")}
                />
                <p className={styles.error}>{errors.rua?.message}</p>
            </div>

            <div className={styles.campo}>
                <label htmlFor="numero">Número *</label>
                <input
                    id="numero"
                    type="number"
                    placeholder="Número..."
                    {...register("numero")}
                />
                <p className={styles.error}>{errors.numero?.message}</p>
            </div>

            <div className={styles.campo}>
                <label htmlFor="bairro">Bairro *</label>
                <input
                    id="bairro"
                    placeholder="Bairro..."
                    {...register("bairro")}
                />
                <p className={styles.error}>{errors.bairro?.message}</p>
            </div>

            <div className={styles.campo}>
                <label htmlFor="cidade">Cidade *</label>
                <input
                    id="cidade"
                    placeholder="Cidade..."
                    {...register("cidade")}
                />
                <p className={styles.error}>{errors.cidade?.message}</p>
            </div>

            <div className={styles.campo}>
                <label htmlFor="estado">Estado *</label>
                <select className={styles.dropdown}
                    id="estado"
                    {...register("estado")}
                >
                    <option value="SP">SP</option>
                    <option value="AC">AC</option>
                    <option value="AL">AL</option>
                    <option value="AP">AP</option>
                    <option value="AM">AM</option>
                    <option value="BA">BA</option>
                    <option value="CE">CE</option>
                    <option value="DF">DF</option>
                    <option value="ES">ES</option>
                    <option value="GO">GO</option>
                    <option value="MA">MA</option>
                    <option value="MT">MT</option>
                    <option value="MS">MS</option>
                    <option value="MG">MG</option>
                    <option value="PA">PA</option>
                    <option value="PB">PB</option>
                    <option value="PR">PR</option>
                    <option value="PE">PE</option>
                    <option value="PI">PI</option>
                    <option value="RJ">RJ</option>
                    <option value="RN">RN</option>
                    <option value="RS">RS</option>
                    <option value="RO">RO</option>
                    <option value="RR">RR</option>
                    <option value="SC">SC</option>
                    <option value="SE">SE</option>
                    <option value="TO">TO</option>
                </select>
                <p className={styles.error}>{errors.estado?.message}</p>
            </div>

            <button type="submit">
                Salvar
            </button>
        </form>
    );
}
