import { forwardRef } from "react";

const Input = forwardRef(function Input(
    { label, error, className = "", ...props },
    ref
) {
    return (
        <div className="flex flex-col gap-1.5">
            {label && (
                <label className="text-sm font-medium text-black">
                    {label}
                </label>
            )}

            <input
                ref={ref}
                className={`w-full px-3 py-2.5 rounded-md text-sm
                            bg-slate-200 border border-slate-700
                            text-slate-500 placeholder:text-slate-500
                            focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent
                            transition-colors duration-150
                            ${error ? "border-red-600 focus:ring-red-600" : ""}
                            ${className}`}
                {...props}
            />

            {error && (
                <span className="text-xs text-red-500">{error}</span>
            )}
        </div>
    );
});

export default Input;