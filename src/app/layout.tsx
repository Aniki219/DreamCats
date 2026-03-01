"use client"

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { HeroUIProvider } from "@heroui/react";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className="dark">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<HeroUIProvider>
					<h1 className="header">Dream Cats</h1>
					<div className="content">
						<div className="navbar">
							<ul>
								<li>Do thing 1</li>
								<li>Do thing 2</li>
								<li>Do thing 3</li>
							</ul>
						</div>
						<div className="game-display">
							{children}

						</div>
						<div className="catsbar">
							<ul>
								<li>Cat 1</li>
								<li>Cat 2</li>
								<li>Cat 3</li>
							</ul>
						</div>
					</div>
					<h1 className="header">Footer</h1>
				</HeroUIProvider>
			</body>
		</html>
	);
}
