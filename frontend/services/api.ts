import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

/**
 * Smart API base URL detection (priority order):
 * 1. Production web deploy → Render backend URL
 * 2. NGROK_BACKEND_URL override → for tunnel-based remote testing
 * 3. Web browser on localhost → localhost:8000
 * 4. Android emulator → 10.0.2.2:8000
 * 5. Physical device → dev machine's LAN IP via Expo manifest
 * 6. Fallback → hardcoded LAN IP
 */
const DEV_MACHINE_IP = '192.168.1.209';

// Production backend URL (set after deploying to Render)
const PRODUCTION_API_URL = 'https://cosmiccircle-api.onrender.com/api';

// Set this to your ngrok URL to enable remote access, or leave empty for local dev
const NGROK_BACKEND_URL = '';

function getBaseUrl(): string {
  // Production: deployed web app (not localhost)
  if (PRODUCTION_API_URL && Platform.OS === 'web'
      && typeof window !== 'undefined'
      && !window.location.hostname.includes('localhost')) {
    return PRODUCTION_API_URL;
  }
  // Dev: ngrok tunnel override
  if (NGROK_BACKEND_URL) {
    return NGROK_BACKEND_URL;
  }
  // Dev: web browser on localhost
  if (Platform.OS === 'web') {
    return 'http://localhost:8000/api';
  }
  // Dev: Android emulator
  if (Platform.OS === 'android' && !Constants.isDevice) {
    return 'http://10.0.2.2:8000/api';
  }
  // Dev: physical device — extract dev machine IP from Expo's hostUri
  const hostUri = Constants.expoConfig?.hostUri ?? Constants.manifest?.debuggerHost;
  if (hostUri) {
    const host = hostUri.split(':')[0];
    if (host && /^\d+\.\d+\.\d+\.\d+$/.test(host)) {
      return `http://${host}:8000/api`;
    }
  }
  return `http://${DEV_MACHINE_IP}:8000/api`;
}

const BASE_URL = getBaseUrl();
console.log('[CosmicCircle] API Base URL:', BASE_URL);

async function getHeaders(): Promise<Record<string, string>> {
  const token = await AsyncStorage.getItem('auth_token');
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'true',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const headers = await getHeaders();
  const controller = new AbortController();
  // Longer timeout for production (Render free tier cold starts take ~30s)
  const timeoutMs = PRODUCTION_API_URL ? 45000 : 10000;
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(`${BASE_URL}${path}`, {
      ...options,
      headers: { ...headers, ...(options.headers as Record<string, string>) },
      signal: controller.signal,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: 'Network error' }));
      throw new Error(error.detail || `HTTP ${response.status}`);
    }

    return response.json();
  } catch (err: any) {
    if (err.name === 'AbortError') {
      throw new Error('Request timed out. Check that the backend is running and reachable.');
    }
    throw err;
  } finally {
    clearTimeout(timeout);
  }
}

export const api = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body: unknown) =>
    request<T>(path, { method: 'POST', body: JSON.stringify(body) }),
  put: <T>(path: string, body: unknown) =>
    request<T>(path, { method: 'PUT', body: JSON.stringify(body) }),
  delete: <T>(path: string) => request<T>(path, { method: 'DELETE' }),
};
