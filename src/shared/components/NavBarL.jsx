import {
  FaHome, FaUser, FaShoppingCart, FaSignOutAlt, FaChartBar,
  FaCheckCircle, FaBalanceScale, FaBoxes, FaBriefcase, FaTruck,
  FaHistory, FaBars, FaTimes
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import logo from "../../shared/assets/logo.png";

const adminLinks = [
  { href: "/", label: "Dashboard", icon: FaHome },
  { href: "/compra", label: "Compras", icon: FaShoppingCart },
  { href: "/historico", label: "Histórico", icon: FaHistory },
  { href: "/produto", label: "Produtos", icon: FaBoxes },
  { href: "/fornecedor", label: "Fornecedores", icon: FaTruck },
  { href: "/empresa", label: "Empresas", icon: FaBriefcase },
  { href: "/usuario", label: "Usuários", icon: FaUser },
  { href: "/nivel", label: "Níveis de acesso", icon: FaChartBar },
  { href: "/status", label: "Status de compra", icon: FaCheckCircle },
  { href: "/regime", label: "Regime tributário", icon: FaBalanceScale },
  { href: "/cadastro", label: "Cadastro de usuário", icon: FaUser },
];

const gestorLinks = [
  { href: "/", label: "Dashboard", icon: FaHome },
  { href: "/compra", label: "Compras", icon: FaShoppingCart },
  { href: "/historico", label: "Histórico", icon: FaHistory },
  { href: "/produto", label: "Produtos", icon: FaBoxes },
  { href: "/fornecedor", label: "Fornecedores", icon: FaTruck },
];

const userLinks = [
  { href: "/", label: "Dashboard", icon: FaHome },
  { href: "/compra", label: "Compras", icon: FaShoppingCart },
  { href: "/historico", label: "Histórico", icon: FaHistory },
  { href: "/produto", label: "Produtos", icon: FaBoxes },
  { href: "/fornecedor", label: "Fornecedores", icon: FaTruck },
];

export default function NavBar() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const items = user?.nivel_acesso === 1 ? adminLinks : user?.nivel_acesso === 2 ? gestorLinks : userLinks;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed left-4 top-4 z-40 rounded-lg bg-[#2C2426] p-3 text-white shadow-lg lg:hidden"
        aria-label="Abrir menu"
      >
        <FaBars />
      </button>

      {open && <button aria-label="Fechar menu" className="fixed inset-0 z-40 bg-black/40 lg:hidden" onClick={() => setOpen(false)} />}

      <aside className={`fixed left-0 top-0 z-50 flex h-screen w-64 flex-col bg-amber-200 text-black shadow-xl transition-transform duration-200 ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        <div className="flex h-20 items-center justify-between border-b border-black/10 px-5">
          <div className="flex items-center gap-3">
            <img src={logo} alt="FAULIM" className="h-12 w-20 object-contain" />
            <div>
              <div className="text-sm font-bold tracking-wide">FAULIM</div>
              <div className="text-[10px] uppercase tracking-[.18em] text-black/50">Sistema de compras</div>
            </div>
          </div>
          <button className="lg:hidden text-black/60 hover:text-black" onClick={() => setOpen(false)} aria-label="Fechar"><FaTimes /></button>
        </div>

        <div className="border-b border-white/10 px-5 py-4">
          <p className="truncate text-sm font-semibold">{user?.nome || "Usuário"}</p>
          <p className="truncate text-xs text-gray-800/50">{user?.email || ""}</p>
          <span className="mt-2 inline-flex rounded-full bg-[#FF0029]/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#FF5A76]">
            {user?.nivel_acesso === 1 ? "Administrador" : "Usuário"}
          </span>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <p className="px-3 pb-2 text-[10px] font-bold uppercase tracking-[.18em] text-black">Menu</p>
          <div className="space-y-1">
            {items.map(({ href, label, icon: Icon }) => (
              <NavLink
                key={href}
                to={href}
                onClick={() => setOpen(false)}
                end={href === "/"}
                className={({ isActive }) => `group flex items-center gap-3 rounded-lg border-l-2 px-3 py-2.5 text-sm font-medium transition ${isActive ? "border-[#FF0029] bg-black/10 text-" : "border-transparent text-black/70 hover:bg-white/20 hover:text-black"}`}
              >
                {({ isActive }) => <><Icon className={isActive ? "text-[#FF0029]" : "text-black/35 group-hover:text-black/60"} />{label}</>}
              </NavLink>
            ))}
          </div>
        </nav>

        <div className="border-t border-white/10 p-3">
          <button type="button" onClick={logout} className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-black transition hover:bg-red-600 hover:text-white">
            <FaSignOutAlt /> Sair
          </button>
        </div>
      </aside>
    </>
  );
}
