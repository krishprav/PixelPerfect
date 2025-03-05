'use client';

import React from 'react';
// import { Layout, ArrowRight } from 'lucide-react';

interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  points: number;
  completions: number;
  tags: string[];
}

interface ChallengesListProps {
  onSelectChallenge: (challenge: Challenge) => void;
  onBack: () => void;
}

const ChallengesList = ({ onSelectChallenge, onBack }: ChallengesListProps) => {
  const challenges: Challenge[] = [
    {
      id: '1',
      title: 'Button Component',
      description: 'Create a versatile button component with primary and secondary variants.',
      difficulty: 'Beginner',
      points: 100,
      completions: 245,
      tags: ['HTML', 'CSS', 'Components'],
    },
    {
      id: '2',
      title: 'Card Layout',
      description: 'Design a responsive card layout with image, text, and action buttons.',
      difficulty: 'Intermediate',
      points: 200,
      completions: 178,
      tags: ['HTML', 'CSS', 'Layout', 'Responsive'],
    },
    {
      id: '3',
      title: 'Navigation Menu',
      description: 'Create a responsive navigation menu with dropdown functionality.',
      difficulty: 'Intermediate',
      points: 250,
      completions: 132,
      tags: ['HTML', 'CSS', 'JavaScript', 'Navigation'],
    },
  ];

  return (
    <div>
      <h2>PixelPerfect Challenges</h2>
      <button onClick={onBack}>Back to Dashboard</button>
      {challenges.map((challenge) => (
        <div key={challenge.id}>
          <h3>{challenge.title}</h3>
          <p>{challenge.description}</p>
          <span>{challenge.difficulty}</span>
          <span>{challenge.points} pts</span>
          <div>
            {challenge.tags.map((tag, index) => (
              <span key={index}>{tag}</span>
            ))}
          </div>
          <span>{challenge.completions} completions</span>
          <button onClick={() => onSelectChallenge(challenge)}>Start</button>
        </div>
      ))}
    </div>
  );
};

export default ChallengesList;