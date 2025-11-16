import { useEffect, useRef } from 'react';
import { useBotStore } from '../store/botStore';
// FIX: Changed import from aiService to geminiService
import { generateBotResponse } from '../services/geminiService';
import { Message } from '../types';

export const useImvuBot = (botId: string) => {
    const { bots, rooms, sendMessage } = useBotStore();
    const processingRef = useRef<Set<string>>(new Set()); // Tracks processing messages per room

    useEffect(() => {
        const handleMessage = (message: Message) => {
            const bot = bots.find(b => b.id === botId);
            if (!bot || !bot.isAiEnabled || bot.status !== 'online') return;
            
            // Is the bot in the room where the message was sent?
            if (!bot.activeRoomIds.includes(message.roomId)) return;

            // Is the message from another user (not this bot or another managed bot)?
            const isFromOtherUser = message.type === 'user';
            const room = rooms[message.roomId];

            if (isFromOtherUser && room && room.messages.length > 0) {
                // Prevent duplicate processing
                if (processingRef.current.has(message.id)) return;
                processingRef.current.add(message.id);

                // Delay response based on personality
                const delay = (101 - bot.personality.responseSpeed) * 30 + Math.random() * 500;
                
                setTimeout(async () => {
                    try {
                        const responseText = await generateBotResponse(bot.personality, room.messages, bot.name, bot.aiProvider);
                        sendMessage(botId, message.roomId, responseText);
                    } catch (error) {
                        console.error(`[${bot.name}] Error generating AI response:`, error);
                    } finally {
                        processingRef.current.delete(message.id);
                    }
                }, delay);
            }
        };

        // FIX: Replaced subscribe call to use the (state, prevState) signature to fix the argument count error.
        const unsubscribe = useBotStore.subscribe(
            (state, prevState) => {
                const newRooms = state.rooms;
                const oldRooms = prevState.rooms;
                
                if (newRooms === oldRooms) return;

                // Find the latest message across all rooms
                let latestMessage: Message | null = null;
                for (const roomId in newRooms) {
                    const newMessages = newRooms[roomId].messages;
                    if (newMessages.length > 0) {
                        const lastMsg = newMessages[newMessages.length - 1];
                        if (!latestMessage || lastMsg.timestamp > latestMessage.timestamp) {
                            // Check if this message is new
                            const oldRoomMessages = oldRooms[roomId]?.messages || [];
                            if (oldRoomMessages.length < newMessages.length) {
                                latestMessage = lastMsg;
                            }
                        }
                    }
                }
                if (latestMessage) {
                    handleMessage(latestMessage);
                }
            }
        );

        return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [botId, bots, rooms, sendMessage]);
};