import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext.jsx"
import usuarioService from "../service/usuario.js";

export function useUsuario() {
    const [usuario, setUsuario] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { login: setAuthUser } = useAuth();

    const login = async (email, senha) => {
        try {
            setLoading(true);
            setError(null);

            const response = await usuarioService.login({ email, senha });
            setUsuario(response.data);
            setAuthUser(response.data.data, response.data);

            navigate("/");

            return response;
        } catch (error) {
            console.error("Erro ao fazer login:", error);
            setError(error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const criarUsuario = async (nome, email, senha, nivel_acesso_id, empresa_id) => {
        try {
            setLoading(true);
            setError(null);

            const response = await usuarioService.criar({ nome, email, senha, nivel_acesso_id, empresa_id });

            return response;
        } catch (error) {
            console.error("Erro ao criar usuário:", error);
            setError(error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return {
        usuario,
        loading,
        error,
        login,
        criarUsuario
    };
}