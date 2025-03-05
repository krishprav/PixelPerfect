'use client';

import React, { useState, useEffect } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';
import ChallengesList from './ChallengesList';
import Workspace from './Workspace';
import { AuthService } from './AuthService';

interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string | null;
  token: string;
  level: number;
  points: number;
  completedChallenges: number;
  rank: number;
}

const AppContent = () => {
  const { data: session, status } = useSession();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [showLogin, setShowLogin] = useState(true);
  const [currentView, setCurrentView] = useState<'dashboard' | 'challenges' | 'workspace'>('dashboard');
  // const [selectedChallenge, setSelectedChallenge] = useState<any | null>(null);

  useEffect(() => {
    setCurrentUser(AuthService.getCurrentUser());
  }, []);

  useEffect(() => {
    if (status === 'authenticated' && session?.user) {
      const user: User = {
        id: session.user.id || 'google-user',
        name: session.user.name || 'User',
        email: session.user.email || '',
        avatarUrl: session.user.image || null,
        token: session.user.token || 'google-token',
        level: 1,
        points: 0,
        completedChallenges: 0,
        rank: 1,
      };
      setCurrentUser(user);
      AuthService.setCurrentUser(user);
    } else if (status === 'unauthenticated') {
      setCurrentUser(null);
    }
  }, [session, status]);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setCurrentView('dashboard');
  };

  const handleLogout = async () => {
    if (session) {
      signOut({ callbackUrl: '/' });
    } else {
      await AuthService.logout();
      AuthService.clearCurrentUser();
    }
    setCurrentUser(null);
    setCurrentView('dashboard');
  };

  return (
    <div>
      {status === 'loading' ? (
        <p>Loading...</p>
      ) : !currentUser ? (
        showLogin ? (
          <Login onLogin={handleLogin} switchToRegister={() => setShowLogin(false)} onGoogleLogin={() => signIn('google')} />
        ) : (
          <Register onRegister={handleLogin} switchToLogin={() => setShowLogin(true)} />
        )
      ) : currentView === 'dashboard' ? (
        <Dashboard user={currentUser} onLogout={handleLogout} onStartChallenge={(challenge) => setSelectedChallenge(challenge)} />
      ) : currentView === 'challenges' ? (
        <ChallengesList onSelectChallenge={(challenge) => setSelectedChallenge(challenge)} onBack={() => setCurrentView('dashboard')} />
      ) : (
        <Workspace user={currentUser} onLogout={handleLogout} />
      )}
    </div>
  );
};

export default AppContent;