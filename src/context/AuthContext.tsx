'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

export interface User {
  id: string;
  username: string;
  role: string[];
}

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUserState] = useState<User | null>(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) setUserState(JSON.parse(savedUser));
  }, []);

  const setUser = (user: User | null) => {
    if (user) localStorage.setItem('user', JSON.stringify(user));
    else localStorage.removeItem('user');
    setUserState(user);
  };

  const logout = async () => {
    try {
      await axios.post('/api/logout', {}, { withCredentials: true });
    } catch (err) {
      console.error('Logout failed', err);
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
