'use client';

import React, { useRef, useEffect } from 'react';
import { Eye } from 'lucide-react';

interface PreviewProps {
  code: string;
}

const Preview = ({ code }: PreviewProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (iframe) {
      const doc = iframe.contentDocument || iframe.contentWindow?.document;
      if (doc) {
        doc.open();
        doc.write(`
          <html>
            <head>
              <style>
                body { margin: 0; }
                * { box-sizing: border-box; }
              </style>
            </head>
            <body>
              ${code}
            </body>
          </html>
        `);
        doc.close();
      }
    }
  }, [code]);

  return (
    <div className="h-full flex flex-col">
      <div className="bg-gray-900 border-b border-gray-800 p-2 flex items-center justify-between">
        <div className="flex items-center">
          <Eye className="w-4 h-4 text-green-400 mr-2" />
          <span className="text-sm text-gray-300">Preview</span>
        </div>
      </div>
      <div className="flex-1 bg-white overflow-auto">
        <iframe ref={iframeRef} className="w-full h-full border-none" title="Preview" />
      </div>
    </div>
  );
};

export default Preview;