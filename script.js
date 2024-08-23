document.addEventListener('DOMContentLoaded', () => {
    const messages = document.getElementById('messages');
    const usernameInput = document.getElementById('username');
    const messageInput = document.getElementById('message');
    const sendButton = document.getElementById('send');
    const dbRef = firebase.database().ref('messages');

    const displayMessage = (username, message) => {
        const msgElement = document.createElement('div');
        msgElement.textContent = `${username}: ${message}`;
        messages.appendChild(msgElement);
        messages.scrollTop = messages.scrollHeight;
    };

    dbRef.on('child_added', (snapshot) => {
        const data = snapshot.val();
        displayMessage(data.username, data.message);
    });

    sendButton.addEventListener('click', () => {
        const username = usernameInput.value.trim();
        const message = messageInput.value.trim();
        if (username && message) {
            dbRef.push({
                username: username,
                message: message
            }).then(() => {
                messageInput.value = '';
            }).catch((error) => {
                console.error('Error sending message:', error);
            });
        } else {
            console.log('Username or message is empty');
        }
    });

    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendButton.click();
        }
    });
});
