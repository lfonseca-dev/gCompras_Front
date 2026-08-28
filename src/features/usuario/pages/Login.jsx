import { useState } from "react";
import { useUsuario } from "../hooks/usuario.js";
import Input from "../../../shared/components/Input.jsx";
import PasswordInput from "../../../shared/components/InputPass.jsx";
import SubmitButton from "../../../shared/components/SubmitButton.jsx";

function Login() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const { login, loading, error } = useUsuario();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, senha);
        } catch {

        }
    };

    return (
        <div className="w-full h-screen flex items-center justify-center bg-slate-950 p-4">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md w-full">
                <h2 className="text-2xl font-bold text-white text-center">
                    LOGIN
                </h2>

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

                {error && (
                    <span className="text-sm text-red-500 text-center">
                        E-mail ou senha inválidos
                    </span>
                )}

                <SubmitButton loading={loading}>
                    Login
                </SubmitButton>
            </form>
        </div>
    );
}

export default Login;