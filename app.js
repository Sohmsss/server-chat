const openAiApiKey = 'lm-studio';

async function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    const userMessageElement = document.getElementById('user-message');
    const botMessageElement = document.getElementById('bot-message');

    userMessageElement.textContent = `You: ${userInput}`;

    const data = {
        model: "TheBloke/Mistral-7B-Instruct-v0.2-GGUF/mistral-7b-instruct-v0.2.Q6_K.gguf",
        messages: [{
            role: "user",
            content: userInput
        }]
    };

    try {
        const response = await fetch('http://localhost:1234/v1', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${openAiApiKey}`
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log(result);

        // Update the chat with the bot's response
        botMessageElement.textContent = `Bot: ${result.choices[0].message.content}`;
    } catch (error) {
        console.error('Error calling the OpenAI API:', error);
        botMessageElement.textContent = `Bot: Sorry, I encountered an error.`;
    }

    // Clear the input field for the next message
    document.getElementById('user-input').value = '';
}

// To prevent form submission
document.querySelector('form').addEventListener('submit', function (event) {
    event.preventDefault();
    sendMessage();
});
