'use client';

import React from 'react';
import { Code2 } from 'lucide-react';

interface CodeEditorProps {
  code: string;
  onChange: (code: string) => void;
}

const CodeEditor = ({ code, onChange }: CodeEditorProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => onChange(e.target.value);

  return (
    <div className="h-full flex flex-col">
      <div className="bg-gray-900 border-b border-gray-800 p-2 flex items-center justify-between">
        <div className="flex items-center">
          <Code2 className="w-4 h-4 text-blue-400 mr-2" />
          <span className="text-sm text-gray-300">HTML/CSS Editor</span>
        </div>
        <div className="flex space-x-2">
          <button className="text-xs bg-gray-800 hover:bg-gray-700 text-blue-300 px-2 py-1 rounded">Format</button>
        </div>
      </div>
      <div className="flex-1 overflow-hidden">
        <textarea
          className="w-full h-full p-3 bg-gray-900 text-gray-100 font-mono text-sm resize-none focus:outline-none"
          value={code}
          onChange={handleChange}
          spellCheck="false"
        />
      </div>
    </div>
  );
};

export default CodeEditor;