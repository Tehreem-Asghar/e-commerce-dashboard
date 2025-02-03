"use client";

import { SessionProvider } from "next-auth/react";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}

// Purpose: AuthProvider ek wrapper component hai jo SessionProvider ko wrap karta hai.
//  Yeh ek higher-order component jaisa kaam karta hai.
// Session Provide Karna: SessionProvider logged-in user ki session information 
// (jaise user details, token, etc.) ko puri application mein accessible banata hai.
// Global Access: Aapke app ke kisi bhi child component mein useSession hook use karke 
// session data access kiya ja sakta hai.