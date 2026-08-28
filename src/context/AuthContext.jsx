import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            try {
                const decoded = jwtDecode(token);

                // Verifica se o token está expirado
                if (decoded.exp && decoded.exp * 1000 < Date.now()) {
                    localStorage.removeItem("token");
                    setUser(null);
                    setLoading(false);
                    return;
                }

                setUser({
                    token,
                    id: decoded.sub,
                    email: decoded.email,
                    nome: decoded.nome,
                    empresa: decoded.empresa,
                    nivel_acesso: decoded.nivel_acesso,
                });
            } catch (error) {
                console.error("Token inválido:", error);

                localStorage.removeItem("token");
                setUser(null);
            }
        }

        setLoading(false);
    }, []);

    const login = (token) => {
        try {
            const decoded = jwtDecode(token);

            localStorage.setItem("token", token);

            setUser({
                token,
                id: decoded.sub,
                email: decoded.email,
                nome: decoded.nome,
                empresa: decoded.empresa,
                nivel_acesso: decoded.nivel_acesso,
            });
        } catch (error) {
            console.error("Erro ao fazer login:", error);
            localStorage.removeItem("token");
            setUser(null);
        }
    };

    const logout = () => {
        console.log("Executando logout...");

        localStorage.removeItem("token");
        setUser(null);

        navigate("/login", { replace: true });
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);

    if (!ctx) {
        throw new Error(
            "useAuth deve ser usado dentro de um AuthProvider"
        );
    }

    return ctx;
}
