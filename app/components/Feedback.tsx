'use client';

import React from 'react';
// import { Wand2 } from 'lucide-react';

interface FeedbackProps {
  feedback: { type: string; message: string; aiSuggestion?: string }[];
  onFixCode: () => void;
}

const Feedback = ({ feedback, onFixCode }: FeedbackProps) => {
  return (
    <div>
      <h3>AI Feedback</h3>
      {feedback.length > 0 && (
        <button onClick={onFixCode}>Fix Issues</button>
      )}
      {feedback.length === 0 ? (
        <p>Submit your solution to receive AI feedback</p>
      ) : (
        <div>
          {feedback.map((item, index) => (
            <div key={index}>
              <p>{item.message}</p>
              {item.aiSuggestion && <pre>{item.aiSuggestion}</pre>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Feedback;