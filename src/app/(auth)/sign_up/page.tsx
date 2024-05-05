"use client"

import { useFormState, useFormStatus } from 'react-dom';
import { authenticate, register } from '../../lib/actions';
import { Button } from '../../ui/button';
import { useState } from 'react';

export default function SignUpPage() {
    const [errorMessage, dispatch] = useFormState(register, undefined);
 
    return (
        <form action={dispatch} autoComplete='off'>
            <div>
                <h1>Sign Up</h1>
                <div>
                    <div>
                        <label htmlFor="username">Username</label>
                        <div>
                            <input
                            id="username"
                            type="search"
                            name="username"
                            placeholder="Enter your desired username"
                            autoComplete='off'
                            required
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <div>
                            <input
                            id="email"
                            type="email"
                            name="email"
                            placeholder="Enter your email address"
                            autoComplete='off'
                            required
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <div>
                            <input
                            id="password"
                            type="search"
                            name="password"
                            placeholder="Enter password"
                            autoComplete='off'
                            required
                            minLength={6}
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <div>
                            <input
                            id="confirmPassword"
                            type="search"
                            name="confirmPassword"
                            placeholder=""
                            autoComplete='off'
                            required
                            minLength={6}
                            />
                        </div>
                    </div>
                </div>
                <SignUpButton />
                <div aria-live="polite" aria-atomic="true">
                    {errorMessage && (
                        <p>{errorMessage}</p>
                    )}
                </div>
            </div>
        </form>
    );
}
   
function SignUpButton() {
    const { pending } = useFormStatus();

    return (
        <Button disabled={pending}>Create Account</Button>
    );
}