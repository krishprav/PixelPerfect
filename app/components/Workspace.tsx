'use client';

import React, { useState } from 'react';
import { Layout, BrainCircuit, Save, GitBranch, RotateCcw, ArrowRight } from 'lucide-react';
import { AIService } from './AIService';
import AIAssistant from './AIAssistant';
import CodeEditor from './CodeEditor';
import Preview from './Preview';
import VersionHistory from './VersionHistory';
import Challenge from './Challenge';
import Feedback from './Feedback';
import UserProfile from './UserProfile';

interface WorkspaceProps {
  user: any;
  onLogout: () => void;
}

const Workspace = ({ user, onLogout }: WorkspaceProps) => {
  const [code, setCode] = useState('<!-- Your code here -->\n<div class="component">\n  <h1>Hello PixelPerfect!</h1>\n</div>\n\n<style>\n.component {\n  padding: 20px;\n  background: #f0f0f0;\n  border-radius: 8px;\n  font-family: system-ui, sans-serif;\n}\n\nh1 {\n  color: #333;\n  font-size: 24px;\n}\n</style>');
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [showVersionHistory, setShowVersionHistory] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [versions, setVersions] = useState<any[]>([]);
  const [feedback, setFeedback] = useState<any[]>([]);
  const [currentChallenge] = useState({
    id: '1',
    title: 'Button Component',
    description: 'Create a versatile button component with primary and secondary variants, proper hover states, and accessibility features.',
    difficulty: 'Beginner',
    points: 100,
    requirements: [
      'Create primary and secondary button variants',
      'Add proper hover and focus states',
      'Ensure buttons are accessible with proper contrast',
      'Add a subtle shadow effect',
      'Use CSS transitions for smooth state changes',
    ],
    referenceImage: '/api/placeholder/480/160',
    tags: ['HTML', 'CSS', 'Components', 'Accessibility'],
  });

  const handleSaveVersion = () => {
    const now = new Date();
    const timestamp = now.toLocaleString();
    setVersions([...versions, { code, timestamp }]);
  };

  const handleApplyVersion = (versionCode: string) => {
    setCode(versionCode);
    setShowVersionHistory(false);
  };

  const handleGenerateCode = (generatedCode: string) => {
    setCode(generatedCode);
    setShowAIAssistant(false);
  };

  const handleSubmit = async () => {
    try {
      const feedback = await AIService.analyzeFeedback(code, currentChallenge.requirements);
      setFeedback(feedback);
    } catch (error) {
      console.error("Error analyzing code:", error);
    }
  };

  const handleFixCode = async () => {
    try {
      const fixedCode = await AIService.fixCode(code, feedback);
      setCode(fixedCode);
      const updatedFeedback = await AIService.analyzeFeedback(fixedCode, currentChallenge.requirements);
      setFeedback(updatedFeedback);
    } catch (error) {
      console.error("Error fixing code:", error);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900">
      <header className="bg-gray-800 border-b border-gray-700 py-2 px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Layout className="w-6 h-6 text-blue-400 mr-2" />
            <h1 className="text-xl font-bold text-white">PixelPerfect</h1>
          </div>
          <div className="flex items-center space-x-3">
            <button className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded-md text-sm flex items-center" onClick={() => setShowAIAssistant(true)}>
              <BrainCircuit className="w-4 h-4 mr-1 text-purple-400" /> AI Assistant
            </button>
            <button className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded-md text-sm" onClick={handleSubmit}>Submit</button>
            <div className="relative">
              <button className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white" onClick={() => setShowUserProfile(!showUserProfile)}>
                {user.name.charAt(0)}
              </button>
            </div>
          </div>
        </div>
      </header>
      <div className="flex-1 flex overflow-hidden">
        <div className="w-72 bg-gray-850 border-r border-gray-700 flex flex-col">
          <div className="p-4">
            <Challenge challenge={currentChallenge} />
          </div>
          <div className="p-4 border-t border-gray-700">
            <Feedback feedback={feedback} onFixCode={handleFixCode} />
          </div>
        </div>
        <div className="flex-1 flex flex-col">
          <div className="bg-gray-800 border-b border-gray-700 p-2 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <button className="bg-gray-700 hover:bg-gray-600 text-white px-2 py-1 rounded text-xs flex items-center" onClick={handleSaveVersion}>
                <Save className="w-3 h-3 mr-1" /> Save Version
              </button>
              <button className="bg-gray-700 hover:bg-gray-600 text-white px-2 py-1 rounded text-xs flex items-center" onClick={() => setShowVersionHistory(true)}>
                <GitBranch className="w-3 h-3 mr-1" /> History
              </button>
              <button className="bg-gray-700 hover:bg-gray-600 text-white px-2 py-1 rounded text-xs flex items-center" onClick={() => setCode('<!-- Your code here -->\n<div class="component">\n  <h1>Hello PixelPerfect!</h1>\n</div>\n\n<style>\n.component {\n  padding: 20px;\n  background: #f0f0f0;\n  border-radius: 8px;\n  font-family: system-ui, sans-serif;\n}\n\nh1 {\n  color: #333;\n  font-size: 24px;\n}\n</style>')}>
                <RotateCcw className="w-3 h-3 mr-1" /> Reset
              </button>
            </div>
            <div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm flex items-center" onClick={handleSubmit}>
                <ArrowRight className="w-4 h-4 mr-1" /> Submit Solution
              </button>
            </div>
          </div>
          <div className="flex-1 grid grid-cols-2 divide-x divide-gray-700 overflow-hidden">
            <CodeEditor code={code} onChange={setCode} />
            <Preview code={code} />
          </div>
        </div>
      </div>
      {showAIAssistant && (
        <AIAssistant challenge={currentChallenge} onCodeGenerate={handleGenerateCode} onCodeFix={handleFixCode} onClose={() => setShowAIAssistant(false)} />
      )}
      {showVersionHistory && (
        <VersionHistory versions={versions} onApply={handleApplyVersion} onClose={() => setShowVersionHistory(false)} />
      )}
      {showUserProfile && (
        <UserProfile user={user} onClose={() => setShowUserProfile(false)} />
      )}
    </div>
  );
};

export default Workspace;