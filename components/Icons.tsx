import React from 'react';

const iconProps: React.SVGProps<SVGSVGElement> = {
    className: "w-5 h-5",
    strokeWidth: 1.5,
    stroke: "currentColor",
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round",
};

export const DashboardIcon: React.FC = () => (
    <svg {...iconProps}><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 4h6v8h-6z" /><path d="M4 16h6v4h-6z" /><path d="M14 12h6v8h-6z" /><path d="M14 4h6v4h-6z" /></svg>
);

export const RoomIcon: React.FC = () => (
    <svg {...iconProps}><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 12h16" /><path d="M4 12v-6a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v6" /><path d="M4 12v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-6" /><path d="M12 12v-8" /><path d="M12 12v8" /></svg>
);

export const ChatIcon: React.FC = () => (
    <svg {...iconProps}><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 20l1.3 -3.9a9 8 0 1 1 3.4 2.9l-4.7 1" /><path d="M12 12l0 .01" /><path d="M8 12l0 .01" /><path d="M16 12l0 .01" /></svg>
);

export const SettingsIcon: React.FC = () => (
    <svg {...iconProps}><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z" /><path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" /></svg>
);

export const BotIcon: React.FC<{className?: string}> = ({className}) => (
    <svg {...iconProps} className={className || iconProps.className}><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8 16h8" /><path d="M8 12h8" /><path d="M9 8h6" /><path d="M12 12v-4" /><path d="M4 10h-.01" /><path d="M20 10h-.01" /><path d="M6.5 16l-2.5 -4l2.5 -4" /><path d="M17.5 16l2.5 -4l-2.5 -4" /></svg>
);

export const UsersIcon: React.FC = () => (
    <svg {...iconProps}><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" /><path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /><path d="M21 21v-2a4 4 0 0 0 -3 -3.85" /></svg>
);

export const PowerIcon: React.FC<{className?: string}> = ({className}) => (
     <svg {...iconProps} className={className || iconProps.className}><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 6a7.75 7.75 0 1 0 10 0" /><path d="M12 4l0 8" /></svg>
);

export const LoginIcon: React.FC<{className?: string}> = ({className}) => (
    <svg {...iconProps} className={className || iconProps.className}><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" /><path d="M20 12h-13l3 -3" /><path d="M17 15l3 -3" /></svg>
);

export const LogoutIcon: React.FC<{className?: string}> = ({className}) => (
    <svg {...iconProps} className={className || iconProps.className}><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" /><path d="M7 12h14l-3 -3" /><path d="M18 15l3 -3" /></svg>
);

export const InfoIcon: React.FC<{className?: string}> = ({className}) => (
     <svg {...iconProps} className={className || iconProps.className}><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" /><path d="M12 9h.01" /><path d="M11 12h1v4h1" /></svg>
);