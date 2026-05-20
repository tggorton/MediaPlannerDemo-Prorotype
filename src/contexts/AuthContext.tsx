import { createContext, useContext, useState, type ReactNode } from 'react';

type User = {
  username: string;
  displayName: string;
  email: string;
  organization: string;
  initials: string;
};

type AuthContextValue = {
  user: User | null;
  login: (username: string, password: string) => { ok: true } | { ok: false; error: string };
  logout: () => void;
  updateName: (displayName: string) => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

const VALID_USERNAME = 'bruna';
const VALID_PASSWORD = 'Bruna2026';

function initialsFor(displayName: string): string {
  const parts = displayName.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function makeUser(username: string): User {
  const name = username.split('@')[0];
  const displayName = name.charAt(0).toUpperCase() + name.slice(1);
  return {
    username,
    displayName,
    email: name + '@kerv.ai',
    organization: 'Kerv',
    initials: initialsFor(displayName),
  };
}

// Default profile shown by the auto-login (the demo runs as Grant Gorton).
const DEFAULT_USER: User = {
  username: 'ggorton',
  displayName: 'Grant Gorton',
  email: 'ggorton@kerv.ai',
  organization: 'Kerv',
  initials: 'GG',
};

export function AuthProvider({ children }: { children: ReactNode }) {
  // Auto-login to match the vanilla app's default behavior.
  const [user, setUser] = useState<User | null>(() => DEFAULT_USER);

  const login: AuthContextValue['login'] = (username, password) => {
    if (username.trim() === VALID_USERNAME && password === VALID_PASSWORD) {
      setUser(makeUser(username.trim()));
      return { ok: true };
    }
    return { ok: false, error: 'Invalid credentials.' };
  };

  const logout = () => setUser(null);

  const updateName: AuthContextValue['updateName'] = (displayName) => {
    const trimmed = displayName.trim();
    if (!trimmed) return;
    setUser((prev) => (prev ? { ...prev, displayName: trimmed, initials: initialsFor(trimmed) } : prev));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateName }}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
