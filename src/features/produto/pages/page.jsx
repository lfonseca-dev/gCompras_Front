import { FaBoxes } from "react-icons/fa";
import PageLayout from "../../../shared/components/PageLayout";
import PageCard from "../../../shared/components/PageCard";

export default function Produto() {
    return (
        <PageLayout
            title="Produtos"
            subtitle="Catálogo de produtos disponíveis para ordens de compra."
            icon={FaBoxes}
            actions={
                <button className="rounded-lg bg-[#FF0029] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#D90023] shadow-sm">
                    + Novo Produto
                </button>
            }
        >
            <PageCard>
                <div className="flex min-h-[250px] flex-col items-center justify-center text-center">
                    <p className="text-base font-medium text-slate-700">Módulo de Produtos</p>
                    <p className="mt-1 text-sm text-slate-500">O catálogo de produtos cadastrados será exibido aqui.</p>
                </div>
            </PageCard>
        </PageLayout>
    );
}