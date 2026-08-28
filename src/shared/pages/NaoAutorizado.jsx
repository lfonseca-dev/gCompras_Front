import { Link, useNavigate } from "react-router-dom";
import { FaLock } from "react-icons/fa";

export default function NaoAutorizado() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-900 px-6">
            <div className="max-w-sm w-full text-center">
                <div className="w-14 h-14 rounded-full bg-blue-600/10 border border-blue-600/20
                                 flex items-center justify-center mx-auto mb-6">
                    <FaLock className="text-blue-600 text-xl" />
                </div>

                <h1 className="text-slate-100 text-lg font-bold mb-2">
                    Acesso não autorizado
                </h1>
                <p className="text-slate-400 text-sm leading-relaxed mb-8">
                    Você não tem permissão para acessar esta página. Se acha que
                    isso é um engano, fale com um administrador do sistema.
                </p>

                <div className="flex items-center justify-center gap-3">
                    <button
                        onClick={() => navigate(-1)}
                        className="px-4 py-2.5 rounded-md text-sm font-medium
                                   text-slate-400 border border-slate-800
                                   hover:bg-slate-800 hover:text-slate-100
                                   transition-colors duration-150"
                    >
                        Voltar
                    </button>
                    <Link
                        to="/dashboard"
                        className="px-4 py-2.5 rounded-md text-sm font-medium
                                   bg-blue-600 text-white
                                   hover:bg-blue-700
                                   transition-colors duration-150"
                    >
                        Ir para o Dashboard
                    </Link>
                </div>
            </div>
        </div>
    );
}