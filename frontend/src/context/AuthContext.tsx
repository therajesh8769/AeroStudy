import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  addBookmark: (subjectId: string) => void;
  removeBookmark: (subjectId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('aeroUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Mock login - in a real app, this would call an API
    // For demo purposes, we'll create a mock user
    const mockUser: User = {
      id: '1',
      name: 'Demo User',
      email,
      bookmarks: [],
    };
    
    setUser(mockUser);
    setIsAuthenticated(true);
    localStorage.setItem('aeroUser', JSON.stringify(mockUser));
  };

  const signup = async (name: string, email: string, password: string) => {
    // Mock signup - in a real app, this would call an API
    const mockUser: User = {
      id: Date.now().toString(),
      name,
      email,
      bookmarks: [],
    };
    
    setUser(mockUser);
    setIsAuthenticated(true);
    localStorage.setItem('aeroUser', JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('aeroUser');
  };

  const addBookmark = (subjectId: string) => {
    if (user) {
      const updatedUser = {
        ...user,
        bookmarks: [...user.bookmarks, subjectId],
      };
      setUser(updatedUser);
      localStorage.setItem('aeroUser', JSON.stringify(updatedUser));
    }
  };

  const removeBookmark = (subjectId: string) => {
    if (user) {
      const updatedUser = {
        ...user,
        bookmarks: user.bookmarks.filter(id => id !== subjectId),
      };
      setUser(updatedUser);
      localStorage.setItem('aeroUser', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated, 
      login, 
      signup, 
      logout,
      addBookmark,
      removeBookmark
    }}>
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