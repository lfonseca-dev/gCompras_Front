import { FaHome, FaShoppingCart, FaTruck, FaArrowRight, FaBoxes } from "react-icons/fa";
import { Link } from "react-router-dom";
import PageLayout from "../components/PageLayout";
import PageCard from "../components/PageCard";

export default function Home() {
    return (
        <PageLayout
            title="Bem-vindo(a) ao Sistema de Compras"
            subtitle="Painel principal para gestão centralizada de compras, fornecedores e produtos."
            icon={FaHome}
        >
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* Card de Boas-Vindas */}
                <PageCard
                    title="Visão Geral"
                    description="Resumo do sistema FAULIM"
                >
                    <p className="text-slate-600 mb-4 leading-relaxed">
                        Este é o painel principal do sistema de compras FAULIM. Aqui você pode acompanhar
                        e gerenciar fornecedores, solicitações de compras, catálogo de produtos e parâmetros do sistema.
                    </p>
                    <p className="text-sm text-slate-500 bg-slate-50 p-3 rounded-lg border border-slate-100">
                        💡 Use o menu lateral para navegar rapidamente entre os módulos disponíveis.
                    </p>
                </PageCard>

                {/* Cards de Atalhos */}
                <div className="space-y-4">
                    <PageCard className="hover:border-[#FF0029]/30 transition-all">
                        <div className="flex items-start gap-4">
                            <div className="rounded-lg bg-blue-50 p-3 text-blue-600">
                                <FaShoppingCart className="text-xl" />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-semibold text-slate-900 mb-1">Solicitações de Compras</h3>
                                <p className="text-slate-500 text-sm mb-3">
                                    Visualize e gerencie todas as solicitações de compra de forma centralizada.
                                </p>
                                <Link
                                    to="/compra"
                                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#FF0029] hover:underline"
                                >
                                    Acessar Compras <FaArrowRight className="text-xs" />
                                </Link>
                            </div>
                        </div>
                    </PageCard>

                    <PageCard className="hover:border-[#FF0029]/30 transition-all">
                        <div className="flex items-start gap-4">
                            <div className="rounded-lg bg-emerald-50 p-3 text-emerald-600">
                                <FaTruck className="text-xl" />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-semibold text-slate-900 mb-1">Fornecedores</h3>
                                <p className="text-slate-500 text-sm mb-3">
                                    Gerencie informações, cadastros e contatos de fornecedores.
                                </p>
                                <Link
                                    to="/fornecedor"
                                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#FF0029] hover:underline"
                                >
                                    Ver Fornecedores <FaArrowRight className="text-xs" />
                                </Link>
                            </div>
                        </div>
                    </PageCard>

                    <PageCard className="hover:border-[#FF0029]/30 transition-all">
                        <div className="flex items-start gap-4">
                            <div className="rounded-lg bg-purple-50 p-3 text-purple-600">
                                <FaBoxes className="text-xl" />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-semibold text-slate-900 mb-1">Produtos</h3>
                                <p className="text-slate-500 text-sm mb-3">
                                    Consulte e cadastre o catálogo de produtos do sistema.
                                </p>
                                <Link
                                    to="/produto"
                                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#FF0029] hover:underline"
                                >
                                    Ver Produtos <FaArrowRight className="text-xs" />
                                </Link>
                            </div>
                        </div>
                    </PageCard>
                </div>
            </div>
        </PageLayout>
    );
}