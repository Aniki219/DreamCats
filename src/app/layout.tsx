import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./output.css";

import Provider from "./context/AuthContext";
import { auth } from "./api/auth/[...nextauth]/route";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Dream Cats",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await auth();

    return (
        <html lang="en">
            <body className={inter.className}>
                <Provider session={session!}>
                    {children}
                </Provider>
            </body>
        </html>
    );
}
