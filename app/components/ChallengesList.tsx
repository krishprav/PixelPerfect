'use client';

import React from 'react';
import { Layout, ArrowRight } from 'lucide-react';

interface ChallengesListProps {
  onSelectChallenge: (challenge: any) => void;
  onBack: () => void;
}

const ChallengesList = ({ onSelectChallenge, onBack }: ChallengesListProps) => {
  const challenges = [
    { id: '1', title: 'Button Component', description: 'Create a versatile button component with primary and secondary variants.', difficulty: 'Beginner', points: 100, completions: 245, tags: ['HTML', 'CSS', 'Components'] },
    { id: '2', title: 'Card Layout', description: 'Design a responsive card layout with image, text, and action buttons.', difficulty: 'Intermediate', points: 200, completions: 178, tags: ['HTML', 'CSS', 'Layout', 'Responsive'] },
    { id: '3', title: 'Navigation Menu', description: 'Create a responsive navigation menu with dropdown functionality.', difficulty: 'Intermediate', points: 250, completions: 132, tags: ['HTML', 'CSS', 'JavaScript', 'Navigation'] },
    { id: '4', title: 'Form Elements', description: 'Design accessible and stylish form elements including inputs, checkboxes, and radio buttons.', difficulty: 'Advanced', points: 300, completions: 98, tags: ['HTML', 'CSS', 'Forms', 'Accessibility'] },
    { id: '5', title: 'Modal Dialog', description: 'Create a modal dialog component with animations and focus management.', difficulty: 'Advanced', points: 350, completions: 87, tags: ['HTML', 'CSS', 'JavaScript', 'Accessibility'] },
  ];

  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <header className="bg-gray-800 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Layout className="w-6 h-6 text-blue-400 mr-2" />
            <h1 className="text-xl font-bold text-white">PixelPerfect Challenges</h1>
          </div>
          <button className="text-gray-400 hover:text-white" onClick={onBack}>Back to Dashboard</button>
        </div>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {challenges.map((challenge) => (
          <div key={challenge.id} className="bg-gray-800 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
            <div className="h-32 bg-gray-750 flex items-center justify-center">
              <Layout className="w-12 h-12 text-gray-600" />
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className={`text-xs px-2 py-1 rounded ${challenge.difficulty === 'Beginner' ? 'bg-green-900/30 text-green-300' : challenge.difficulty === 'Intermediate' ? 'bg-yellow-900/30 text-yellow-300' : 'bg-red-900/30 text-red-300'}`}>
                  {challenge.difficulty}
                </span>
                <span className="text-sm text-blue-300">{challenge.points} pts</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{challenge.title}</h3>
              <p className="text-gray-400 text-sm mb-4">{challenge.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {challenge.tags.map((tag, index) => (
                  <span key={index} className="bg-gray-700 text-blue-300 text-xs px-2 py-1 rounded">{tag}</span>
                ))}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-xs">{challenge.completions} completions</span>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm flex items-center" onClick={() => onSelectChallenge(challenge)}>
                  Start <ArrowRight className="w-3 h-3 ml-1" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChallengesList;