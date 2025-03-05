'use client';

import React from 'react';
import Image from 'next/image';

interface ChallengeProps {
  challenge: {
    title: string;
    description: string;
    requirements: string[];
    referenceImage?: string;
    tags: string[];
  };
}

const Challenge = ({ challenge }: ChallengeProps) => {
  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <h3 className="text-lg font-semibold text-white mb-2">{challenge.title}</h3>
      <p className="text-gray-300 text-sm mb-4">{challenge.description}</p>
      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-300 mb-2">Requirements:</h4>
        <ul className="list-disc list-inside text-gray-400 text-sm space-y-1">
          {challenge.requirements.map((req, index) => (
            <li key={index}>{req}</li>
          ))}
        </ul>
      </div>
      {challenge.referenceImage && (
  <div className="mb-4">
    <h4 className="text-sm font-medium text-gray-300 mb-2">Reference Design:</h4>
    <div className="bg-gray-750 p-2 rounded">
      <Image
        src={challenge.referenceImage}
        alt="Reference design"
        width={800} // Replace with actual width
        height={600} // Replace with actual height
        className="w-full rounded"
      />
    </div>
  </div>
)}
      <div className="flex flex-wrap gap-2 mt-3">
        {challenge.tags.map((tag, index) => (
          <span key={index} className="bg-gray-700 text-blue-300 text-xs px-2 py-1 rounded">{tag}</span>
        ))}
      </div>
    </div>
  );
};

export default Challenge;