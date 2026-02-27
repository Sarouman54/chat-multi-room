// server/index.js

import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();

app.use(express.static('client'));

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' }});

io.on('connection', (socket) => {
	console.log("Client connecté :", socket.id);

	socket.emit('receive_message', { msg: "Bienvenue dans le chat !" });

	socket.on('join_room', (data) => {
		socket.join(data.room);
		console.log(`Client ${socket.id} a rejoint la salle ${data.room}`);
	});

	socket.on('send_message', (data) => {
		io.to(data.room).emit('receive_message', data);
		console.log(`Client ${socket.id} a envoyé un message dans la salle ${data.room}`);
	});

	socket.on('disconnect', () => {
		console.log("Client déconnecté", socket.id);
	});
})

server.listen(3000, () => console.log("Chat Multi-Room running on 3000"));