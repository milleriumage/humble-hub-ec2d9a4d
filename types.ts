
export interface AIPersonality {
    style: 'friendly' | 'sarcastic' | 'professional' | 'flirty' | 'funny';
    responseSpeed: number; // 0-100
    aggressiveness: number; // 0-100
    humor: number; // 0-100
    creativity: number; // 0-100
    language: string;
    behavior: 'dominant' | 'submissive' | 'neutral';
    mode: 'seducer' | 'moderator' | 'entertainer' | 'helper';
}

export type AIProvider = 'gemini' | 'gpt';

export interface Bot {
    id: string;
    name: string;
    status: 'online' | 'offline';
    isAiEnabled: boolean;
    activeRoomIds: string[];
    personality: AIPersonality;
    aiProvider: AIProvider;
}

export interface Message {
    id: string;
    roomId: string;
    author: string;
    authorId: string;
    text: string;
    timestamp: number;
    type: 'user' | 'system' | 'bot';
}

export interface RoomUser {
    id: string;
    name: string;
}

export interface Room {
    id: string;
    name: string;
    users: RoomUser[];
    messages: Message[];
}

export type AvatarAction = 'dance' | 'pose' | 'wave' | 'laugh';

export type Page = 'dashboard' | 'rooms' | 'chat' | 'settings' | 'bots';
