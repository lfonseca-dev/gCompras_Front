import { FaChartBar } from "react-icons/fa";
import PageLayout from "../../../shared/components/PageLayout";
import PageCard from "../../../shared/components/PageCard";

export default function NivelAcesso() {
    return (
        <PageLayout
            title="Níveis de Acesso"
            subtitle="Configuração de perfis e permissões dos usuários do sistema."
            icon={FaChartBar}
        >
            <PageCard>
                <div className="flex min-h-[250px] flex-col items-center justify-center text-center">
                    <p className="text-base font-medium text-slate-700">Perfis e Permissões</p>
                    <p className="mt-1 text-sm text-slate-500">As configurações de níveis de acesso serão listadas aqui.</p>
                </div>
            </PageCard>
        </PageLayout>
    );
}