import { Socket } from "socket.io";
import { RoomManager } from "./RoomManager";
import {v4 as uuidv4} from 'uuid';

interface Meet {
    room : RoomManager
}

class MeetManager {
    private meets : Map<string, Meet>;

    constructor() {
        this.meets = new Map<string, Meet>();
    }

    // take data from first user and add to meet
    createMeet(name: string, socket: Socket): string {
        const meetId = uuidv4(); // Generate a unique meet ID
        const roomManager = new RoomManager(); // Create a new RoomManager instance (assuming this is how it's initialized)
        roomManager.addNew(name, socket);
        // Add the new meet to the meets map
        this.meets.set(meetId, { room: roomManager });

        return meetId; // Return the newly created meetId
    }
    
    // Optional: Method to get a meet by ID
    getMeet(meetId: string): Meet | boolean {
        return this.meets.get(meetId) !== undefined;
        return false;
    }


}