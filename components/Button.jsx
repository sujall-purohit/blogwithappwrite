import React from "react";

export default function Button({
    children,
    type = "button",
    bgColor = "bg-blue-600",
    textColor = "text-white",
    className = "",
    ...props
}) {
    return (
        <button className={`px-5 py-3 rounded-lg whitespace-nowrap transition-all
  duration-200 ${bgColor} ${textColor} ${className}`} {...props}>
            {children}
        </button>
    );
}