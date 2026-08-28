import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUsuario } from "../hooks/usuario.js";
import Input from "../../../shared/components/Input";
import PasswordInput from "../../../shared/components/InputPass";
import Select from "../../../shared/components/Select";
import SubmitButton from "../../../shared/components/SubmitButton";

export default function Cadastro() {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [nivelAcesso, setNivelAcesso] = useState("");
    const [empresa, setEmpresa] = useState("");

    const { criarUsuario, loading, error } = useUsuario();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await criarUsuario(nome, email, senha, nivelAcesso, empresa);
            navigate("/login");
        } catch {
            // erro já disponível em `error`, exibido abaixo
        }
    };

    return (
        <div className="w-full h-screen flex items-center justify-center bg-slate-950 p-4">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md w-full">
                <h2 className="text-2xl font-bold text-white text-center">
                    CADASTRO
                </h2>

                <Input
                    placeholder="Nome"
                    label="Nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                />

                <Input
                    placeholder="Email"
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <PasswordInput
                    placeholder="Senha"
                    label="Senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    required
                />

                <Select
                    placeholder="Selecione"
                    label="Nível de Acesso"
                    value={nivelAcesso}
                    onChange={(e) => setNivelAcesso(e.target.value)}
                    options={[
                        { value: 1, label: "Administrador" },
                        { value: 2, label: "Gestor" },
                        { value: 3, label: "Usuário" },
                    ]}
                    required
                />

                <Select
                    placeholder="Selecione"
                    label="Empresa"
                    value={empresa}
                    onChange={(e) => setEmpresa(e.target.value)}
                    options={[{ value: 1, label: "Empresa 1" }]}
                    required
                />

                {error && (
                    <span className="text-sm text-red-500 text-center">
                        Não foi possível concluir o cadastro. Verifique os dados e tente novamente.
                    </span>
                )}

                <SubmitButton loading={loading}>
                    Cadastrar
                </SubmitButton>
            </form>
        </div>
    );
}