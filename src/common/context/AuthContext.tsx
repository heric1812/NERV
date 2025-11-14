import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { clearSession, getSession, saveSession } from "../utils/secureStore";
import { Operator } from "@/src/types";

type AuthContextType = {
  operator: Operator | null;
  isSignedIn: boolean;
  signIn: (operator: Operator) => Promise<void>;
  signOut: () => Promise<void>;
  session: () => Promise<string | null>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isSignedIn, setSignedIn] = useState(false);
  const [operator, setOperator] = useState<Operator | null>(null);

  const signIn = async (operator: Operator) => {
    await saveSession(JSON.stringify(operator));
    setOperator(operator);
    setSignedIn(true);
  };

  const signOut = async () => {
    await clearSession();
    setOperator(null);
    setSignedIn(false);
  };

  const session = async () => {
    const data = await getSession();
    return data ? JSON.parse(data) : null;
  };

  useEffect(() => {
    const verifySession = async () => {
      const existingSession = await session();
      setOperator(existingSession);
      setSignedIn(!!existingSession);
    };

    verifySession();
  }, []);

  return (
    <AuthContext.Provider value={{ operator, isSignedIn, signIn, signOut, session }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export default AuthContext;
