import { Outlet } from "react-router-dom";
import NavBar from "./NavBarL";
import { useAuth } from "../../context/AuthContext";

export default function Layout() {
    const { user } = useAuth();

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            <NavBar admin={user?.nivel_acesso === 1} />
            <main className="min-h-screen ml-0 lg:ml-64 pt-16 lg:pt-0 transition-all duration-200">
                <Outlet />
            </main>
        </div>
    );
}