import React, { useId, forwardRef } from 'react'

const Input = forwardRef(function Input({
    label,
    type = "text",
    className = "",
    ...props
}, ref) {
    const id = useId()
    return (
        <div className='w-full'>
            {label && <label
                className="inline-block mb-2 text-sm font-medium text-slate-700"
                htmlFor={id}>
                {label}
            </label>
            }
            <input
                type={type}
                className={`px-3 py-3 rounded-lg bg-white text-black outline-none focus:border-indigo-500
focus:ring-2
focus:ring-indigo-200 duration-200 border border-gray-200 w-full ${className}`}
                ref={ref}
                {...props}
                id={id}
            />
        </div>
    )
})

export default Input
