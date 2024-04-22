import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    signIn: '/login',
  },
  secret: process.env.AUTH_SECRET,
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
        console.log("authorized callback")
        return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;