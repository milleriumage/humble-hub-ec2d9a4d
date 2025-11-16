
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', size = 'md', className, ...props }) => {
    const baseClasses = "rounded-md font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center";
    
    const variantClasses = {
        primary: "bg-primary text-white hover:bg-primary-hover focus:ring-primary",
        secondary: "bg-secondary text-text-primary hover:bg-opacity-80 focus:ring-secondary",
        ghost: "bg-transparent text-text-primary hover:bg-secondary/50 focus:ring-secondary",
    };

    const sizeClasses = {
        sm: 'px-2 py-1 text-sm h-8',
        md: 'px-4 py-2 h-10',
        lg: 'px-6 py-3 text-lg h-12'
    };

    return (
        <button className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`} {...props}>
            {children}
        </button>
    );
};
