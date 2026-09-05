import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserPlus } from "react-icons/fa";
import { useUsuario } from "../hooks/usuario.js";
import Input from "../../../shared/components/Input";
import PasswordInput from "../../../shared/components/InputPass";
import Select from "../../../shared/components/Select";
import SubmitButton from "../../../shared/components/SubmitButton";
import PageLayout from "../../../shared/components/PageLayout";
import PageCard from "../../../shared/components/PageCard";

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
            // erro já disponível em `error`
        }
    };

    return (
        <PageLayout
            title="Cadastro de Usuário"
            subtitle="Cadastre um novo usuário no sistema com permissões e associação de empresa."
            icon={FaUserPlus}
            maxWidth="max-w-2xl"
        >
            <PageCard>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <Input
                        placeholder="Nome completo"
                        label="Nome"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required
                    />

                    <Input
                        placeholder="exemplo@faulim.com.br"
                        label="E-mail"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <PasswordInput
                        placeholder="Sua senha de acesso"
                        label="Senha"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        required
                    />

                    <Select
                        placeholder="Selecione o nível"
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
                        placeholder="Selecione a empresa"
                        label="Empresa"
                        value={empresa}
                        onChange={(e) => setEmpresa(e.target.value)}
                        options={[{ value: 1, label: "Empresa 1" }]}
                        required
                    />

                    {error && (
                        <div className="rounded-lg bg-red-50 p-3 text-center text-sm text-red-600 border border-red-200">
                            Não foi possível concluir o cadastro. Verifique os dados e tente novamente.
                        </div>
                    )}

                    <div className="mt-2">
                        <SubmitButton loading={loading}>
                            Cadastrar Usuário
                        </SubmitButton>
                    </div>
                </form>
            </PageCard>
        </PageLayout>
    );
}