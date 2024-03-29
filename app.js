async function sendMessage() {
    const userInputField = document.getElementById('user-input');
    const userInput = userInputField.value.trim();

    if (!userInput) return; // Exit if the input is empty

    // Display user's message
    document.getElementById('user-message').textContent = `You: ${userInput}`;
    userInputField.value = ''; // Clear input field

    const serverEndpoint = 'http://100.85.94.71:1234/v1/chat/completions'; // Your backend endpoint

    try {
        const response = await fetch(serverEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // If your server requires authentication, add your headers here
            },
            body: JSON.stringify({
                messages: [{
                    role: "user",
                    content: userInput
                }]
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Assuming 'data' includes the chatbot's response in a property similar to the OpenAI API structure
        const botReply = data.choices && data.choices.length > 0 ? data.choices[0].message.content : "I'm not sure how to respond to that.";

        // Update chat interface with bot's response
        document.getElementById('bot-message').textContent = `Bot: ${botReply}`;
    } catch (error) {
        console.error('Error sending message to server:', error);
        document.getElementById('bot-message').textContent = `Bot: Sorry, I can't respond right now.`;
    }
}

document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();
    sendMessage();
});
