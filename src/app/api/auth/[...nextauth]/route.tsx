import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import type { User } from '@/app/lib/definitions';
import bcrypt from 'bcryptjs';
import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
      authorized({ auth, request: { nextUrl } }) {
          console.log("authorized callback")
          return true;
        },
    },   
    session: {
      strategy: "jwt"
    },
    secret: process.env.NEXT_PUBLIC_SECRET,
    debug: process.env.NODE_ENV === "development",
    providers: [
        Credentials({
            name:'credentials',
          async authorize(credentials, req) {
            const parsedCredentials = z
              .object({ email: z.string().email(), password: z.string().min(6) })
              .safeParse(credentials);
     
            if (parsedCredentials.success) {
              const { email, password } = parsedCredentials.data;
              const user = await getUser(email);
              if (!user) return null;
              const passwordsMatch = await bcrypt.compare(password, user.password);
              if (passwordsMatch) return user;
            }
            
            console.log('Invalid credentials');
            return null;
          },
        }),
      ],
} satisfies NextAuthConfig;
 
async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
}
}

export const { auth, signIn, signOut, handlers: { GET, POST } } = NextAuth(authConfig);