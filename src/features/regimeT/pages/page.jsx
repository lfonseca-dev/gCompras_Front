import { FaBalanceScale } from "react-icons/fa";
import PageLayout from "../../../shared/components/PageLayout";
import PageCard from "../../../shared/components/PageCard";

export default function RegimeTributario() {
    return (
        <PageLayout
            title="Regimes Tributários"
            subtitle="Cadastro e manutenção de enquadramentos fiscais e tributários."
            icon={FaBalanceScale}
        >
            <PageCard>
                <div className="flex min-h-[250px] flex-col items-center justify-center text-center">
                    <p className="text-base font-medium text-slate-700">Regimes Tributários</p>
                    <p className="mt-1 text-sm text-slate-500">A tabela de regimes tributários será exibida aqui.</p>
                </div>
            </PageCard>
        </PageLayout>
    );
}