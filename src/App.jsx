import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";
import Layout from "./shared/components/Layout";
import Login from "./features/usuario/pages/Login";
import NaoAutorizado from "./shared/pages/NaoAutorizado";
import Cadastro from "./features/usuario/pages/Cadastro";
import Nivel from "./features/nivel_acesso/pages/page";
import Compra from "./features/compra/pages/page";

export default function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route>
                        <Route path="/login" element={<Login />} />
                        <Route path="/cadastro" element={<Cadastro />} />
                        <Route path="/nivel" element={<Nivel />}/>
                        <Route path="/compra" element={<Compra />}/>
                    </Route>
{/* 
                    <Route element={<ProtectedRoute />}>
                        <Route element={<Layout />}>
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/compras" element={<Compras />} />
                        </Route>
                    </Route>

                    <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
                        <Route element={<Layout />}>
                            <Route path="/usuarios" element={<Usuarios />} />
                            <Route path="/fornecedores" element={<Fornecedores />} />
                        </Route>
                    </Route> */}

                    <Route path="/nao-autorizado" element={<NaoAutorizado />} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}