import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { UserRole } from "@/types/lms";

interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => { success: boolean; error?: string };
  signUp: (name: string, email: string, password: string, role: UserRole) => { success: boolean; error?: string };
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  signIn: () => ({ success: false }),
  signUp: () => ({ success: false }),
  signOut: () => {},
});

export const useAuth = () => useContext(AuthContext);

const USERS_KEY = "learnhub_users";
const SESSION_KEY = "learnhub_session";

interface StoredUser extends AuthUser {
  password: string;
}

const defaultUsers: StoredUser[] = [
  { id: "inst-1", name: "Dr. Sarah Chen", email: "sarah@lms.com", password: "password123", role: "instructor", avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face" },
  { id: "inst-2", name: "James Rodriguez", email: "james@lms.com", password: "password123", role: "instructor", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" },
  { id: "inst-3", name: "Emily Park", email: "emily@lms.com", password: "password123", role: "instructor", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face" },
  { id: "stu-1", name: "Alex Johnson", email: "alex@student.com", password: "password123", role: "student", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face" },
  { id: "stu-2", name: "Maria Garcia", email: "maria@student.com", password: "password123", role: "student", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face" },
  { id: "stu-3", name: "David Kim", email: "david@student.com", password: "password123", role: "student", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face" },
  { id: "stu-4", name: "Sophie Williams", email: "sophie@student.com", password: "password123", role: "student", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face" },
  { id: "stu-5", name: "Ryan Patel", email: "ryan@student.com", password: "password123", role: "student", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" },
  { id: "stu-6", name: "Lisa Zhang", email: "lisa@student.com", password: "password123", role: "student", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face" },
];

const getStoredUsers = (): StoredUser[] => {
  try {
    const stored = localStorage.getItem(USERS_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  localStorage.setItem(USERS_KEY, JSON.stringify(defaultUsers));
  return defaultUsers;
};

const getSession = (): AuthUser | null => {
  try {
    const stored = localStorage.getItem(SESSION_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return null;
};

const avatars = [
  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&h=100&fit=crop&crop=face",
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(getSession);

  const signIn = useCallback((email: string, password: string) => {
    const users = getStoredUsers();
    const found = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    if (!found) return { success: false, error: "Invalid email or password" };
    const session: AuthUser = { id: found.id, name: found.name, email: found.email, role: found.role, avatar: found.avatar };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    setUser(session);
    return { success: true };
  }, []);

  const signUp = useCallback((name: string, email: string, password: string, role: UserRole) => {
    const users = getStoredUsers();
    if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
      return { success: false, error: "Email already registered" };
    }
    const id = `${role === "instructor" ? "inst" : "stu"}-${Date.now()}`;
    const avatar = avatars[Math.floor(Math.random() * avatars.length)];
    const newUser: StoredUser = { id, name, email, password, role, avatar };
    const updated = [...users, newUser];
    localStorage.setItem(USERS_KEY, JSON.stringify(updated));
    const session: AuthUser = { id, name, email, role, avatar };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    setUser(session);
    return { success: true };
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
