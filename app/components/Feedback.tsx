'use client';

import React from 'react';
import { Wand2 } from 'lucide-react';

interface FeedbackProps {
  feedback: { type: string; message: string; aiSuggestion?: string }[];
  onFixCode: () => void;
}

const Feedback = ({ feedback, onFixCode }: FeedbackProps) => {
  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">AI Feedback</h3>
        {feedback.length > 0 && (
          <button className="text-xs bg-purple-600 hover:bg-purple-700 text-white px-2 py-1 rounded flex items-center" onClick={onFixCode}>
            <Wand2 className="w-3 h-3 mr-1" /> Fix Issues
          </button>
        )}
      </div>
      {feedback.length === 0 ? (
        <div className="text-center py-4 text-gray-400">Submit your solution to receive AI feedback</div>
      ) : (
        <div className="space-y-3">
          {feedback.map((item, index) => (
            <div key={index} className={`p-3 rounded text-sm ${item.type === 'error' ? 'bg-red-900/30 text-red-200' : item.type === 'warning' ? 'bg-yellow-900/30 text-yellow-200' : item.type === 'success' ? 'bg-green-900/30 text-green-200' : 'bg-blue-900/30 text-blue-200'}`}>
              <p>{item.message}</p>
              {item.aiSuggestion && (
                <pre className="mt-1 text-xs bg-gray-900/50 p-2 rounded overflow-x-auto">{item.aiSuggestion}</pre>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Feedback;