
import React from 'react';

interface SwitchProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    label: string;
}

export const Switch: React.FC<SwitchProps> = ({ checked, onChange, label }) => {
    return (
        <label className="flex items-center cursor-pointer">
            <div className="relative">
                <input type="checkbox" className="sr-only" checked={checked} onChange={(e) => onChange(e.target.checked)} />
                <div className={`block w-10 h-6 rounded-full transition-colors ${checked ? 'bg-primary' : 'bg-secondary'}`}></div>
                <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${checked ? 'translate-x-4' : ''}`}></div>
            </div>
            <div className="ml-3 text-text-primary text-sm">{label}</div>
        </label>
    );
};
