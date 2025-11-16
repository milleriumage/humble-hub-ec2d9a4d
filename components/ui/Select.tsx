
import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
}

export const Select: React.FC<SelectProps> = ({ label, children, className, ...props }) => {
    return (
        <div className="w-full">
            {label && <label className="block text-sm text-text-secondary mb-1">{label}</label>}
            <select
                className={`w-full px-3 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${className}`}
                {...props}
            >
                {children}
            </select>
        </div>
    );
};
