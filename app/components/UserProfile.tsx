'use client';

import React from 'react';
import { User, Trophy, Heart, Award } from 'lucide-react';

interface UserProfileProps {
  user: any;
  onClose: () => void;
}

const UserProfile = ({ user, onClose }: UserProfileProps) => {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-xl w-full max-w-md absolute right-8 top-20 z-50 overflow-hidden">
      <div className="p-3 bg-gray-750 border-b border-gray-700 flex items-center justify-between">
        <div className="flex items-center">
          <User className="w-5 h-5 text-blue-400 mr-2" />
          <h3 className="text-white font-medium">Your Profile</h3>
        </div>
        <button className="text-gray-400 hover:text-gray-200" onClick={onClose}>×</button>
      </div>
      <div className="p-4">
        <div className="flex items-center mb-4">
          <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center text-white text-2xl font-bold">
            {user.name.charAt(0)}
          </div>
          <div className="ml-4">
            <h4 className="text-white font-semibold">{user.name}</h4>
            <p className="text-gray-400 text-sm">{user.email}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-blue-900/30 rounded p-3 text-center">
            <div className="text-2xl font-bold text-white">{user.level}</div>
            <div className="text-blue-300 text-xs">Level</div>
          </div>
          <div className="bg-purple-900/30 rounded p-3 text-center">
            <div className="text-2xl font-bold text-white">{user.points}</div>
            <div className="text-purple-300 text-xs">Points</div>
          </div>
          <div className="bg-green-900/30 rounded p-3 text-center">
            <div className="text-2xl font-bold text-white">{user.completedChallenges}</div>
            <div className="text-green-300 text-xs">Challenges</div>
          </div>
          <div className="bg-yellow-900/30 rounded p-3 text-center">
            <div className="text-2xl font-bold text-white">#{user.rank}</div>
            <div className="text-yellow-300 text-xs">Ranking</div>
          </div>
        </div>
        <div className="mt-4">
          <h4 className="text-white font-semibold mb-2">Recent Achievements</h4>
          <div className="space-y-2">
            <div className="bg-gray-750 rounded p-2 flex items-center">
              <Trophy className="w-4 h-4 text-yellow-400 mr-2" />
              <span className="text-gray-300 text-sm">Completed 10 challenges</span>
            </div>
            <div className="bg-gray-750 rounded p-2 flex items-center">
              <Heart className="w-4 h-4 text-red-400 mr-2" />
              <span className="text-gray-300 text-sm">Received 5 likes on your solutions</span>
            </div>
            <div className="bg-gray-750 rounded p-2 flex items-center">
              <Award className="w-4 h-4 text-purple-400 mr-2" />
              <span className="text-gray-300 text-sm">Reached level 3</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;