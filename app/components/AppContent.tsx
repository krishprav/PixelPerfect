'use client';

import React, { useState, useEffect } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';
import ChallengesList from './ChallengesList';
import Workspace from './Workspace';
import { AuthService } from './AuthService';

const AppContent = () => {
  const { data: session, status } = useSession();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [showLogin, setShowLogin] = useState(true);
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedChallenge, setSelectedChallenge] = useState(null);

  useEffect(() => {
    setCurrentUser(AuthService.getCurrentUser());
  }, []);

  useEffect(() => {
    if (status === 'authenticated' && session?.user) {
      const user = {
        id: session.user.id || 'google-user',
        name: session.user.name || 'User', // Dynamic name from Google
        email: session.user.email,
        avatarUrl: session.user.image || null,
        token: session.user.token || 'google-token',
        level: 1,
        points: 0,
        completedChallenges: 0,
        rank: 1,
      };
      setCurrentUser(user);
      AuthService.setCurrentUser(user);
    } else if (status === 'unauthenticated' && !AuthService.getCurrentUser()) {
      setCurrentUser(null);
    }
  }, [session, status]);

  const handleLogin = (user: any) => {
    setCurrentUser(user);
    setCurrentView('dashboard');
  };

  const handleGoogleLogin = () => {
    signIn('google');
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

  const handleStartChallenge = (challenge: any) => {
    if (challenge) {
      setSelectedChallenge(challenge);
      setCurrentView('workspace');
    } else {
      setCurrentView('challenges');
    }
  };

  if (status === 'loading') {
    return <div className="text-white text-center">Loading...</div>;
  }

  if (!currentUser) {
    return showLogin ? (
      <Login onLogin={handleLogin} switchToRegister={() => setShowLogin(false)} onGoogleLogin={handleGoogleLogin} />
    ) : (
      <Register onRegister={handleLogin} switchToLogin={() => setShowLogin(true)} />
    );
  }

  return (
    <>
      {currentView === 'dashboard' && (
        <Dashboard user={currentUser} onLogout={handleLogout} onStartChallenge={handleStartChallenge} />
      )}
      {currentView === 'challenges' && (
        <ChallengesList
          onSelectChallenge={(challenge) => {
            setSelectedChallenge(challenge);
            setCurrentView('workspace');
          }}
          onBack={() => setCurrentView('dashboard')}
        />
      )}
      {currentView === 'workspace' && (
        <Workspace user={currentUser} onLogout={handleLogout} />
      )}
    </>
  );
};

export default AppContent;