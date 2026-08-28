import { useState, forwardRef } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const PasswordInput = forwardRef(function PasswordInput(
    { label, error, className = "", ...props },
    ref
) {
    const [visible, setVisible] = useState(false);

    return (
        <div className="flex flex-col gap-1.5">
            {label && (
                <label className="text-sm font-medium text-slate-300">
                    {label}
                </label>
            )}

            <div className="relative">
                <input
                    ref={ref}
                    type={visible ? "text" : "password"}
                    className={`w-full px-3 py-2.5 pr-10 rounded-md text-sm
                                bg-slate-800 border border-slate-700
                                text-slate-100 placeholder:text-slate-500
                                focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent
                                transition-colors duration-150
                                ${error ? "border-red-600 focus:ring-red-600" : ""}
                                ${className}`}
                    {...props}
                />

                <button
                    type="button"
                    onClick={() => setVisible((prev) => !prev)}
                    tabIndex={-1}
                    className="absolute right-3 top-1/2 -translate-y-1/2
                               text-slate-500 hover:text-slate-300
                               transition-colors duration-150"
                >
                    {visible ? <FaEyeSlash className="text-sm" /> : <FaEye className="text-sm" />}
                </button>
            </div>

            {error && (
                <span className="text-xs text-red-500">{error}</span>
            )}
        </div>
    );
});

export default PasswordInput;