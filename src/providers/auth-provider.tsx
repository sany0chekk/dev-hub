"use client";

import { createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  User,
  signOut as firebaseSignOut,
} from "firebase/auth";

import { auth } from "@/lib/firebase/firebase-config";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    setUser(user);
  };

  const signOut = async () => {
    await firebaseSignOut(auth);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoading, signInWithGoogle, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};
