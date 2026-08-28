import { FaHome, FaUser, FaShoppingCart, FaUserTie, FaSignOutAlt } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const links = {
    admin: [
        { href: "/", label: "Home", icon: FaHome },
        { href: "/usuarios", label: "Usuários", icon: FaUser },
        { href: "/compra", label: "Compras", icon: FaShoppingCart },
        { href: "/fornecedores", label: "Fornecedores", icon: FaUserTie },
        { href: "/cadastro", label: "Cadastros", icon: FaUser },
    ],
    gestor: [
        { href: "/", label: "Home", icon: FaHome },
        { href: "/compra", label: "Compras", icon: FaShoppingCart },
        { href: "/fornecedores", label: "Fornecedores", icon: FaUserTie },
    ],
};

export default function NavBar({ admin }) {
    const { pathname } = useLocation();
    const items = admin ? links.admin : links.gestor;

    const { logout } = useAuth();

    return (
        <nav className="fixed left-0 top-0 h-screen w-60 flex flex-col
                         bg-slate-900 border-r border-slate-800">

            <div className="h-16 flex items-center gap-2 px-6 border-b border-slate-800">
                <div className="w-2 h-2 rounded-sm bg-blue-600" />
                <span className="text-sm font-bold text-slate-100">
                    SISTEMA DE COMPRAS
                </span>
            </div>

            <div className="flex-1 flex flex-col gap-1 px-3 py-4">
                {items.map(({ href, label, icon: Icon }) => {
                    const isActive = pathname === href;
                    return (
                        <a
                            key={href}
                            href={href}
                            className={`group flex items-center gap-3 px-3 py-2.5 rounded-md
                                        text-sm font-medium transition-colors duration-150
                                        ${isActive
                                    ? "bg-blue-600/10 text-slate-100 border-l-2 border-blue-600"
                                    : "text-slate-400 border-l-2 border-transparent hover:bg-slate-800 hover:text-slate-100"
                                }`}
                        >
                            <Icon
                                className={`text-[15px] ${isActive ? "text-blue-600" : "text-slate-500 group-hover:text-slate-400"
                                    }`}
                            />
                            {label}
                        </a>
                    );
                })}

                <button type="button" onClick={logout}
                    className="group flex w-full items-center gap-3 rounded-lg border border-transparent px-4 py-3 text-sm font-medium text-slate-400 transition-all duration-200 hover:border-red-500/20 hover:bg-red-500/10 hover:text-red-400 focus:outline-none focus:ring-2 focus:ring-red-500/30" >

                    <span className="text-[15px]" >
                        Sair
                    </span>
                    <FaSignOutAlt
                        className="text-[15px]"
                    />
                </button>

            </div>
        </nav>
    );
}