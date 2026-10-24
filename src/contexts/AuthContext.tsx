import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { isAllowedEmail } from '../utils/emailDomain';
import { logout } from '../services/auth';

type AuthContextValue = {
  user: User | null;
  loading: boolean;
  refreshSession: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshSession = useCallback(async () => {
    const currentUser = auth.currentUser;

    if (
      currentUser &&
      currentUser.emailVerified &&
      isAllowedEmail(currentUser.email)
    ) {
      setUser(currentUser);
    } else {
      if (currentUser) {
        await logout();
      }

      setUser(null);
    }
  }, []);

  useEffect(() => {
    return onAuthStateChanged(auth, async (currentUser) => {
      try {
        if (
          currentUser &&
          currentUser.emailVerified &&
          isAllowedEmail(currentUser.email)
        ) {
          setUser(currentUser);
        } else {
          if (currentUser) {
            await logout();
          }

          setUser(null);
        }
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, refreshSession }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
}
