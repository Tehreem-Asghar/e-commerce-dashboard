// Define a type that matches NextAuth's expectations
// types/type.ts
export interface NextAuthUser {
    id : string;
    email: string;
    name: string;
    role: string;
    image?: string;
    address?: string;  // Added address
    phone?: number; 
  }