import React from "react";

export const Spinner = ({
                     size = "md",        // sm | md | lg
                     color = "blue",     // blue | green | red | gray
                     text = null         // optional text under spinner
                 }) => {
    const sizeClasses = {
        sm: "w-5 h-5 border-2",
        md: "w-8 h-8 border-4",
        lg: "w-12 h-12 border-4",
    };

    const colorClasses = {
        blue: "border-blue-500 border-t-transparent",
        green: "border-green-500 border-t-transparent",
        red: "border-red-500 border-t-transparent",
        gray: "border-gray-400 border-t-transparent",
    };

    return (
        <div className="flex flex-col items-center justify-center gap-3">
            <div
                className={`${sizeClasses[size]} ${colorClasses[color]} rounded-full animate-spin`}
                role="status"
                aria-label="Loading"
            />
            {text && (
                <p className="text-sm text-gray-600 font-medium">
                    {text}
                </p>
            )}
        </div>
    );
};