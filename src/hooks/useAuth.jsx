import React, { createContext, useContext, useState, useEffect } from 'react';
import { storage } from '../utils/storage.js';

const VALID_CREDENTIALS = {
  email: 'intern@demo.com',
  password: 'intern123'
};

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = storage.isAuthenticated();
    const savedUser = storage.getUser();
    
    if (auth && savedUser) {
      setIsAuthenticated(true);
      setUser(savedUser);
    }
  }, []);

  const login = (email, password, rememberMe) => {
    if (email === VALID_CREDENTIALS.email && password === VALID_CREDENTIALS.password) {
      const userData = { email, rememberMe };
      
      setIsAuthenticated(true);
      setUser(userData);
      storage.setAuthenticated(true);
      
      if (rememberMe) {
        storage.saveUser(userData);
      }
      
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    storage.setAuthenticated(false);
    
    const savedUser = storage.getUser();
    if (!savedUser?.rememberMe) {
      storage.clearAll();
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};