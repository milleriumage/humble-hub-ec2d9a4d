import React from 'react';
import { useBotStore } from '../store/botStore';
import { Page } from '../types';
import { DashboardIcon, RoomIcon, ChatIcon, SettingsIcon, BotIcon, PowerIcon, UsersIcon, LoginIcon, LogoutIcon, InfoIcon } from './Icons';
import { Tooltip } from './ui/Tooltip';

interface SidebarProps {
    currentPage: Page;
    setCurrentPage: (page: Page) => void;
}

const NavItem: React.FC<{
    icon: React.ReactNode;
    label: Page;
    currentPage: Page;
    setCurrentPage: (page: Page) => void;
}> = ({ icon, label, currentPage, setCurrentPage }) => {
    const isActive = currentPage === label;
    return (
        <button
            onClick={() => setCurrentPage(label)}
            className={`flex items-center w-full p-3 rounded-lg transition-colors duration-200 ${
                isActive ? 'bg-primary text-white' : 'text-text-secondary hover:bg-secondary hover:text-text-primary'
            }`}
        >
            {icon}
            <span className="ml-4 font-medium capitalize">{label}</span>
        </button>
    );
};


export const Sidebar: React.FC<SidebarProps> = ({ currentPage, setCurrentPage }) => {
    const { bots, activeBotId, setActiveBot, logoutBot, openLoginModal } = useBotStore();
    const activeBot = bots.find(b => b.id === activeBotId);

    const handlePowerClick = (botId: string, status: 'online' | 'offline') => {
        if (status === 'online') {
            logoutBot(botId);
        } else {
            openLoginModal(botId);
        }
    };

    return (
        <aside className="w-64 bg-surface flex flex-col p-4 border-r border-border">
            <div className="flex items-center mb-8">
                <BotIcon className="w-8 h-8 text-primary" />
                <h1 className="text-xl font-bold ml-2">IMVU Bot</h1>
            </div>

            <nav className="flex flex-col space-y-2">
                <NavItem icon={<DashboardIcon />} label="dashboard" currentPage={currentPage} setCurrentPage={setCurrentPage} />
                <NavItem icon={<RoomIcon />} label="rooms" currentPage={currentPage} setCurrentPage={setCurrentPage} />
                <NavItem icon={<ChatIcon />} label="chat" currentPage={currentPage} setCurrentPage={setCurrentPage} />
                <NavItem icon={<UsersIcon />} label="bots" currentPage={currentPage} setCurrentPage={setCurrentPage} />
                <NavItem icon={<SettingsIcon />} label="settings" currentPage={currentPage} setCurrentPage={setCurrentPage} />
            </nav>

            <div className="mt-auto space-y-4">
                 <div>
                    <h2 className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">Bots</h2>
                    <div className="space-y-2">
                        {bots.map(bot => (
                            <div key={bot.id} 
                                className={`flex items-center p-2 rounded-lg cursor-pointer transition-colors ${activeBotId === bot.id ? 'bg-secondary' : 'hover:bg-secondary/50'}`}
                                onClick={() => setActiveBot(bot.id)}
                            >
                                <div className={`w-2 h-2 rounded-full mr-3 ${bot.status === 'online' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                <span className="flex-1 font-medium">{bot.name}</span>
                                <Tooltip content={bot.status === 'online' ? 'Logout' : 'Login'}>
                                    <button onClick={(e) => { e.stopPropagation(); handlePowerClick(bot.id, bot.status); }} className="p-1 rounded-full hover:bg-background">
                                        <PowerIcon className={`w-5 h-5 ${bot.status === 'online' ? 'text-green-500' : 'text-red-500'}`} />
                                    </button>
                                </Tooltip>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="border-t border-border pt-4">
                    {activeBot ? (
                        activeBot.status === 'offline' ? (
                            <button
                                onClick={() => openLoginModal(activeBot.id)}
                                className="flex items-center w-full p-3 rounded-lg transition-colors duration-200 text-text-secondary hover:bg-secondary hover:text-text-primary"
                            >
                                <LoginIcon />
                                <span className="ml-4 font-medium">Login {activeBot.name}</span>
                            </button>
                        ) : (
                            <button
                                onClick={() => logoutBot(activeBot.id)}
                                className="flex items-center w-full p-3 rounded-lg transition-colors duration-200 text-text-secondary hover:bg-secondary hover:text-text-primary"
                            >
                                <LogoutIcon />
                                <span className="ml-4 font-medium truncate">Logout {activeBot.name}</span>
                            </button>
                        )
                    ) : bots.length > 0 ? (
                        <div className="flex items-center p-3 text-text-secondary text-sm">
                            <InfoIcon className="w-8 h-8 flex-shrink-0" />
                            <span className="ml-2">Select a bot to manage its session.</span>
                        </div>
                    ) : (
                        <div className="flex items-center p-3 text-text-secondary text-sm">
                            <InfoIcon className="w-8 h-8 flex-shrink-0" />
                            <span className="ml-2">Create a bot from the 'Bots' page to get started.</span>
                        </div>
                    )}
                </div>
            </div>
        </aside>
    );
};