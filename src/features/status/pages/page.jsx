import { FaCheckCircle } from "react-icons/fa";
import PageLayout from "../../../shared/components/PageLayout";
import PageCard from "../../../shared/components/PageCard";

export default function StatusCompra() {
    return (
        <PageLayout
            title="Status de Compra"
            subtitle="Gerenciamento dos estados e etapas do fluxo de compras."
            icon={FaCheckCircle}
        >
            <PageCard>
                <div className="flex min-h-[250px] flex-col items-center justify-center text-center">
                    <p className="text-base font-medium text-slate-700">Status de Compra</p>
                    <p className="mt-1 text-sm text-slate-500">Os status de acompanhamento das compras serão configurados aqui.</p>
                </div>
            </PageCard>
        </PageLayout>
    );
}