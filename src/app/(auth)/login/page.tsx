"use client"

import { useFormState, useFormStatus } from 'react-dom';
import { authenticate } from '../../lib/actions';
import { Button } from '../../ui/button';
import Link from 'next/link';

export default function LoginPage() {
    const [errorMessage, dispatch] = useFormState(authenticate, undefined);
 
    return (
        <>
            <form action={dispatch}>
                <div>
                    <h2>Please log in to continue.</h2>
                    <div>
                        <div>
                            <label htmlFor="email">Email</label>
                            <div>
                                <input
                                id="email"
                                type="email"
                                name="email"
                                placeholder="Enter your email address"
                                required
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="password">Password</label>
                            <div>
                                <input
                                id="password"
                                type="password"
                                name="password"
                                placeholder="Enter password"
                                required
                                minLength={6}
                                />
                            </div>
                        </div>
                    </div>
                    <LoginButton />
                    <div aria-live="polite" aria-atomic="true">
                        {errorMessage && (
                            <p>{errorMessage}</p>
                        )}
                    </div>
                </div>
            </form>
            <h2>Or Register a New Account</h2>
            <div>
                <Link href="/sign_up">
                    Create a New Account
                </Link>
            </div>
        </>
    );
}
   
function LoginButton() {
    const { pending } = useFormStatus();

    return (
        <Button aria-disabled={pending}>Log in</Button>
    );
}