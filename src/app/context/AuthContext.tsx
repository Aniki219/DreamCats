'use client'

import { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import { ReactNode } from 'react'

export default function Provider({children, session }: { children: ReactNode, session?: Session }) {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}