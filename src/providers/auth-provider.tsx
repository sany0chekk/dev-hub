"use client";

import { createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  User,
  signOut as firebaseSignOut,
  GithubAuthProvider,
} from "firebase/auth";

import { auth } from "@/lib/firebase/firebase-config";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithGithub: () => Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const cachedUser = localStorage.getItem("user");
    if (cachedUser) {
      setUser(JSON.parse(cachedUser));
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (isMounted) {
        setUser(user);
        setIsLoading(false);
        if (user) {
          localStorage.setItem("user", JSON.stringify(user));
        } else {
          localStorage.removeItem("user");
        }
      }
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  const signInWithGoogle = async () => {
    try {
      setIsLoading(true);
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      localStorage.setItem("user", JSON.stringify(result.user));
    } catch (error) {
      console.error("Sign-in error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithGithub = async () => {
    try {
      setIsLoading(true);
      const provider = new GithubAuthProvider();
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      localStorage.setItem("user", JSON.stringify(result.user));
    } catch (error) {
      console.error("Sign-in error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setIsLoading(true);
      await firebaseSignOut(auth);
      setUser(null);
      localStorage.removeItem("user");
    } catch (error) {
      console.error("Sign-out error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoading, signInWithGoogle, signInWithGithub, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};
