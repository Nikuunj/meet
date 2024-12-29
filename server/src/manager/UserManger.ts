import { Socket } from "socket.io";

export interface User {
    socket: Socket;
    name: string;
}

export class UserManger {
    // constructor for usermanger
    constructor() {
    }
    createUser(socket: Socket, name: string): User {
        const user: User = {
            socket,
            name,
        };
        return user;
    }
}