
type SocketCallback = (...args: any[]) => void;

const randomUserNames = ['CoolDude123', 'Xx_Shadow_xX', 'Guest-4821', 'Fashionista', 'IMVU_Pro', 'Pixel_Dreamer'];
const randomMessages = [
    'Hey everyone!', 'What\'s up?', 'lol', 'Anyone want to dance?', 'This room is cool.', 'brb', 'I like your outfit!'
];

class SocketService {
    private listeners: Map<string, SocketCallback[]> = new Map();
    private activityInterval: NodeJS.Timeout | null = null;
    private connectedRooms: Set<string> = new Set();
    private roomUsers: Record<string, {id: string, name: string}[]> = {};

    public connect() {
        console.log('[SocketService] Connected');
        this.startActivity();
    }

    public disconnect() {
        console.log('[SocketService] Disconnected');
        this.stopActivity();
        this.connectedRooms.clear();
        this.roomUsers = {};
    }

    public on(event: string, callback: SocketCallback) {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, []);
        }
        this.listeners.get(event)!.push(callback);
    }

    public emit(event: string, ...args: any[]) {
        // This would send data to the server in a real implementation
        // For this mock, we can handle some client-side emits
        if (event === 'join_room') {
            const [roomId] = args;
            this.connectedRooms.add(roomId);
            if (!this.roomUsers[roomId]) {
                this.roomUsers[roomId] = [];
            }
        }
         if (event === 'leave_room') {
            const [roomId] = args;
            this.connectedRooms.delete(roomId);
            delete this.roomUsers[roomId];
        }
    }
    
    private dispatch(event: string, ...args: any[]) {
        const eventListeners = this.listeners.get(event);
        if (eventListeners) {
            eventListeners.forEach(callback => callback(...args));
        }
    }

    private startActivity() {
        if (this.activityInterval) return;
        this.activityInterval = setInterval(() => {
            this.simulateActivity();
        }, 4000);
    }

    private stopActivity() {
        if (this.activityInterval) {
            clearInterval(this.activityInterval);
            this.activityInterval = null;
        }
    }
    
    private simulateActivity() {
        if (this.connectedRooms.size === 0) return;
        
        const roomIds = Array.from(this.connectedRooms);
        const roomId = roomIds[Math.floor(Math.random() * roomIds.length)];

        const action = Math.random();

        if (action < 0.5) { // New message
            if(this.roomUsers[roomId]?.length > 0) {
                 const author = this.roomUsers[roomId][Math.floor(Math.random() * this.roomUsers[roomId].length)];
                 const text = randomMessages[Math.floor(Math.random() * randomMessages.length)];
                 this.dispatch('message', { roomId, authorId: author.id, author: author.name, text });
            }
        } else if (action < 0.75) { // User joins
             if (this.roomUsers[roomId]?.length < 5) {
                const name = randomUserNames[Math.floor(Math.random() * randomUserNames.length)];
                const user = { id: `user-${name}-${Date.now()}`, name };
                this.roomUsers[roomId].push(user);
                this.dispatch('user_joined', roomId, user);
            }
        } else { // User leaves
            if (this.roomUsers[roomId]?.length > 0) {
                const userIndex = Math.floor(Math.random() * this.roomUsers[roomId].length);
                const [user] = this.roomUsers[roomId].splice(userIndex, 1);
                this.dispatch('user_left', roomId, user.id, user.name);
            }
        }
    }
}

export const socketService = new SocketService();
