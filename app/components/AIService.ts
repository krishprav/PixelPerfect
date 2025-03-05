export const AIService = {
  generateCode: async (prompt: string, challenge: { title: string }) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (prompt.toLowerCase().includes('button')) {
          resolve(`
            /* Primary Button */
            .button-primary { background-color: #4a6bff; color: white; padding: 10px 20px; border-radius: 4px; }

            /* Secondary Button */
            .button-secondary { background-color: #f0f0f0; color: black; padding: 10px 20px; border-radius: 4px; }
          `);
        } else {
          resolve(`/* AI Generated Code for ${challenge.title} */`);
        }
      }, 1500);
    });
  },

  analyzeFeedback: async (code: string) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const feedback = [];
        if (!code.includes('box-shadow')) feedback.push({ type: 'error', message: 'Add box-shadow to match the design' });
        if (!code.includes('transition')) feedback.push({ type: 'warning', message: 'Add transitions for smoother interactions' });
        resolve(feedback);
      }, 1000);
    });
  },

  fixCode: async (code: string, issues: string[]) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        let newCode = code;
        if (issues.includes('box-shadow')) newCode += '\n.box-shadow { box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); }';
        resolve(newCode);
      }, 1000);
    });
  },
};