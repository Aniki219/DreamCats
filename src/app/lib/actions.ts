'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { AuthError } from 'next-auth';

import { isRedirectError } from "next/dist/client/components/redirect";
import { signIn, signOut } from '../api/auth/[...nextauth]/route';
import { User } from './definitions';
import { getUserByEmail, getUserByUsername, saveUser } from '@/services/userService';
import { NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs'


export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
    try {
        await signIn('credentials', {
            redirectTo: "/tree",
            email: formData.get("email") as string,
            password: formData.get("password") as string
        });
    } catch (error) {
        if (isRedirectError(error)) {
            throw error;
        }

        if (error instanceof AuthError) {
            switch (error.type) {
            case 'CredentialsSignin':
                return 'Invalid credentials.';
            default:
                return 'Something went wrong.';
            }
        }
        throw error;
    }
}

export async function doSignOut() {
    try {
        await signOut({
            redirectTo: "/login",
        });
    } catch (error) {
        if (isRedirectError(error)) {
            throw error;
        }
        console.log(error);
        throw error
    }
}

export async function register(prevState: string | undefined, formData: FormData) {
    const newUser = {
        id: "0",
        username: formData.get("username") as string,
        email: formData.get("email") as string,
        password: formData.get("password") as string
    };
    const hashedPassword = await bcryptjs.hash(newUser.password, 10);

    try {
        const user = await saveUser({...newUser, password:hashedPassword})
        console.log(user);
        await signIn('credentials', {
            redirectTo: "/tree",
            email: newUser.email,
            password: newUser.password
        });
    } catch (error) {
        if (isRedirectError(error)) {
            throw error;
        }

        if (error instanceof AuthError) {
            switch (error.type) {
            case 'CredentialsSignin':
                return 'Invalid credentials.';
            default:
                return 'Something went wrong.';
            }
        }

        throw error;
    }
}