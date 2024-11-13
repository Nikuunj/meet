import { Socket } from "socket.io";
import http from "http";
import express from 'express';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(http);

const io = new Server(server, {
    cors: {
        origin: "*"
    }
});

io.on('connection', (socket: Socket) => {
    console.log('a user connected');
    socket.on("disconnect", () => {
        console.log("user disconnected");
    })
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});