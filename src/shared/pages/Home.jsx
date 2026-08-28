import { FaShoppingCart, FaUserTie, FaUser, FaArrowRight } from "react-icons/fa";

export default function Home() {
    return (
        <div className="px-8 py-10">
            <div className="text-3xl font-bold text-white mb-8 border-b border-slate-700 pb-4">
                Bem-vindo(a) ao Sistema de Compras
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Card de Boas-Vindas */}
                <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 shadow-md hover:border-blue-500/30 transition-all duration-200">
                    <h2 className="text-2xl font-semibold text-white mb-3">Visão Geral</h2>
                    <p className="text-slate-400 mb-4">
                        Este é o painel principal do sistema de compras, onde você pode gerenciar 
                        usuários, compras e fornecedores de forma eficiente e organizada.
                    </p>
                    <p className="text-slate-500 text-sm">
                        Use o menu lateral para navegar entre as diferentes funcionalidades disponíveis.
                    </p>
                </div>

                {/* Cards de Atalhos */}
                <div className="space-y-4">
                    <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 shadow-sm hover:border-blue-500/30 transition-all duration-200">
                        <div className="flex items-start gap-4">
                            <div className="bg-blue-500/10 p-3 rounded-lg">
                                <FaShoppingCart className="text-blue-400 text-xl" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-white mb-1">Compras</h3>
                                <p className="text-slate-400 text-sm mb-3">
                                    Visualize e gerencie todas as suas compras de forma centralizada.
                                </p>
                                <a 
                                    href="/compra" 
                                    className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium text-sm"
                                >
                                    Ver Compras <FaArrowRight />
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 shadow-sm hover:border-blue-500/30 transition-all duration-200">
                        <div className="flex items-start gap-4">
                            <div className="bg-blue-500/10 p-3 rounded-lg">
                                <FaUserTie className="text-blue-400 text-xl" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-white mb-1">Fornecedores</h3>
                                <p className="text-slate-400 text-sm mb-3">
                                    Gerencie informações e relacionamentos com fornecedores.
                                </p>
                                <a 
                                    href="/fornecedores" 
                                    className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium text-sm"
                                >
                                    Ver Fornecedores <FaArrowRight />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}