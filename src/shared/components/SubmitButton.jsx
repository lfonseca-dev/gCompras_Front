import { FaSpinner } from "react-icons/fa";

export default function SubmitButton({
    children,
    loading = false,
    disabled = false,
    className = "",
    ...props
}) {
    return (
        <button
            type="submit"
            disabled={loading || disabled}
            className={`w-full flex items-center justify-center gap-2
                        px-4 py-2.5 rounded-md text-sm font-medium
                        bg-blue-600 text-white
                        hover:bg-blue-700
                        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-600
                        transition-colors duration-150
                        ${className}`}
            {...props}
        >
            {loading && <FaSpinner className="text-sm animate-spin" />}
            {loading ? "Enviando..." : children}
        </button>
    );
}