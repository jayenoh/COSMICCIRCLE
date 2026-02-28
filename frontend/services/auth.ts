import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from './api';

export interface UserData {
  id: string;
  name: string;
  email: string;
  birthdate: string;
  birth_time?: string;
  birth_location?: string;
  depth_preference: string;
  natal_chart_data?: Record<string, any>;
}

interface AuthResponse {
  user: UserData;
  token: string;
}

export const authService = {
  async signup(data: {
    name: string;
    email: string;
    password: string;
    birthdate: string;
    birth_time?: string;
    birth_location?: string;
  }): Promise<UserData> {
    const res = await api.post<AuthResponse>('/auth/signup', data);
    await AsyncStorage.setItem('auth_token', res.token);
    await AsyncStorage.setItem('user', JSON.stringify(res.user));
    return res.user;
  },

  async login(email: string, password: string): Promise<UserData> {
    const res = await api.post<AuthResponse>('/auth/login', { email, password });
    await AsyncStorage.setItem('auth_token', res.token);
    await AsyncStorage.setItem('user', JSON.stringify(res.user));
    return res.user;
  },

  async logout(): Promise<void> {
    await AsyncStorage.removeItem('auth_token');
    await AsyncStorage.removeItem('user');
  },

  async getStoredUser(): Promise<UserData | null> {
    const json = await AsyncStorage.getItem('user');
    return json ? JSON.parse(json) : null;
  },

  async getToken(): Promise<string | null> {
    return AsyncStorage.getItem('auth_token');
  },

  async isLoggedIn(): Promise<boolean> {
    const token = await AsyncStorage.getItem('auth_token');
    return !!token;
  },
};
