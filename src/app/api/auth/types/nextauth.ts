import NextAuth from "next-auth";
import { DefaultSession } from "next-auth";

// Extend the Session and User types
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      email: string;
      name?: string;
      image?: string;
      role?: string;
      address?: string;
      phone?: number;
    } & DefaultSession["user"]; // Merge with default session user properties
  }

  interface User {
    id: string;
    email: string;
    name?: string;
    image?: string;
    role?: string;
    address?: string;
    phone?: number;
  }
}





console.log(NextAuth)





// import NextAuth from "next-auth";
// import { DefaultSession } from "next-auth";

// // Extend the session type to include additional user properties
// declare module "next-auth" {
//   interface Session {
//     user: {
//       id :string;
//       email: string;
//       name?: string;
//       image?: string;
//       role?: string;
//       address?: string;
//       phone?: number;
//     };
//   }

//   interface User {
//     id : string;
//     email: string;
//     name?: string;
//     image?: string;
//     role?: string;
//     address?: string;
//     phone?: number;
//   }
// }
  
//   // Typically, NextAuth's User type may look something like this:
  
    
    







































