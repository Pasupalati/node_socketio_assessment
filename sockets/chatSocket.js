const { addMessageToRoom } = require('../models/chatRoomModel');

const chatSocket = (io) => {
    io.on('connection', (socket) => {
        console.log('a user connected:', socket.id);

        socket.on('joinRoom', ({ roomId, username }) => {
            socket.join(roomId);
            console.log(`${username} joined room: ${roomId}`);
            socket.to(roomId).emit('message', { user: 'admin', message: `${username} has joined the room` });
        });

        socket.on('leaveRoom', ({ roomId, username }) => {
            socket.leave(roomId);
            console.log(`${username} left room: ${roomId}`);
            socket.to(roomId).emit('message', { user: 'admin', message: `${username} has left the room` });
        });

        socket.on('sendMessage', async ({ roomId, message, username }) => {
            const msg = { user: username, message, timestamp: new Date() };
            try {
                await addMessageToRoom(roomId, msg);
                io.to(roomId).emit('message', msg);
            } catch (error) {
                console.error(error);
            }
        });

        socket.on('disconnect', () => {
            console.log('user disconnected:', socket.id);
        });
    });
};

module.exports = chatSocket;
