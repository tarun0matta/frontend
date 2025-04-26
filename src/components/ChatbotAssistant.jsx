import React, { useState } from 'react';

const ChatbotAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! I'm Infinitum, your AI assistant for Infinity POS. How can I help you today?", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim() === '') return;

    setMessages([...messages, { text: input, sender: 'user' }]);
    setInput('');

    // AI response generation
    setTimeout(() => {
      const botResponse = generateAIResponse(input);
      setMessages(msgs => [...msgs, { text: botResponse, sender: 'bot' }]);
    }, 500);
  };

  const generateAIResponse = (userInput) => {
    const lowercaseInput = userInput.toLowerCase();
    
    // Basic information about Infinity POS
    const posInfo = {
      features: ['inventory management', 'sales tracking', 'employee management', 'reporting', 'customer relationship management'],
      pricing: 'flexible plans starting from $29/month',
      support: '24/7 customer support via email and phone',
    };

    // Generate a response based on user input
    if (lowercaseInput.includes('hello') || lowercaseInput.includes('hi')) {
      return "Hello! I'm here to assist you with any questions about Infinity POS. What would you like to know?";
    } else if (lowercaseInput.includes('feature') || lowercaseInput.includes('can it do')) {
      const randomFeature = posInfo.features[Math.floor(Math.random() * posInfo.features.length)];
      return `Infinity POS offers a wide range of features. One key feature is ${randomFeature}. Would you like to know about any specific feature?`;
    } else if (lowercaseInput.includes('price') || lowercaseInput.includes('cost')) {
      return `We offer ${posInfo.pricing}. The exact price depends on your business needs. Would you like me to arrange a call with our sales team for a personalized quote?`;
    } else if (lowercaseInput.includes('support') || lowercaseInput.includes('help')) {
      return `We provide ${posInfo.support}. Is there a specific issue you need help with?`;
    } else {
      return `As an AI assistant for Infinity POS, I can provide information about our features, pricing, and support. Could you please clarify what aspect of Infinity POS you're interested in?`;
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <div className="bg-white rounded-lg shadow-xl p-4 w-80">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Infinitum Assistant</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="h-64 overflow-y-auto mb-4">
            {messages.map((message, index) => (
              <div key={index} className={`mb-2 ${message.sender === 'user' ? 'text-right' : ''}`}>
                <span className={`inline-block p-2 rounded-lg ${message.sender === 'user' ? 'bg-indigo-100 text-indigo-800' : 'bg-gray-100 text-gray-800'}`}>
                  {message.text}
                </span>
              </div>
            ))}
          </div>
          <div className="flex">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your message..."
              className="flex-grow px-3 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={handleSend}
              className="bg-indigo-600 text-white px-4 py-2 rounded-r-lg hover:bg-indigo-700 transition duration-300"
            >
              Send
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-indigo-600 text-white rounded-full p-4 shadow-lg hover:bg-indigo-700 transition duration-300"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default ChatbotAssistant;