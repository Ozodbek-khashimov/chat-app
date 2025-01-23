import { WebSocketServer } from 'ws';

// WebSocket server yaratish
const server = new WebSocketServer({ port: 3000 });

server.on('connection', (socket) => {
    console.log('A user connected.');

    socket.on('message', (data) => {
        const parsedData = JSON.parse(data);
        console.log('Received:', parsedData);

        // Xabarni barcha ulangan mijozlarga yuborish
        server.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(parsedData));
            }
        });
    });

    socket.on('close', () => {
        console.log('A user disconnected.');
    });
});

console.log('WebSocket server running on ws://localhost:3000');
