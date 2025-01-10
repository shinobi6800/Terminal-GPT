require('dotenv').config();
const { OpenAI } = require('openai');
const readlineSync = require('readline-sync');
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, 
});

async function startChat() {
  console.log('Hi, Im Terminal GPT . Ask me anything \n Type "exit" to end the chat.');

  while (true) {
    const userInput = readlineSync.question('You: ');
    if (userInput.toLowerCase() === 'exit') {
      console.log('Chatbot: Goodbye!');
      break;
    }

    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant.',
          },
          {
            role: 'user',
            content: userInput,
          },
        ],
      });

      const botReply = response.choices[0].message.content;
      console.log('Chatbot:', botReply);
    } catch (error) {
      console.error('Error calling OpenAI API:', error);
    }
  }
}

startChat();
