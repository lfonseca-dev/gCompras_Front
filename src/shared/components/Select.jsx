import { forwardRef } from "react";
import { FaChevronDown } from "react-icons/fa";

const Select = forwardRef(function Select(
    { label, error, options = [], placeholder = "Selecione", className = "", ...props },
    ref
) {
    return (
        <div className="flex flex-col gap-1.5">
            {label && (
                <label className="text-sm font-medium text-slate-300">
                    {label}
                </label>
            )}

            <div className="relative">
                <select
                    ref={ref}
                    defaultValue=""
                    className={`w-full appearance-none px-3 py-2.5 pr-10 rounded-md text-sm
                                bg-slate-800 border border-slate-700
                                text-slate-100
                                focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent
                                transition-colors duration-150
                                ${error ? "border-red-600 focus:ring-red-600" : ""}
                                ${className}`}
                    {...props}
                >
                    <option value="" disabled className="text-slate-500">
                        {placeholder}
                    </option>
                    {options.map((opt) => (
                        <option
                            key={opt.value}
                            value={opt.value}
                            className="bg-slate-800 text-slate-100"
                        >
                            {opt.label}
                        </option>
                    ))}
                </select>

                <FaChevronDown
                    className="absolute right-3 top-1/2 -translate-y-1/2
                               text-slate-500 text-xs pointer-events-none"
                />
            </div>

            {error && (
                <span className="text-xs text-red-500">{error}</span>
            )}
        </div>
    );
});

export default Select;