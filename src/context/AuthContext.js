import React, { createContext, useState, useEffect, useContext } from 'react';
import { authAPI } from '../utils/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (token) {
      loadCurrentUser();
    } else {
      setLoading(false);
    }
  }, []);

  const loadCurrentUser = async () => {
    try {
      const user = await authAPI.getCurrentUser();
      // Verify user data is valid
      if (user && user.id) {
        setCurrentUser(user);
        setUserRole(user.role);
        setUserData(user);
      } else {
        // Invalid user data, clear everything
        localStorage.removeItem('token');
        setCurrentUser(null);
        setUserRole(null);
        setUserData(null);
      }
    } catch (error) {
      console.error('Error loading user:', error);
      // Clear invalid token
      localStorage.removeItem('token');
      setCurrentUser(null);
      setUserRole(null);
      setUserData(null);
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email, password, name, role) => {
    try {
      const response = await authAPI.register(name, email, password, role);
      localStorage.setItem('token', response.token);
      setCurrentUser(response.user);
      setUserRole(response.user.role);
      setUserData(response.user);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const login = async (email, password) => {
    try {
      const response = await authAPI.login(email, password);
      localStorage.setItem('token', response.token);
      setCurrentUser(response.user);
      setUserRole(response.user.role);
      setUserData(response.user);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    localStorage.removeItem('token');
    setCurrentUser(null);
    setUserRole(null);
    setUserData(null);
  };

  const resetPassword = async (email) => {
    // TODO: Implement password reset with backend
    throw new Error('Password reset not yet implemented');
  };

  const signInWithGoogle = async () => {
    // TODO: Implement Google OAuth with backend
    throw new Error('Google sign in not yet implemented');
  };

  const signInWithGithub = async () => {
    // TODO: Implement GitHub OAuth with backend
    throw new Error('GitHub sign in not yet implemented');
  };

  const switchRole = async (newRole) => {
    if (currentUser) {
      // Update user role in backend
      // TODO: Implement role switching API
      setUserRole(newRole);
      if (userData) {
        setUserData({ ...userData, role: newRole });
      }
    }
  };

  const value = {
    currentUser,
    userRole,
    userData,
    signup,
    login,
    logout,
    resetPassword,
    signInWithGoogle,
    signInWithGithub,
    switchRole,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
