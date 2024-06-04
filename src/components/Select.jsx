import { forwardRef, useId } from "react";

function Select({ label, options, className = "", ...props }, ref) {
    const id = useId();
    return (
        <div className="w-full">
            {label && (
                <label htmlFor={id} className="inline-block pl-1 mb-1">
                    {label}
                </label>
            )}
            <select
                id={id}
                className={`px-3 py-2 rounded-lg outline-none bg-white text-black focus:bg-gray-200 duration-200 border border-gray-200 w-full ${className}`}
                {...props}
                ref={ref}
            >
                {options?.map((option) => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>
        </div>
    );
}

export default forwardRef(Select);
