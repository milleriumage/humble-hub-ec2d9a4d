import { Client } from '../imvu.js-master/packages/client/src/index';
import { Room } from '../imvu.js-master/packages/client/src/resources/Room';
import { Message, RoomUser } from '../types';

type MessageCallback = (message: Message) => void;
type LogCallback = (log: string) => void;
type UserJoinedCallback = (roomId: string, user: RoomUser) => void;
type UserLeftCallback = (roomId: string, userId: string, userName: string) => void;

class ImvuService {
    private messageCallback: MessageCallback | null = null;
    private logCallback: LogCallback | null = null;
    private userJoinedCallback: UserJoinedCallback | null = null;
    private userLeftCallback: UserLeftCallback | null = null;
    private clients: Map<string, Client> = new Map(); // botId -> Client instance

    constructor() {
        // Listeners for real-time events will be set up here once @imvu/imq is integrated.
    }

    public onMessage(callback: MessageCallback) { this.messageCallback = callback; }
    public onLog(callback: LogCallback) { this.logCallback = callback; }
    public onUserJoined(callback: UserJoinedCallback) { this.userJoinedCallback = callback; }
    public onUserLeft(callback: UserLeftCallback) { this.userLeftCallback = callback; }
    
    public async login(botId: string, username: string, password?: string): Promise<boolean> {
        if (this.clients.has(botId)) {
            const client = this.clients.get(botId);
            this.log(`[${client?.account.username}] Already logged in.`);
            return true;
        }

        try {
            this.log(`[${username}] Attempting to login...`);
            const client = new Client();
            if (!password) {
                this.log(`[${username}] Login failed: Password is required for real authentication.`);
                return false;
            }

            // Perform the actual login using the imvu.js client
            await client.login(username, password);
            
            this.clients.set(botId, client);
            this.log(`[${client.account.username}] Logged in successfully.`);
            return true;
        } catch (error: any) {
            this.log(`[${username}] Login failed: ${error.message}`);
            console.error(error);
            return false;
        }
    }

    public async logout(botId: string): Promise<void> {
        const client = this.clients.get(botId);
        if (client) {
            await client.logout(); // This is an empty async function in the SDK but good practice to call
            this.log(`[${client.account.username}] Logged out.`);
            this.clients.delete(botId);
        }
    }

    public async getRooms(botId: string): Promise<{id: string, name: string}[]> {
        const client = this.clients.get(botId);
        if (!client) {
            this.log(`[Bot ${botId}] Cannot get rooms, not logged in.`);
            return [];
        }

        try {
            this.log(`[${client.account.username}] Fetching public rooms...`);
            // The real SDK's search method can be used to find rooms.
            // Empty params should fetch public/featured rooms.
            const rooms: Room[] = await client.rooms.search({});
            return rooms.map(room => ({ id: room.id, name: room.name }));
        } catch (error: any) {
            this.log(`[${client.account.username}] Failed to fetch rooms: ${error.message}`);
            console.error(error);
            return [];
        }
    }

    public joinRoom(botId: string, roomName: string): string | null {
        const client = this.clients.get(botId);
        if (!client) {
            this.log(`[${botId}] Cannot join room, not logged in.`);
            return null;
        }

        // TODO: Implement actual room joining via @imvu/imq package.
        // This requires a separate WebSocket connection and handling the IMQ protocol.
        const botName = client.account.username;
        this.log(`[${botName}] Simulating join for room: ${roomName}. (Real implementation pending @imvu/imq integration)`);
        
        const roomId = `room-${roomName.replace(/\s+/g, '-').toLowerCase()}`;

        // Simulate the bot joining message for UI purposes
        setTimeout(() => {
            this.messageCallback?.({
                id: `msg-${Date.now()}`,
                roomId: roomId,
                author: 'System',
                authorId: 'system',
                text: `${botName} has joined the room.`,
                timestamp: Date.now(),
                type: 'system',
            });
        }, 500);
        return roomId;
    }

    public leaveRoom(botId: string, roomId: string) {
        const client = this.clients.get(botId);
        if (!client) return;
        
        const botName = client.account.username;
        this.log(`[${botName}] Simulating leaving room ID: ${roomId}. (Real implementation pending @imvu/imq integration)`);
    }

    public sendMessage(botId: string, roomId: string, text: string) {
        const client = this.clients.get(botId);
        if (!client) return;

        const author = client.account.username;
        this.log(`[${author}] Simulating sending message in ${roomId}: "${text}". (Real implementation pending @imvu/imq integration)`);

        // Simulate message appearing in chat for UI purposes
        this.messageCallback?.({
            id: `msg-${Date.now()}`,
            roomId,
            author,
            authorId: botId,
            text,
            timestamp: Date.now(),
            type: 'bot',
        });
    }

    private log(logMessage: string) {
        const timestamp = new Date().toLocaleTimeString();
        this.logCallback?.(`[${timestamp}] ${logMessage}`);
    }
}

export const imvuService = new ImvuService();
