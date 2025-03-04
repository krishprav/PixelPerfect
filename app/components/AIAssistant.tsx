// app/components/AIAssistant.tsx
'use client';

import React, { useState } from 'react';

// Define the Message type
type Message = {
  role: string;
  content: string;
  isTyping?: boolean;
};

const AIAssistant = ({ challenge, onCodeGenerate, onCodeFix, onClose }) => {
  const [prompt, setPrompt] = useState('');
  const [generating, setGenerating] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: `Hello! I'm your AI coding assistant. I can help you with the "${challenge.title}" challenge. How can I assist you today?` },
  ]);

  const handleSendPrompt = async () => {
    if (!prompt.trim()) return;
    const newMessages: Message[] = [...messages, { role: 'user', content: prompt }];
    setMessages(newMessages);
    setGenerating(true);
    try {
      // This line now works with the updated type
      setMessages([...newMessages, { role: 'assistant', content: '...', isTyping: true }]);
      // Simulate an AI response (replace with your actual logic)
      setTimeout(() => {
        setMessages([...newMessages, { role: 'assistant', content: 'Here’s my response!' }]);
        setGenerating(false);
        setPrompt('');
      }, 1000);
    } catch (error) {
      setMessages([...newMessages, { role: 'assistant', content: 'Sorry, an error occurred.' }]);
      setGenerating(false);
    }
  };

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg w-full max-w-md">
      <div className="p-3 flex-1 max-h-96 overflow-y-auto bg-gray-850">
        {messages.map((message, index) => (
          <div key={index} className={`mb-3 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
            <div className={`inline-block rounded-lg px-3 py-2 ${message.role === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-white'}`}>
              {message.isTyping ? (
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              ) : (
                <p>{message.content}</p>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="p-3 border-t border-gray-700 bg-gray-750">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendPrompt()}
          placeholder="Ask for help..."
          className="flex-1 bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white text-sm"
          disabled={generating}
        />
        <button onClick={handleSendPrompt} disabled={generating || !prompt.trim()}>
          Send
        </button>
      </div>
    </div>
  );
};

export default AIAssistant;