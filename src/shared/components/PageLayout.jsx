import PageHeader from "./PageHeader";

export default function PageLayout({
  title,
  subtitle,
  icon,
  actions,
  badge,
  loading = false,
  error = null,
  children,
  className = "",
  maxWidth = "max-w-7xl"
}) {
  return (
    <div className={`mx-auto w-full ${maxWidth} px-4 py-6 sm:px-6 lg:px-8 ${className}`}>
      {/* Cabeçalho da página se houver título ou ações */}
      {(title || actions) && (
        <PageHeader
          title={title}
          subtitle={subtitle}
          icon={icon}
          actions={actions}
          badge={badge}
        />
      )}

      {/* Estado de carregamento */}
      {loading ? (
        <div className="flex min-h-[300px] flex-col items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-[#FF0029]" />
          <p className="text-sm font-medium text-slate-500">Carregando dados...</p>
        </div>
      ) : error ? (
        /* Estado de erro */
        <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center text-red-700 shadow-sm">
          <p className="text-base font-semibold">Ocorreu um erro ao carregar esta página.</p>
          <p className="mt-1 text-sm text-red-600">
            {typeof error === "string" ? error : "Erro inesperado. Tente novamente mais tarde."}
          </p>
        </div>
      ) : (
        /* Conteúdo principal da página */
        <div className="space-y-6">{children}</div>
      )}
    </div>
  );
}

