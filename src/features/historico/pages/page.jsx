import { FaHistory } from "react-icons/fa";
import PageLayout from "../../../shared/components/PageLayout";
import PageCard from "../../../shared/components/PageCard";

export default function Historico() {
    return (
        <PageLayout
            title="Histórico de Compras"
            subtitle="Consulte a linha do tempo e movimentações das compras efetuadas."
            icon={FaHistory}
        >
            <PageCard>
                <div className="flex min-h-[250px] flex-col items-center justify-center text-center">
                    <p className="text-base font-medium text-slate-700">Histórico de Movimentações</p>
                    <p className="mt-1 text-sm text-slate-500">O histórico detalhado das operações será exibido aqui.</p>
                </div>
            </PageCard>
        </PageLayout>
    );
}