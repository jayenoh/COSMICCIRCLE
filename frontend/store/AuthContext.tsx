import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authService, UserData } from '@/services/auth';
import { api } from '@/services/api';

interface AuthState {
  user: UserData | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (data: {
    name: string;
    email: string;
    password: string;
    birthdate: string;
    birth_time?: string;
    birth_location?: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  updateDepth: (depth: string) => Promise<void>;
}

const AuthContext = createContext<AuthState>({} as AuthState);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authService.getStoredUser()
      .then((u) => {
        setUser(u);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const u = await authService.login(email, password);
    setUser(u);
  }, []);

  const signup = useCallback(async (data: Parameters<typeof authService.signup>[0]) => {
    const u = await authService.signup(data);
    setUser(u);
  }, []);

  const logout = useCallback(async () => {
    await authService.logout();
    setUser(null);
  }, []);

  const refreshUser = useCallback(async () => {
    const u = await api.get<UserData>('/users/me');
    setUser(u);
  }, []);

  const updateDepth = useCallback(async (depth: string) => {
    const u = await api.put<UserData>('/users/me/depth', { depth_preference: depth });
    setUser(u);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, refreshUser, updateDepth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
