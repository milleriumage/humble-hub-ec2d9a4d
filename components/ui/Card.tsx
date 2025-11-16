
import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className }) => {
    return (
        <div className={`bg-surface border border-border rounded-lg p-4 ${className}`}>
            {children}
        </div>
    );
};

export const CardHeader: React.FC<CardProps> = ({ children, className }) => {
    return <div className={`mb-4 ${className}`}>{children}</div>;
};

export const CardTitle: React.FC<CardProps> = ({ children, className }) => {
    return <h3 className={`text-lg font-semibold text-text-primary ${className}`}>{children}</h3>;
};

export const CardDescription: React.FC<CardProps> = ({ children, className }) => {
    return <p className={`text-sm text-text-secondary ${className}`}>{children}</p>;
};

export const CardContent: React.FC<CardProps> = ({ children, className }) => {
    return <div className={className}>{children}</div>;
};
