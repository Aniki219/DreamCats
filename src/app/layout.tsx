import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Provider from "./context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dream Cats",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        
        <body className={inter.className}>
            <Provider>
                {children}
            </Provider>
        </body>
    </html>
  );
}
