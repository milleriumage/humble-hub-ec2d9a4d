import { GoogleGenAI } from "@google/genai";
import { AIPersonality, Message, AIProvider, Bot } from '../types';

// IMPORTANT: This is a placeholder for the real API key.
// In a real application, this should be handled securely.
const DUMMY_API_KEY = "YOUR_API_KEY_HERE";
if (!process.env.API_KEY) {
  // @ts-ignore
  process.env.API_KEY = DUMMY_API_KEY;
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const generatePrompt = (personality: AIPersonality, history: Message[], botName: string): string => {
    const historyText = history
        .slice(-10) // Get last 10 messages
        .map(msg => `${msg.author}: ${msg.text}`)
        .join('\n');

    return `
You are an IMVU chat bot named ${botName}. Your personality is strictly defined by these traits:
- Style: ${personality.style}
- Humor Level (0-100): ${personality.humor}
- Aggressiveness (0-100): ${personality.aggressiveness}
- Creativity (0-100): ${personality.creativity}
- Behavior: ${personality.behavior}
- Mode: ${personality.mode}
- Language: ${personality.language}

Based on this personality, you must continue the following conversation.
Your response should be a single, short chat message. Do not use your name in the response.

Conversation History:
${historyText}

${botName}:`;
};

export const generateBotResponse = async (
    personality: AIPersonality,
    history: Message[],
    botName: string,
    provider: AIProvider
): Promise<string> => {
    const mockResponses = ["lol that's funny", "idk", "cool", "what do you mean?", "nice outfit!"];

    if (provider === 'gpt' || !process.env.API_KEY || process.env.API_KEY === DUMMY_API_KEY) {
        if(provider === 'gemini') console.warn("Gemini API key is not set. Using mock response.");
        await new Promise(res => setTimeout(res, 500 + Math.random() * 500));
        return mockResponses[Math.floor(Math.random() * mockResponses.length)];
    }
    
    const prompt = generatePrompt(personality, history, botName);
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        const text = response.text.trim();
        // Post-process to ensure it's a single line chat message
        return text.split('\n')[0] || mockResponses[0];

    } catch (error) {
        console.error("Error generating Gemini response:", error);
        return "I'm not sure what to say.";
    }
};

export const summarizeRoom = async (history: Message[]): Promise<string> => {
    await new Promise(res => setTimeout(res, 300));
    if (history.length === 0) return "The room is quiet.";
    const lastMessage = history[history.length - 1];
    return `The last message was from ${lastMessage.author}: "${lastMessage.text}". The conversation seems casual.`;
};


export const detectEmotions = async (text: string): Promise<string> => {
    await new Promise(res => setTimeout(res, 200));
    const emotions = ['happy', 'neutral', 'curious'];
    return emotions[Math.floor(Math.random() * emotions.length)];
};


export const coordinateDialogue = async (botA: Bot, botB: Bot, history: Message[]): Promise<{ botToSpeak: string, message: string }> => {
    await new Promise(res => setTimeout(res, 1000));
    
    // Simple turn-based logic
    const lastSpeakerId = history.length > 0 ? history[history.length - 1].authorId : botB.id;
    const botToSpeak = lastSpeakerId === botB.id ? botA : botB;

    const message = await generateBotResponse(botToSpeak.personality, history, botToSpeak.name, botToSpeak.aiProvider);

    return {
        botToSpeak: botToSpeak.id,
        message,
    };
};