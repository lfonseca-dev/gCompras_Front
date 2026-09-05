import { useState } from "react";
import { useUsuario } from "../hooks/usuario.js";
import Input from "../../../shared/components/Input.jsx";
import PasswordInput from "../../../shared/components/InputPass.jsx";
import SubmitButton from "../../../shared/components/SubmitButton.jsx";
import logo from "../../../shared/assets/logo.png";

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
    <div className="min-h-screen bg-violet-100 p-4 md:overflow-hidden md:p-0">
      <div className="mx-auto flex min-h-screen max-w-5xl items-center justify-center h-full">
        <div className="grid w-full overflow-hidden rounded-3xl bg-amber-100 shadow-2xl md:grid-cols-2">
          <div className="hidden min-h-[560px] flex-col justify-between bg-[#FF0029] p-10 text-white md:flex">
            <div>
              <img
                src={logo}
                alt="FAULIM"
                className="h-20 w-32 object-contain object-left brightness-0 invert"
              />
              <p className="mt-12 text-xs font-bold uppercase tracking-[.25em] text-white/70">
                Compras
              </p>
              <h1 className="mt-3 text-4xl font-bold leading-tight">
                Gestão de compras FAULIM.
              </h1>
              <p className="mt-5 max-w-sm text-sm leading-6 text-white/80">
                Controle fornecedores, produtos, compras e aprovações.
              </p>
            </div>
            <p className="text-xs text-white/60">Sistema FAULIM</p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex min-h-[560px] flex-col justify-center p-7 sm:p-10"
          >
            <div className="mb-8 ">
              <p className="text-xs font-bold uppercase tracking-[.2em] text-[#FF0029]">
                Bem-vindo
              </p>
              <h2 className="mt-2 text-3xl font-bold text-black">Entrar</h2>
              <p className="mt-1 text-sm text-[#746A6D]">
                Acesse o sistema de compras.
              </p>
            </div>
            <div className="space-y-4">
              <Input
                label="E-mail"
                placeholder="email@gmail.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="!bg-white !text-black !border-[#E7E3E4] focus:!border-[#FF0029]"
              />
              <PasswordInput
                label="Senha"
                placeholder="******"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
                className="!bg-white !text-black !border-[#E7E3E4] focus:!border-[#FF0029]"
              />
              {error && (
                <div className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
                  E-mail ou senha inválidos.
                </div>
              )}
              <SubmitButton
                loading={loading}
                className="!bg-[#FF0029] hover:!bg-[#D90023]"
              >
                Entrar
              </SubmitButton>
            </div>
          </form>
        </div>
      </div>
    </div>
    );
}

export default Login;