import React, { useState, useEffect } from 'react';
import { useBotStore } from '../store/botStore';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

export const MultiRoomPage: React.FC = () => {
    const { bots, activeBotId, rooms, joinRoom, leaveRoom, setActiveRoom, availableRooms, fetchAvailableRooms } = useBotStore();
    const [newRoomName, setNewRoomName] = useState('');
    const activeBot = bots.find(b => b.id === activeBotId);

    useEffect(() => {
        if (activeBot && activeBot.status === 'online') {
            fetchAvailableRooms(activeBot.id);
        }
    }, [activeBot, activeBot?.status, fetchAvailableRooms]);

    if (!activeBot) return <div>No bot selected.</div>;

    const botRooms = activeBot.activeRoomIds.map(id => rooms[id]).filter(Boolean);

    const handleJoinRoom = (roomName?: string) => {
        const name = roomName || newRoomName.trim();
        if (name && activeBot.status === 'online') {
            joinRoom(activeBot.id, name);
            setNewRoomName('');
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Multi-Room Control</h1>
                 <div className="flex space-x-2">
                    <Input 
                        placeholder="Enter room name..." 
                        value={newRoomName} 
                        onChange={(e) => setNewRoomName(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleJoinRoom()}
                        disabled={activeBot.status !== 'online'}
                    />
                    <Button onClick={() => handleJoinRoom()} disabled={!newRoomName.trim() || activeBot.status !== 'online'}>Join Room</Button>
                </div>
            </div>

            {activeBot.status === 'online' && (
                 <Card>
                    <CardHeader>
                        <CardTitle>Available Rooms</CardTitle>
                        <CardDescription>Click to join a public room.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-wrap gap-2">
                        {availableRooms.map(room => (
                            <Button key={room.id} variant="secondary" size="sm" onClick={() => handleJoinRoom(room.name)}>
                                Join {room.name}
                            </Button>
                        ))}
                    </CardContent>
                </Card>
            )}
            
             <div>
                <h2 className="text-xl font-bold mb-4">Active Rooms for {activeBot.name}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {botRooms.length > 0 ? botRooms.map(room => (
                        <Card key={room.id}>
                            <CardHeader>
                                <CardTitle>{room.name}</CardTitle>
                                <CardDescription>{room.messages.length} messages</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="h-24 overflow-y-hidden text-sm text-text-secondary">
                                    {room.messages.slice(-5).map(msg => (
                                        <p key={msg.id} className="truncate"><b>{msg.author}:</b> {msg.text}</p>
                                    )).reverse()}
                                </div>
                                <div className="mt-4 flex space-x-2">
                                    <Button variant="primary" size="sm" onClick={() => setActiveRoom(room.id)}>View Chat</Button>
                                    <Button variant="secondary" size="sm" onClick={() => leaveRoom(activeBot.id, room.id)}>Leave</Button>
                                </div>
                            </CardContent>
                        </Card>
                    )) : (
                        <p className="text-text-secondary col-span-full text-center mt-8">
                            {activeBot.status === 'online' ? 'No active rooms. Join one to get started!' : 'Bot is offline. Connect to join rooms.'}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};