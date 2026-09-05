export default function PageCard({ title, description, headerAction, children, className = "" }) {
  return (
    <div className={`rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all ${className}`}>
      {(title || description || headerAction) && (
        <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            {title && <h3 className="text-lg font-semibold text-slate-800">{title}</h3>}
            {description && <p className="text-xs text-slate-500">{description}</p>}
          </div>
          {headerAction && <div>{headerAction}</div>}
        </div>
      )}
      {children}
    </div>
  );
}

