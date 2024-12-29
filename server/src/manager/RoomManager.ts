
import { Socket } from "socket.io"
import { User } from "./UserManger"
import {v4 as uuidv4} from 'uuid'
interface Room {
    users: User[]
    // roomSocket: Socket;
}

export class RoomManger {

    private rooms: Map<string, Room>

    constructor() {
        this.rooms = new Map<string, Room>()

    }

    // create a new room for initial user
    createRoom(user: User) {
        const roomId = this.generate();
        // console.log(roomId);

        this.rooms.set(roomId, {
                users: [user]
            }
        )

        // Join the room
        user.socket.join(roomId)

        // Notify the user of the room creation
        user.socket.emit("send-offer", {
            roomId
        })

        // console.log(`Room created : ${user.name}  and ${roomId}`);

    }

    // joit the user in to already created room
    joinRoom(roomId: string, user: User) {

        // console.log('join user')

        const room = this.rooms.get(roomId);

        
        if (!room) {
            user.socket.emit("error", { message: "Room not found." });
            return;
        }

        // add new socket or user in room , by using uniq
        room.users.push(user);

        // Join the room
        user.socket.join(roomId);

        // console.log(room.users.length);
        room.users.push(user);

    
        // Notify the user of the room creation      
        user.socket.emit("send-offer", {
            roomId
        })
        
        // console.log(`Room joined : ${user.name}  and ${roomId}`);
    }

    getUserName(roomId: string, socket: Socket): string {
        // Retrieve the room using the roomId
        const room = this.rooms.get(roomId);
    
        // Check if the room exists
        if (!room) {
            // console.log(`Room with ID ${roomId} not found.`);
            return '';
        }
    
        // Find the user in the room whose socket ID matches the provided socket
        const user = room.users.find((u) => u.socket.id === socket.id);
    
        // Return the username if found, otherwise return an empty string
        if (user) {
            return user.name;
        } else {
            console.log(`User not found in room ${roomId} for socket ID ${socket.id}.`);
            return '----error---';
        }
    }
    
    private generate() {
        return uuidv4();
    }
}