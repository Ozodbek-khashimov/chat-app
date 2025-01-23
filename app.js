// Login sahifasi
let username = null;

document.getElementById('login-btn').addEventListener('click', () => {
    username = document.getElementById('username').value.trim();
    if (username) {
        document.getElementById('login-page').style.display = 'none';
        document.getElementById('chat-page').style.display = 'block';
    } else {
        alert('Please enter a username.');
    }
});

// WebSocket ulanish
const socket = new WebSocket('ws://localhost:3000');

socket.onopen = () => {
    console.log('Connected to the server.');
};

socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    const messages = document.getElementById('messages');
    messages.innerHTML += `<p><strong>${data.user}</strong>: ${data.message} <em>${data.time}</em></p>`;
    messages.scrollTop = messages.scrollHeight; // Auto-scroll
};

// Xabar yuborish
document.getElementById('send-btn').addEventListener('click', () => {
    const messageInput = document.getElementById('message-input');
    const message = messageInput.value.trim();
    if (message) {
        const data = {
            user: username,
            message,
            time: new Date().toLocaleTimeString(),
        };
        socket.send(JSON.stringify(data));
        messageInput.value = ''; // Inputni tozalash
    }
});
