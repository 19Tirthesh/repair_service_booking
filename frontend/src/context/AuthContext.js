import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import {
  SESSION_KEY,
  loadSession,
  saveSession,
  clearSession,
  mergeSession,
  setUnauthorizedHandler,
} from '../utils/authSession';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  const logout = useCallback(() => {
    clearSession();
    setUser(null);
  }, []);

  const login = useCallback((userData) => {
    saveSession(userData);
    setUser(userData);
  }, []);

  const updateSession = useCallback((partial) => {
    const next = mergeSession(partial);
    if (next) setUser(next);
  }, []);

  useEffect(() => {
    setUser(loadSession());
    setReady(true);
  }, []);

  useEffect(() => {
    setUnauthorizedHandler(() => logout);
    return () => setUnauthorizedHandler(null);
  }, [logout]);

  useEffect(() => {
    const onStorage = (e) => {
      if (e.key !== SESSION_KEY) return;
      if (e.newValue === null) {
        setUser(null);
        return;
      }
      try {
        const data = JSON.parse(e.newValue);
        if (data?.token) setUser(data);
      } catch {
        setUser(null);
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  return (
    <AuthContext.Provider value={{ user, ready, login, logout, updateSession }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
