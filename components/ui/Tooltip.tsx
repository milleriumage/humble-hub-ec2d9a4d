
import React from 'react';

interface TooltipProps {
    children: React.ReactElement;
    content: string;
}

export const Tooltip: React.FC<TooltipProps> = ({ children, content }) => {
    return (
        <div className="relative flex items-center group">
            {children}
            <div className="absolute bottom-full mb-2 w-max px-2 py-1 bg-secondary text-text-primary text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                {content}
            </div>
        </div>
    );
};
