'use client';

import React from 'react';
import { GitBranch } from 'lucide-react';

interface VersionHistoryProps {
  versions: { code: string; timestamp: string }[];
  onApply: (code: string) => void;
  onClose: () => void;
}

const VersionHistory = ({ versions, onApply, onClose }: VersionHistoryProps) => {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-xl w-full max-w-md absolute right-1/2 top-24 translate-x-1/2 z-50 overflow-hidden">
      <div className="p-3 bg-gray-750 border-b border-gray-700 flex items-center justify-between">
        <div className="flex items-center">
          <GitBranch className="w-5 h-5 text-blue-400 mr-2" />
          <h3 className="text-white font-medium">Version History</h3>
        </div>
        <button className="text-gray-400 hover:text-gray-200" onClick={onClose}>×</button>
      </div>
      <div className="p-2 max-h-96 overflow-y-auto">
        {versions.length === 0 ? (
          <div className="text-center py-4 text-gray-400">No saved versions yet</div>
        ) : (
          versions.map((version, index) => (
            <div key={index} className="bg-gray-750 rounded p-3 mb-2">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <span className="text-white font-medium">Version {versions.length - index}</span>
                  <span className="text-gray-400 text-xs ml-2">{version.timestamp}</span>
                </div>
                <button className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded" onClick={() => onApply(version.code)}>
                  Apply
                </button>
              </div>
              <div className="bg-gray-800 p-2 rounded text-xs font-mono text-gray-300 overflow-x-auto">
                <pre>{version.code.substring(0, 150)}...</pre>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default VersionHistory;