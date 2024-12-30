import { Socket } from "socket.io";
import http from 'http';
import { Server } from 'socket.io';
import { User, UserManger } from "./manager/UserManger";
import { RoomManger } from "./manager/RoomManager";




// create server and express componet 
const server = http.createServer(http)

const io = new Server(server, {
    cors: {
        origin: '*'
    }
});


const roomsManger = new RoomManger();
const userManger = new UserManger();


io.on('connection', (socket: Socket) => {
    console.log('a user connected');
    // console.log('socket id - ' + socket.id)

    socket.on("disconnect", () => {
        console.log("user disconnected");
        // console.log(socket.id);
    })

    // user create new room
    socket.on('create-room', ( {name} : { name: string }) => {
        const user: User = userManger.createUser(socket, name)
        roomsManger.createRoom(user)
        // console.log(`Room created by user: ${name}`)
    })


    // new user join in room
    socket.on('join-room', ({ roomId, name }: { roomId: string; name: string }) => {
        // console.log('Join new user');
    
        // Create a new user instance
        const user: User = userManger.createUser(socket, name);
    
        // Join the user to the specified room
        roomsManger.joinRoom(roomId, user);
        // console.log(`Room joined by user: ${name}, Room ID: ${roomId}`);
    })

    // Relay messages to other clients in the room
    socket.on("message", ({ roomId, message, timestamp }) => {
        // console.log(`[${timestamp}] Message in room ${roomId} from ${socket.id}: ${message}`);

        const name =  roomsManger.getUserName(roomId, socket)
        // Forward the message along with the timestamp to other clients
        socket.to(roomId).emit("message", { 
            sender: name, 
            message,
            timestamp
        });
    });

});

server.listen(3000, () => {
    console.log('listening on *:3000');
});