
import React, { useState, useEffect, useRef } from 'react';
import { useBotStore } from '../store/botStore';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Card } from '../components/ui/Card';

export const ChatPage: React.FC = () => {
    const { bots, activeBotId, rooms, activeRoomId, setActiveRoom, sendMessage } = useBotStore();
    const [message, setMessage] = useState('');
    const activeBot = bots.find(b => b.id === activeBotId);
    const activeRoom = activeRoomId ? rooms[activeRoomId] : null;
    const botRooms = activeBot?.activeRoomIds.map(id => rooms[id]).filter(Boolean) || [];
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [activeRoom?.messages]);

    const handleSendMessage = () => {
        if (message.trim() && activeBot && activeRoomId) {
            sendMessage(activeBot.id, activeRoomId, message.trim());
            setMessage('');
        }
    };
    
    if (!activeBot) return <div>No bot selected.</div>;

    return (
        <div className="flex flex-col h-full max-h-[calc(100vh-8rem)]">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Live Chat</h1>
                {botRooms.length > 0 && (
                    <Select
                        className="w-64"
                        value={activeRoomId || ''}
                        onChange={(e) => setActiveRoom(e.target.value || null)}
                    >
                        <option value="">Select a room...</option>
                        {botRooms.map(room => (
                            <option key={room.id} value={room.id}>{room.name}</option>
                        ))}
                    </Select>
                )}
            </div>
            
            <Card className="flex-1 flex flex-col">
                {activeRoom ? (
                    <>
                        <div className="flex-1 p-4 overflow-y-auto space-y-4">
                            {activeRoom.messages.map(msg => (
                                <div key={msg.id} className={`flex ${
                                    msg.authorId === activeBot.id ? 'justify-end' : 
                                    msg.type === 'system' ? 'justify-center' : 'justify-start'
                                }`}>
                                    <div className={`max-w-md p-3 rounded-lg ${
                                        msg.type === 'bot' ? 'bg-primary text-white' : 
                                        msg.type === 'system' ? 'w-full text-center text-xs italic text-text-secondary bg-transparent p-1' :
                                        'bg-secondary text-text-primary'
                                    }`}>
                                        {msg.type !== 'system' && <p className="font-bold text-sm mb-1">{msg.author}</p>}
                                        <p>{msg.text}</p>
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>
                        <div className="p-4 border-t border-border flex space-x-2">
                            <Input 
                                placeholder="Type a message..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                disabled={activeBot.status !== 'online'}
                            />
                            <Button onClick={handleSendMessage} disabled={activeBot.status !== 'online'}>Send</Button>
                        </div>
                    </>
                ) : (
                    <div className="flex items-center justify-center h-full text-text-secondary">
                        <p>Select a room to start chatting.</p>
                    </div>
                )}
            </Card>
        </div>
    );
};
