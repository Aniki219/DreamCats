import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import bcrypt from 'bcryptjs';
import type { NextAuthConfig } from 'next-auth';
import { getUserByEmail } from '@/services/userService';
import { User } from '@prisma/client';

export const authConfig = {
    pages: {
        signIn: '/login',
    },
    trustHost: true,
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            console.log("authorized callback")
            return true;
        },
    },
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === "development",
    providers: [
        Credentials({
            name: 'credentials',
            async authorize(credentials, req) {
                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string().min(6) })
                    .safeParse(credentials);

                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data;
                    const user = await getUserByEmail(email);
                    if (!user) throw Error("User not found");
                    const passwordsMatch = await bcrypt.compare(password, user.password);
                    if (passwordsMatch) return user; //{ id: user.id.toString(), name: user.username, email: user.email } as { id: string, name: string, email: string };
                }

                console.log('Invalid credentials');
                return null;
            },
        }),
    ],
} satisfies NextAuthConfig;

export const { auth, signIn, signOut, handlers: { GET, POST } } = NextAuth(authConfig);