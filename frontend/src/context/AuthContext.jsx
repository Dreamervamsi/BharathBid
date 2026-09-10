import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('gem_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return {
      fullName: "Arjun Singh",
      email: "arjun.singh@gov.in",
      role: "Procurement Officer",
      department: "Ministry of Finance",
      employeeId: "GEM/OFF/1910"
    };
  });

  const [token, setToken] = useState(() => localStorage.getItem('gem_token') || 'gem-token-default');

  const login = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    localStorage.setItem('gem_user', JSON.stringify(userData));
    localStorage.setItem('gem_token', authToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('gem_user');
    localStorage.removeItem('gem_token');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
