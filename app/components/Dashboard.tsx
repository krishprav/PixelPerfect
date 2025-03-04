'use client';

import React from 'react';
import { Layout, Zap, Bell, HelpCircle, Trophy, Award, User as UserIcon, Bot, Code2, MessageSquare } from 'lucide-react';

interface DashboardProps {
  user: any;
  onLogout: () => void;
  onStartChallenge: (challenge: any) => void;
}

const Dashboard = ({ user, onLogout, onStartChallenge }: DashboardProps) => {
  const featuredChallenges = [
    { id: '1', title: 'Button Component', difficulty: 'Beginner', points: 100 },
    { id: '2', title: 'Card Layout', difficulty: 'Intermediate', points: 200 },
    { id: '3', title: 'Navigation Menu', difficulty: 'Intermediate', points: 250 },
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      <header className="bg-gray-800 border-b border-gray-700 py-4 px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Layout className="w-7 h-7 text-blue-400 mr-2" />
            <h1 className="text-xl font-bold text-white">PixelPerfect</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-gray-400 hover:text-white"><Bell className="w-5 h-5" /></button>
            <button className="text-gray-400 hover:text-white"><HelpCircle className="w-5 h-5" /></button>
            <div className="relative ml-2">
              <button className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white">{user.name.charAt(0)}</button>
            </div>
          </div>
        </div>
      </header>
      <div className="container mx-auto px-4 py-6">
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Welcome back, {user.name}!</h2>
              <p className="text-gray-400">Continue improving your UI development skills with our challenges.</p>
            </div>
            <div className="mt-4 md:mt-0">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center" onClick={() => onStartChallenge(featuredChallenges[0])}>
                <Zap className="w-4 h-4 mr-2" /> Start New Challenge
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-blue-900/30 rounded-lg p-4 flex items-center">
              <div className="w-10 h-10 bg-blue-800/50 rounded-full flex items-center justify-center mr-3">
                <Trophy className="w-5 h-5 text-blue-300" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{user.level}</div>
                <div className="text-blue-300 text-sm">Current Level</div>
              </div>
            </div>
            <div className="bg-purple-900/30 rounded-lg p-4 flex items-center">
              <div className="w-10 h-10 bg-purple-800/50 rounded-full flex items-center justify-center mr-3">
                <Award className="w-5 h-5 text-purple-300" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{user.points}</div>
                <div className="text-purple-300 text-sm">Total Points</div>
              </div>
            </div>
            <div className="bg-green-900/30 rounded-lg p-4 flex items-center">
              <div className="w-10 h-10 bg-green-800/50 rounded-full flex items-center justify-center mr-3">
                <Layout className="w-5 h-5 text-green-300" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{user.completedChallenges}</div>
                <div className="text-green-300 text-sm">Completed Challenges</div>
              </div>
            </div>
            <div className="bg-yellow-900/30 rounded-lg p-4 flex items-center">
              <div className="w-10 h-10 bg-yellow-800/50 rounded-full flex items-center justify-center mr-3">
                <UserIcon className="w-5 h-5 text-yellow-300" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">#{user.rank}</div>
                <div className="text-yellow-300 text-sm">Global Ranking</div>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-white">Featured Challenges</h2>
            <button className="text-blue-400 hover:text-blue-300 text-sm" onClick={() => onStartChallenge(null)}>View All Challenges</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {featuredChallenges.map((challenge) => (
              <div key={challenge.id} className="bg-gray-800 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-24 bg-gray-750 flex items-center justify-center">
                  <Layout className="w-10 h-10 text-gray-600" />
                </div>
                <div className="p-4">
                  <div className="flex justify-between mb-2">
                    <span className={`text-xs px-2 py-1 rounded ${challenge.difficulty === 'Beginner' ? 'bg-green-900/30 text-green-300' : challenge.difficulty === 'Intermediate' ? 'bg-yellow-900/30 text-yellow-300' : 'bg-red-900/30 text-red-300'}`}>
                      {challenge.difficulty}
                    </span>
                    <span className="text-sm text-blue-300">{challenge.points} pts</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{challenge.title}</h3>
                  <button className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md text-sm" onClick={() => onStartChallenge(challenge)}>
                    Start Challenge
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <h2 className="text-xl font-bold text-white mb-4">Recent Activity</h2>
            <div className="bg-gray-800 rounded-lg p-4 space-y-4">
              <div className="border-l-4 border-blue-500 pl-4 py-1">
                <div className="text-white font-medium">Completed "Button Component" Challenge</div>
                <div className="text-gray-400 text-sm">2 days ago • Earned 100 points</div>
              </div>
              <div className="border-l-4 border-green-500 pl-4 py-1">
                <div className="text-white font-medium">Reached Level 3</div>
                <div className="text-gray-400 text-sm">5 days ago • Unlocked new challenges</div>
              </div>
              <div className="border-l-4 border-purple-500 pl-4 py-1">
                <div className="text-white font-medium">Started "Card Layout" Challenge</div>
                <div className="text-gray-400 text-sm">1 week ago • In progress</div>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold text-white mb-4">Resources</h2>
            <div className="bg-gray-800 rounded-lg p-4 space-y-3">
              <a href="#" className="block bg-gray-750 hover:bg-gray-700 p-3 rounded-md transition">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-900/50 rounded-full flex items-center justify-center mr-3">
                    <Bot className="w-4 h-4 text-blue-300" />
                  </div>
                  <div>
                    <div className="text-white font-medium">AI Assistant Guide</div>
                    <div className="text-gray-400 text-xs">Tips for using our AI assistant</div>
                  </div>
                </div>
              </a>
              <a href="#" className="block bg-gray-750 hover:bg-gray-700 p-3 rounded-md transition">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-purple-900/50 rounded-full flex items-center justify-center mr-3">
                    <Code2 className="w-4 h-4 text-purple-300" />
                  </div>
                  <div>
                    <div className="text-white font-medium">Code Style Guide</div>
                    <div className="text-gray-400 text-xs">Learn our coding standards</div>
                  </div>
                </div>
              </a>
              <a href="#" className="block bg-gray-750 hover:bg-gray-700 p-3 rounded-md transition">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-green-900/50 rounded-full flex items-center justify-center mr-3">
                    <MessageSquare className="w-4 h-4 text-green-300" />
                  </div>
                  <div>
                    <div className="text-white font-medium">Community Forum</div>
                    <div className="text-gray-400 text-xs">Discuss with other developers</div>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;