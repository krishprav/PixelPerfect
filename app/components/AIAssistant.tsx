'use client';

import React, { useState } from 'react';
import { BrainCircuit, Zap, Sparkles, Wand2 } from 'lucide-react';
import { AIService } from './AIService';

interface AIAssistantProps {
  challenge: any;
  onCodeGenerate: (code: string) => void;
  onCodeFix: () => void;
  onClose: () => void;
}

const AIAssistant = ({ challenge, onCodeGenerate, onCodeFix, onClose }: AIAssistantProps) => {
  const [prompt, setPrompt] = useState('');
  const [generating, setGenerating] = useState(false);
  const [aiResponse, setAiResponse] = useState('');
  const [messages, setMessages] = useState([
    { role: 'assistant', content: `Hello! I'm your AI coding assistant. I can help you with the "${challenge.title}" challenge. How can I assist you today?` },
  ]);

  const handleSendPrompt = async () => {
    if (!prompt.trim()) return;
    const newMessages = [...messages, { role: 'user', content: prompt }];
    setMessages(newMessages);
    setGenerating(true);
    try {
      setMessages([...newMessages, { role: 'assistant', content: '...', isTyping: true }]);
      if (prompt.toLowerCase().includes('generate') || prompt.toLowerCase().includes('create') || prompt.toLowerCase().includes('make')) {
        const code = await AIService.generateCode(prompt, challenge);
        setAiResponse(code);
        setMessages([...newMessages, { role: 'assistant', content: 'Here\'s the code I generated based on your request:', hasCode: true, code }]);
      } else if (prompt.toLowerCase().includes('hint') || prompt.toLowerCase().includes('help')) {
        const hint = await AIService.getAIHint(challenge);
        setMessages([...newMessages, { role: 'assistant', content: `Pro tip: ${hint}` }]);
      } else {
        setTimeout(() => {
          setMessages([...newMessages, { role: 'assistant', content: `I'll help you with that. For the "${challenge.title}" challenge, focus on the key requirements like color palette, spacing, and interactive states.` }]);
        }, 1000);
      }
    } catch (error) {
      setMessages([...newMessages, { role: 'assistant', content: 'Sorry, I encountered an error while processing your request. Please try again.' }]);
    } finally {
      setGenerating(false);
      setPrompt('');
    }
  };

  const handleGenerateCode = () => {
    if (aiResponse) onCodeGenerate(aiResponse);
  };

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-xl w-full max-w-md absolute right-8 bottom-24 z-50 overflow-hidden flex flex-col">
      <div className="p-3 bg-gray-750 border-b border-gray-700 flex items-center justify-between">
        <div className="flex items-center">
          <BrainCircuit className="w-5 h-5 text-purple-400 mr-2" />
          <h3 className="text-white font-medium">AI Assistant</h3>
        </div>
        <button className="text-gray-400 hover:text-gray-200" onClick={onClose}>×</button>
      </div>
      <div className="p-3 flex-1 max-h-96 overflow-y-auto bg-gray-850">
        {messages.map((message, index) => (
          <div key={index} className={`mb-3 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
            <div className={`inline-block rounded-lg px-3 py-2 max-w-xs ${message.role === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-white'}`}>
              {message.isTyping ? (
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              ) : message.hasCode ? (
                <div>
                  <p className="mb-2">{message.content}</p>
                  <div className="bg-gray-900 p-2 rounded text-xs font-mono text-left overflow-x-auto">
                    <pre>{message.code.substring(0, 150)}...</pre>
                  </div>
                  <button className="mt-2 text-xs bg-purple-600 hover:bg-purple-700 text-white px-2 py-1 rounded" onClick={handleGenerateCode}>
                    Use This Code
                  </button>
                </div>
              ) : (
                <p>{message.content}</p>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="p-3 border-t border-gray-700 bg-gray-750">
        <div className="flex gap-2">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendPrompt()}
            placeholder="Ask for help or code generation..."
            className="flex-1 bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            disabled={generating}
          />
          <button
            onClick={handleSendPrompt}
            disabled={generating || !prompt.trim()}
            className={`px-3 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 flex items-center justify-center ${generating || !prompt.trim() ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <Zap className="w-4 h-4" />
          </button>
        </div>
        <div className="flex gap-2 mt-2">
          <button className="text-xs bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded flex-1 flex items-center justify-center" onClick={() => setPrompt('Generate a button component')}>
            <Sparkles className="w-3 h-3 mr-1" /> Generate Component
          </button>
          <button className="text-xs bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded flex-1 flex items-center justify-center" onClick={() => setPrompt('Fix my current code')}>
            <Wand2 className="w-3 h-3 mr-1" /> Fix Issues
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;