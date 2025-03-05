'use client';

import React from 'react';
// import { Code2 } from 'lucide-react';

interface CodeEditorProps {
  code: string;
  onChange: (code: string) => void;
}

const CodeEditor = ({ code, onChange }: CodeEditorProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => onChange(e.target.value);

  return (
    <div>
      <h3>HTML/CSS Editor</h3>
      <textarea value={code} onChange={handleChange} />
      <button>Format</button>
    </div>
  );
};

export default CodeEditor;