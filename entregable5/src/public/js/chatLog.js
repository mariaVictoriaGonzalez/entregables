function initChat() {
    const socket = io();
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');
    const chatMessages = document.getElementById('chat-messages');

    sendButton.addEventListener('click', () => {
        sendMessage();
    });

    socket.on('chat message', (msg) => {
        displayMessage(msg);
    });

    function sendMessage() {
        const message = messageInput.value;
        if (message.trim() !== '') {
            socket.emit('chat message', message);
            messageInput.value = '';
        }
    }

    function displayMessage(msg) {
        const li = document.createElement('li');
        li.textContent = msg;
        chatMessages.appendChild(li);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initChat();
});
