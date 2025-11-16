
import React from 'react';
import { useBotStore } from '../store/botStore';
import { BotIcon } from './Icons';

export const Header: React.FC = () => {
    const { bots, activeBotId } = useBotStore();
    const activeBot = bots.find(b => b.id === activeBotId);

    return (
        <header className="h-16 flex items-center justify-between px-6 bg-surface border-b border-border">
            <div>
                {activeBot ? (
                    <div className="flex items-center">
                        <BotIcon className="w-6 h-6 text-primary" />
                        <h2 className="text-lg font-semibold ml-3">{activeBot.name}</h2>
                        <span className={`ml-4 text-xs font-medium px-2 py-1 rounded-full ${activeBot.status === 'online' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                            {activeBot.status.toUpperCase()}
                        </span>
                         <span className={`ml-2 text-xs font-medium px-2 py-1 rounded-full ${activeBot.isAiEnabled ? 'bg-purple-500/20 text-purple-400' : 'bg-gray-500/20 text-gray-400'}`}>
                            AI {activeBot.isAiEnabled ? 'ON' : 'OFF'}
                        </span>
                    </div>
                ) : (
                    <h2 className="text-lg font-semibold">No Bot Selected</h2>
                )}
            </div>
            <div>
                {/* Future elements like user profile can go here */}
            </div>
        </header>
    );
};
