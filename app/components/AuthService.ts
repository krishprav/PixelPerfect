import { User } from "next-auth";

export const AuthService = {
  login: async (email: string, password: string) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email && password) {
          resolve({
            id: '123',
            name: email.split('@')[0],
            email,
            avatarUrl: null,
            token: 'mock-jwt-token',
            level: 1,
            points: 0,
            completedChallenges: 0,
            rank: 1,
          });
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 800);
    });
  },

  register: async (email: string, password: string, name: string) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email && password && name) {
          resolve({
            id: '123',
            name,
            email,
            avatarUrl: null,
            token: 'mock-jwt-token',
            level: 1,
            points: 0,
            completedChallenges: 0,
            rank: 1,
          });
        } else {
          reject(new Error('Invalid registration data'));
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

  setCurrentUser: (user: User) => {
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