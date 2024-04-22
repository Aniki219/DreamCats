'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/../auth';
import { AuthError } from 'next-auth';

import { isRedirectError } from "next/dist/client/components/redirect";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
    try {
        await signIn('credentials', {
            redirectTo: "/tree",
            email: formData.get("email") as string,
            password:formData.get("password") as string
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