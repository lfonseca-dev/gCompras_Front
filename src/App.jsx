import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";
import Layout from "./shared/components/Layout";

import Login from "./features/usuario/pages/Login";
import Cadastro from "./features/usuario/pages/Cadastro";
import Nivel from "./features/nivel_acesso/pages/page";
import Compra from "./features/compra/pages/page";
import NaoAutorizado from "./shared/pages/NaoAutorizado";
import Home from './shared/pages/Home'

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
                            path="/cadastro"
                            element={<Cadastro />}
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