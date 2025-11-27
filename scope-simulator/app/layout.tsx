// app/layout.tsx
import { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from 'next/link';
import { ReactNode } from 'react';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Scope View Simulator",
  description: "A simple scope view simulation app",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <nav style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
          <Link href="/" style={{ marginRight: '15px' }}>Scope View Simulator</Link>
          <Link href="/contact">Contact</Link>
        </nav>
        {children}
      </body>
    </html>
  );
}