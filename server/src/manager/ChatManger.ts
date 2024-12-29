import { Socket } from "socket.io";

export interface Chat {
    message: string;
    timestamp: Date;
}

export class ChatManager {
    // Use Map with Socket as the key
    private socketChatMap: Map<Socket, Chat[]>;

    constructor() {
        this.socketChatMap = new Map<Socket, Chat[]>();
    }
    addNewSocket(socket: Socket) {
        if (!this.socketChatMap.has(socket)) {
            this.socketChatMap.set(socket, []);
            console.log(`Socket registered: ${socket.id}`);
        } else {
            console.log(`Socket already registered: ${socket.id}`);
        }
    }

  
    addMessage(socket: Socket, message: string) {
        const chats = this.socketChatMap.get(socket);

        if (!chats) {
            console.error(`Cannot add message. Socket ${socket.id} is not registered.`);
            return;
        }

        chats.push({ message, timestamp: new Date() });
        console.log(`Message added for socket ${socket.id}: ${message}`);
    }
   
    getAllMsg(): Map<Socket, Chat[]> {
        return this.socketChatMap;
    }
}
