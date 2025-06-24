import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

type UserRole = 'student' | 'admin' | 'faculty';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string,department:string,photo: string | null) => Promise<void>;
}

const initialAuthContext: AuthContextType = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  logout: () => {},
  register: async () => {},
};

const AuthContext = createContext<AuthContextType>(initialAuthContext);
export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, role: UserRole) => {
    setIsLoading(true);
    let endpoint = '';

    const BASE_URL = import.meta.env.VITE_API_URL;

    switch (role) {
      case 'admin':
        endpoint = `${BASE_URL}/admin/login`;
        break;
      case 'faculty':
        endpoint = `${BASE_URL}/faculty/login`;
        break;
      case 'student':
        endpoint = `${BASE_URL}/student/login`;
        break;
    }

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) throw new Error('Login failed');
      const data = await res.json();

      const userWithRole: User = {
        id: data.id || data.admin_id || data.faculty_id,
        name: data.name || '',
        email: data.email,
        role: role,
        department: role === 'student' ? data.department : undefined,
        photo: role === 'student' ? data.photo : undefined, // ✅ include photo for students
      };
      

      localStorage.setItem('user', JSON.stringify(userWithRole));
      setUser(userWithRole);
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  const BASE_URL = import.meta.env.VITE_API_URL;
  const register = async (name: string, email: string, password: string,department: string,photo:string | null) => {
    setIsLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/student/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password,department,photo }),
      });

      if (!res.ok) {
        throw new Error('Registration failed');
      }

      const data = await res.json();

      const userWithRole: User = {
        id: data.id,
        name: data.name,
        email: data.email,
        role: 'student',
        department: data.department,
      };

      localStorage.setItem('user', JSON.stringify(userWithRole));
      setUser(userWithRole);
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    register,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
