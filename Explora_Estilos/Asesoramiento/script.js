document.addEventListener('DOMContentLoaded', function() {
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');

    sendButton.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    function sendMessage() {
        const userMessage = userInput.value.trim();
        if (userMessage) {
            appendMessage('user', userMessage);
            userInput.value = '';
            setTimeout(() => {
                getBotResponse(userMessage);
            }, 1000);
        }
    }

    function appendMessage(sender, message) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', sender);
        messageElement.innerHTML = `
            <img src="${sender === 'bot' ? '../imagenes/path_to_bot_logo.png' : '../imagenes/path_to_user_avatar.png'}" alt="${sender}">
            <div class="message-content">${message}</div>
        `;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function getBotResponse(message) {
        const botMessage = `Puedes usar este estilo, espero que te guste.`; // Aquí puedes poner la lógica para generar la respuesta del bot
        appendMessage('bot', botMessage);
    }

    // Mensaje de bienvenida del bot
    appendMessage('bot', 'Hola, ¿en qué puedo ayudarte?');
});
