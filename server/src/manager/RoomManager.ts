import { Socket } from "socket.io";

interface User {
    socket : Socket;
    name : string;
}

export class RoomManager {
    private users : User[];
    constructor() {
        this.users = [];
    }

    addNew(name: string , socket: Socket) {
        this.users.push({
            name,
            socket
        })
    }

    removeUser(socketId: string) {
        const user = this.users.find(x => x.socket.id === socketId);
        this.users = this.users.filter(x => x.socket.id !== socketId);
    }
}