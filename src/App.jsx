import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";
import Layout from "./shared/components/Layout";

import Login from "./features/usuario/pages/Login";
import NaoAutorizado from "./shared/pages/NaoAutorizado";

import Home from './shared/pages/Home'
import Compra from "./features/compra/pages/page";
import Historico from "./features/historico/pages/page";
import Produto from "./features/produto/pages/page"; 
import Empresa from "./features/empresa/pages/page";
import Fornecedor from "./features/fornecedor/pages/page";
import Nivel from "./features/nivel_acesso/pages/page";
import Status from "./features/status/pages/page";
import Regime from "./features/regimeT/pages/page";
import Cadastro from "./features/usuario/pages/Cadastro";

function AppRoutes() {

    return (
        <>
            <Routes>

                {/* ROTAS PÚBLICAS */}
                <Route element={<PublicRoute />}>
                    <Route path="/login" element={<Login />} />
                </Route>


                {/* ROTAS PROTEGIDAS */}
                <Route element={<ProtectedRoute />}>
                    <Route element={<Layout />}>

                        <Route
                            path="/"
                            element={<Home />}
                        />

                        <Route
                            path="/nivel"
                            element={<Nivel />}
                        />

                        <Route
                            path="/compra"
                            element={<Compra />}
                        />

                        <Route
                            path="/historico"
                            element={<Historico />}
                        />

                        <Route
                            path="/cadastro"
                            element={<Cadastro />}
                        />

                        <Route
                            path="/produto"
                            element={<Produto />}
                        />

                        <Route
                            path="/fornecedor"
                            element={<Fornecedor />}
                        />

                        <Route
                            path="/empresa"
                            element={<Empresa />}
                        />

                        <Route
                            path="/regime"
                            element={<Regime />}
                        />

                        <Route
                            path="/status"
                            element={<Status />}
                        />
                    </Route>
                </Route>


                {/* NÃO AUTORIZADO */}
                <Route
                    path="/nao-autorizado"
                    element={<NaoAutorizado />}
                />

            </Routes>
        </>
    );
}

export default function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <AppRoutes />
            </AuthProvider>
        </BrowserRouter>
    );
}