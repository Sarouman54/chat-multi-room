// client/app.js

const socket = io('http://localhost:3000');

const roomSelect = document.getElementById('roomSelect');

const messageInput = document.getElementById('messageInput');
const chat = document.getElementById('chat');

const joinBtn = document.getElementById('joinBtn');
const sendBtn = document.getElementById('sendBtn');

let currentRoom = '';

socket.on('receive_message', (data) => {
	const messageElement = document.createElement('div');
	messageElement.className = 'message';
	messageElement.innerText = data.msg;
	chat.appendChild(messageElement);
})

joinBtn.addEventListener('click', () => {
	currentRoom = roomSelect.value;
	socket.emit('join_room', { room: currentRoom });
});

sendBtn.addEventListener('click', () => {
	const msg = messageInput.value;

	if(msg.trim() === '' || currentRoom === '') return;

	socket.emit('send_message', { room: currentRoom, msg });
	messageInput.value = '';
});