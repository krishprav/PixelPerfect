export const AIService = {
    generateCode: async (prompt: string, challenge: any) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          if (prompt.toLowerCase().includes('button')) {
            resolve(`
  <div class="example">
    <h1>Hello PixelPerfect!</h1>
    <button class="button primary">Primary Button</button>
    <button class="button secondary">Secondary Button</button>
  </div>
  <style>
  .example { padding: 20px; background: #f0f0f0; border-radius: 8px; font-family: system-ui, sans-serif; }
  h1 { color: #333; font-size: 24px; margin-bottom: 20px; }
  .button { display: inline-block; padding: 10px 16px; border-radius: 4px; font-size: 14px; font-weight: 500; cursor: pointer; transition: all 0.2s ease; margin-right: 10px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); }
  .primary { background: #4a6bff; color: white; border: none; }
  .primary:hover { background: #3a5bef; }
  .secondary { background: white; color: #333; border: 1px solid #e0e3e8; }
  .secondary:hover { background: #f5f5f5; }
  </style>`);
          } else if (prompt.toLowerCase().includes('card')) {
            resolve(`
  <div class="card">
    <div class="card-image"><img src="/api/placeholder/320/180" alt="Card image"></div>
    <div class="card-content"><h2 class="card-title">Card Title</h2><p class="card-description">This is a responsive card component.</p></div>
    <div class="card-actions"><button class="card-button primary">Action</button><button class="card-button secondary">Cancel</button></div>
  </div>
  <style>
  .card { width: 320px; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); transition: box-shadow 0.3s ease; background: white; }
  .card:hover { box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15); }
  .card-image img { width: 100%; aspect-ratio: 16/9; object-fit: cover; }
  .card-content { padding: 16px; }
  .card-title { font-size: 18px; font-weight: 600; margin-bottom: 8px; color: #333; }
  .card-description { font-size: 14px; color: #666; line-height: 1.4; }
  .card-actions { padding: 12px 16px; border-top: 1px solid #f1f1f1; display: flex; gap: 8px; }
  .card-button { padding: 8px 16px; border-radius: 4px; font-size: 14px; cursor: pointer; transition: background 0.2s ease; }
  .card-button.primary { background: #4a6bff; color: white; border: none; }
  .card-button.secondary { background: white; color: #333; border: 1px solid #e0e3e8; }
  @media (max-width: 768px) { .card { width: 100%; } }
  </style>`);
          } else {
            resolve(`
  <!-- Generated code for ${challenge?.title || 'your challenge'} -->
  <div class="component"><h2>AI Generated Component</h2><p>Your requested component will appear here.</p></div>
  <style>.component { padding: 20px; background: #f5f5f5; border-radius: 8px; font-family: system-ui, sans-serif; color: #333; }</style>`);
          }
        }, 1500);
      });
    },
    analyzeFeedback: async (code: string, targetRequirements: string[]) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const feedback: { type: string; message: string; aiSuggestion?: string }[] = [];
          if (!code.includes('box-shadow')) feedback.push({ type: 'error', message: 'Add box-shadow to match the design', aiSuggestion: 'box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);' });
          if (!code.includes('transition')) feedback.push({ type: 'warning', message: 'Add transitions for smoother interactions', aiSuggestion: 'transition: all 0.2s ease;' });
          if (!code.includes('border-radius: 4px') && !code.includes('border-radius:4px')) feedback.push({ type: 'error', message: 'Border radius should be 4px', aiSuggestion: 'border-radius: 4px;' });
          if (!code.includes('#4a6bff')) feedback.push({ type: 'error', message: 'Primary color should be #4a6bff', aiSuggestion: 'color: #4a6bff;' });
          if (!code.includes(':hover')) feedback.push({ type: 'warning', message: 'Add hover states for interactive elements', aiSuggestion: '.button:hover { opacity: 0.9; }' });
          if (code.includes('font-family: system-ui')) feedback.push({ type: 'success', message: 'Good use of system font stack' });
          if (code.includes('display: flex') || code.includes('display:flex')) feedback.push({ type: 'success', message: 'Good use of flexbox for layout' });
          if (feedback.length === 0) feedback.push({ type: 'info', message: 'Your code looks good! Try adding more details or interactions.' });
          resolve(feedback);
        }, 1000);
      });
    },
    fixCode: async (code: string, issues: any[]) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          let newCode = code;
          if (!code.includes('box-shadow')) newCode = newCode.replace('.button {', '.button {\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);');
          if (!code.includes('transition')) newCode = newCode.replace('.button {', '.button {\n  transition: all 0.2s ease;');
          if (!code.includes('#4a6bff') && code.includes('.primary {')) {
            newCode = newCode.replace('background: blue;', 'background: #4a6bff;')
              .replace('background: #0000ff;', 'background: #4a6bff;')
              .replace('background: rgb(0, 0, 255);', 'background: #4a6bff;');
          }
          resolve(newCode);
        }, 1000);
      });
    },
    getAIHint: async (challenge: any) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const hints = [
            "Use CSS variables to maintain consistent colors",
            "Add micro-interactions to improve user feedback",
            "Ensure hover and focus states have sufficient contrast",
            "Test your component at different sizes",
            "Pay attention to padding and spacing consistency",
          ];
          resolve(hints[Math.floor(Math.random() * hints.length)]);
        }, 500);
      });
    },
  };