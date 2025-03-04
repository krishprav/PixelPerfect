export const AuthService = {
  login: async (email: string, password: string) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (email && password) {
          // Check if a user exists in localStorage from registration
          const existingUser = AuthService.getCurrentUser();
          const name = existingUser && existingUser.email === email ? existingUser.name : email.split('@')[0]; // Use registered name or email prefix as fallback
          resolve({
            id: '123',
            name, 
            email,
            avatarUrl: null,
            token: 'mock-jwt-token',
            level: 4,
            points: 1000,
            completedChallenges: 1,
            rank: 1,
          });
        } else {
          throw new Error('Invalid credentials');
        }
      }, 800);
    });
  },
  register: async (email: string, password: string, name: string) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (email && password && name) {
          resolve({
            id: '123',
            name, // Use the provided name
            email,
            avatarUrl: null,
            token: 'mock-jwt-token',
            level: 1,
            points: 0,
            completedChallenges: 0,
            rank: 1,
          });
        } else {
          throw new Error('Invalid registration data');
        }
      }, 800);
    });
  },
  logout: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 300);
    });
  },
  getCurrentUser: () => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const userStr = localStorage.getItem('user');
      return userStr ? JSON.parse(userStr) : null;
    }
    return null;
  },
  setCurrentUser: (user: any) => {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  },
  clearCurrentUser: () => {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('user');
    }
  },
};