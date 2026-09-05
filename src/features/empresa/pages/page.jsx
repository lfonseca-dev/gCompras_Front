import { FaBriefcase } from "react-icons/fa";
import PageLayout from "../../../shared/components/PageLayout";
import PageCard from "../../../shared/components/PageCard";

export default function Empresa() {
    return (
        <PageLayout
            title="Empresas"
            subtitle="Cadastro e gerenciamento de empresas parceiras e unidades."
            icon={FaBriefcase}
            actions={
                <button className="rounded-lg bg-[#FF0029] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#D90023] shadow-sm">
                    + Nova Empresa
                </button>
            }
        >
            <PageCard>
                <div className="flex min-h-[250px] flex-col items-center justify-center text-center">
                    <p className="text-base font-medium text-slate-700">Módulo de Empresa</p>
                    <p className="mt-1 text-sm text-slate-500">A lista de empresas cadastradas será exibida aqui.</p>
                </div>
            </PageCard>
        </PageLayout>
    );
}