import React, { useState, useRef, useEffect } from 'react';
import { useBotStore } from '../store/botStore';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
// FIX: Changed import from aiService to geminiService
import { coordinateDialogue } from '../services/geminiService';
import { Message } from '../types';

export const BotManagerPage: React.FC = () => {
    const { bots, addBot } = useBotStore();
    const [newBotName, setNewBotName] = useState('');
    const [botAId, setBotAId] = useState<string>('');
    const [botBId, setBotBId] = useState<string>('');
    const [conversation, setConversation] = useState<Message[]>([]);
    const [isSimulating, setIsSimulating] = useState(false);
    const simulationIntervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        // This effect manages the bot selection for the simulation.
        // It clears selections for offline bots and attempts to auto-fill empty slots.
        const onlineBots = bots.filter(b => b.status === 'online');
        let currentA = botAId;
        let currentB = botBId;

        const isAOnline = onlineBots.some(b => b.id === currentA);
        const isBOnline = onlineBots.some(b => b.id === currentB);

        // If a selected bot is no longer online, clear its selection.
        if (!isAOnline) currentA = '';
        if (!isBOnline) currentB = '';
        
        // If a slot is empty, try to fill it from available online bots.
        if (!currentA && onlineBots.length >= 1) {
            const candidateA = onlineBots.find(b => b.id !== currentB);
            if(candidateA) currentA = candidateA.id;
        }
        if (!currentB && onlineBots.length >= 2) {
            const candidateB = onlineBots.find(b => b.id !== currentA);
            if(candidateB) currentB = candidateB.id;
        }

        // Ensure the same bot isn't selected twice.
        if(currentA && currentA === currentB) {
             const candidateB = onlineBots.find(b => b.id !== currentA);
             currentB = candidateB ? candidateB.id : '';
        }

        // Only update state if the calculated selections are different from the current state.
        // This prevents infinite re-render loops.
        if (currentA !== botAId) setBotAId(currentA);
        if (currentB !== botBId) setBotBId(currentB);
        
        // Cleanup simulation interval on unmount or when dependencies change.
        return () => {
            if (simulationIntervalRef.current) {
                clearInterval(simulationIntervalRef.current);
            }
        };
    }, [bots, botAId, botBId]);

    const handleAddBot = () => {
        if (newBotName.trim()) {
            addBot(newBotName.trim());
            setNewBotName('');
        }
    };
    
    const startSimulation = () => {
        if (!botAId || !botBId || botAId === botBId) {
            alert("Please select two different online bots.");
            return;
        }
        setIsSimulating(true);
        setConversation([]);

        const runTurn = async () => {
            const botA = bots.find(b => b.id === botAId);
            const botB = bots.find(b => b.id === botBId);
            if (!botA || !botB) {
                stopSimulation();
                return;
            }
            try {
                const result = await coordinateDialogue(botA, botB, conversation);
                const speakingBot = result.botToSpeak === botA.id ? botA : botB;
                const newMessage: Message = {
                    id: `sim-${Date.now()}`,
                    roomId: 'simulation',
                    author: speakingBot.name,
                    authorId: speakingBot.id,
                    text: result.message,
                    timestamp: Date.now(),
                    type: 'bot'
                };
                setConversation(prev => [...prev, newMessage]);
            } catch (e) {
                console.error("Simulation error", e);
                stopSimulation();
            }
        };
        
        runTurn(); // Initial turn
        simulationIntervalRef.current = setInterval(runTurn, 5000);
    };

    const stopSimulation = () => {
        setIsSimulating(false);
        if (simulationIntervalRef.current) {
            clearInterval(simulationIntervalRef.current);
        }
    };

    const onlineBots = bots.filter(b => b.status === 'online');

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">Bot Manager</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Create New Bot</CardTitle>
                        </CardHeader>
                        <CardContent className="flex space-x-2">
                            <Input 
                                placeholder="Bot Name" 
                                value={newBotName}
                                onChange={(e) => setNewBotName(e.target.value)}
                            />
                            <Button onClick={handleAddBot}>Add</Button>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader><CardTitle>All Bots</CardTitle></CardHeader>
                        <CardContent className="space-y-2 max-h-96 overflow-y-auto">
                            {bots.map(bot => (
                                <div key={bot.id} className="flex items-center p-2 bg-secondary rounded-md">
                                     <div className={`w-2 h-2 rounded-full mr-3 ${bot.status === 'online' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                     <span className="font-medium">{bot.name}</span>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Bot-to-Bot Interaction</CardTitle>
                            <CardDescription>Simulate a conversation between two online bots.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center space-x-4 mb-4">
                               <Select label="Bot A" value={botAId} onChange={e => setBotAId(e.target.value)} disabled={isSimulating}>
                                    <option value="">Select Bot A</option>
                                    {onlineBots.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                                </Select>
                                 <Select label="Bot B" value={botBId} onChange={e => setBotBId(e.target.value)} disabled={isSimulating}>
                                     <option value="">Select Bot B</option>
                                    {onlineBots.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                                </Select>
                                {isSimulating ? (
                                    <Button variant="secondary" onClick={stopSimulation} className="mt-5">Stop</Button>
                                ) : (
                                    <Button onClick={startSimulation} className="mt-5" disabled={onlineBots.length < 2 || !botAId || !botBId}>Start</Button>
                                )}
                            </div>
                            <div className="h-80 bg-background border border-border rounded-md p-4 overflow-y-auto space-y-4">
                                {conversation.map(msg => (
                                    <div key={msg.id} className={`flex ${msg.authorId === botAId ? 'justify-start' : 'justify-end'}`}>
                                        <div className={`max-w-md p-3 rounded-lg ${msg.authorId === botAId ? 'bg-secondary' : 'bg-primary'}`}>
                                            <p className="font-bold text-sm mb-1">{msg.author}</p>
                                            <p>{msg.text}</p>
                                        </div>
                                    </div>
                                ))}
                                {!isSimulating && conversation.length === 0 && (
                                    <div className="flex items-center justify-center h-full text-text-secondary">
                                        <p>Start simulation to see the conversation.</p>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};