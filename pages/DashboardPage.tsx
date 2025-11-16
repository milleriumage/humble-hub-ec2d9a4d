
import React from 'react';
import { useBotStore } from '../store/botStore';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';

export const DashboardPage: React.FC = () => {
    const { bots, activeBotId, rooms, logs } = useBotStore();
    const activeBot = bots.find(b => b.id === activeBotId);
    
    if (!activeBot) return <div>No bot selected.</div>;

    const botRooms = activeBot.activeRoomIds.map(id => rooms[id]).filter(Boolean);
    const totalMessages = botRooms.reduce((sum, room) => sum + room.messages.length, 0);

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className={`text-xl font-bold ${activeBot.status === 'online' ? 'text-green-400' : 'text-red-400'}`}>
                            {activeBot.status.toUpperCase()}
                        </p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>AI Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className={`text-xl font-bold ${activeBot.isAiEnabled ? 'text-purple-400' : 'text-gray-400'}`}>
                            {activeBot.isAiEnabled ? 'ENABLED' : 'DISABLED'}
                        </p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>Active Rooms</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-xl font-bold">{activeBot.activeRoomIds.length}</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>Total Messages</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-xl font-bold">{totalMessages}</p>
                    </CardContent>
                </Card>
            </div>

            <Card className="max-h-96">
                <CardHeader>
                    <CardTitle>System Logs</CardTitle>
                </CardHeader>
                <CardContent className="h-full overflow-y-auto">
                    <pre className="text-xs text-text-secondary whitespace-pre-wrap font-mono">
                        {logs.join('\n')}
                    </pre>
                </CardContent>
            </Card>
        </div>
    );
};
