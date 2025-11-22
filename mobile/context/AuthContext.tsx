import { jwtDecode } from 'jwt-decode';
import { createContext, use, type PropsWithChildren } from 'react';

import { useStorageState } from '../hooks/useStorageState';
import { authenticateWithBiometrics } from '@/utils/biometry/biometricAuth';
import Toast from 'react-native-toast-message';

type JwtPayload = {
  id: number;
  nome: string;
  email: string;
  exp?: number;
  iat?: number;
};

type Session = {
  token: string;
  user: {
    id: number;
    nome: string;
    email: string;
  };
};

const AuthContext = createContext<{
  signIn: (token: string) => void;
  signOut: () => void;
  signInWithBiometrics: () => Promise<void>;
  session?: Session | null;
  user?: Session['user'] | null;
  token?: string | null;
  isLoading: boolean;
}>({
  signIn: (_token: string) => null,
  signOut: () => null,
  signInWithBiometrics: () => Promise.resolve(),
  session: null,
  user: null,
  token: null,
  isLoading: false,
});

// Use this hook to access the user info.
export function useSession() {
  const value = use(AuthContext);
  if (!value) {
    throw new Error('useSession must be wrapped in a <SessionProvider />');
  }

  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState('session');
  const [[, cachedSession], setCachedSession] = useStorageState('cached-session');

  const signIn = async (token: string) => {
    const payload = jwtDecode<JwtPayload>(token);
    const user = { id: payload.id, nome: payload.nome, email: payload.email };
    setSession(JSON.stringify({ token, user }));
    setCachedSession(JSON.stringify({ token, user }));
  };

  const signOut = async () => {
    setSession(null);
  };

  async function signInWithBiometrics() {
    const res = await authenticateWithBiometrics();
    if (res.success) {
      // restore user automatically using secure storage token
      if (!res.success) return;
      if (!cachedSession) {
        Toast.show({
          type: 'error',
          text1: 'Erro',
          text2: 'Nenhuma sessão armazenada. Faça login manualmente.'
        });
      }

      try {
        const restored = JSON.parse(cachedSession!) as Session;
        setSession(JSON.stringify(restored));
      } catch {
        setCachedSession(null);      
      }
    }
  }

  // Migrate legacy values: if storage contains a raw JWT (non-JSON), convert to JSON once.
  // Also avoid throwing during render if parsing fails.
  let sessionData: Session | null = null;
  if (session) {
    try {
      sessionData = JSON.parse(session) as Session;
      console.log("user session", sessionData)
    } catch {
      sessionData = null;
      console.log("Invalid session");
    }
  }

  // One-time migration for legacy raw token strings
  if (session && !session.trim().startsWith('{')) {
    try {
      const payload = jwtDecode<JwtPayload>(session);
      const user = { id: payload.id, nome: payload.nome, email: payload.email };
      const normalized = JSON.stringify({ token: session, user });
      // Defer mutation with microtask to avoid side effects during render
      Promise.resolve().then(() => setSession(normalized));
      sessionData = { token: session, user };
      console.log("user session", sessionData)
    } catch {
      // If it doesn't decode, clear invalid session to recover
      Promise.resolve().then(() => setSession(null));
      sessionData = null;
      console.log("Invalid session");
    }
  }
  return (
    <AuthContext.Provider value={{ 
      signIn, 
      signOut, 
      signInWithBiometrics,
      session: sessionData, 
      user: sessionData?.user || null,
      token: sessionData?.token || null,
      isLoading 
    }}>
      {children}
    </AuthContext.Provider>
  );
}
