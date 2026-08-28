import { Outlet } from "react-router-dom";
import NavBar from "./navBar";
import { useAuth } from "../../context/AuthContext";

export default function Layout() {
    const { user } = useAuth();

    return (
        <div className="flex">
            <NavBar admin={user?.nivel_acesso === 1} />
            <main className="flex-1 ml-60 min-h-screen bg-slate-950">
                <Outlet />
            </main>
        </div>
    );
}