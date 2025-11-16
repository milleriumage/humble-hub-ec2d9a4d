
import React from 'react';

interface SliderProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  value: number;
}

export const Slider: React.FC<SliderProps> = ({ label, value, ...props }) => {
  const percentage = ((value - Number(props.min || 0)) / (Number(props.max || 100) - Number(props.min || 0))) * 100;
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-1">
        <label className="text-sm text-text-secondary">{label}</label>
        <span className="text-sm font-medium text-text-primary">{value}</span>
      </div>
      <div className="relative h-2 rounded-full bg-secondary">
         <div className="absolute h-2 rounded-full bg-primary" style={{ width: `${percentage}%` }}></div>
        <input
          type="range"
          value={value}
          {...props}
          className="absolute w-full h-full opacity-0 cursor-pointer"
        />
      </div>
    </div>
  );
};
