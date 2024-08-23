document.addEventListener('DOMContentLoaded', () => {
    const messages = document.getElementById('messages');
    const usernameInput = document.getElementById('username');
    const messageInput = document.getElementById('message');
    const sendButton = document.getElementById('send');

    const displayMessage = (username, message) => {
        const msgElement = document.createElement('div');
        msgElement.textContent = `${username}: ${message}`;
        messages.appendChild(msgElement);
        messages.scrollTop = messages.scrollHeight;
    };

    sendButton.addEventListener('click', () => {
        const username = usernameInput.value.trim();
        const message = messageInput.value.trim();
        if (username && message) {
            displayMessage(username, message);
            messageInput.value = '';
        }
    });

    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendButton.click();
        }
    });
});
