import NextAuth from "next-auth/next"
import { authOptions } from "../../lib/auth";


const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };




































// import { getByEmail, verifyPassword } from "@/services/user";
// import NextAuth, { AuthOptions } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";

// export const authOptions: AuthOptions = {
//   // Configure session options
//   session: {
//     strategy: "jwt", // Explicitly use the "jwt" strategy
//   },

//   // Configure one or more authentication providers
//   providers: [
//     CredentialsProvider({
//       credentials: {
        
//       },

//       async authorize(credentials) {
//         const { email, password } = credentials as { email: string; password: string };

//         // Fetch the user by email
//         const user = await getByEmail(email);
//         if (!user) {
//           throw new Error("User not found");
//         }

//         // Validate the password
//         const isValid = await verifyPassword(user.hashedPassword, password);
//         if (!isValid) {
//           throw new Error("Incorrect Password");
//         }

//         // Return user object (this will be encoded into the JWT)
//         return { id: user.id, email: user.email, name: user.name };
//       },
//     }),
//     // Add more providers if needed
//   ],
// };

// export default NextAuth(authOptions);


