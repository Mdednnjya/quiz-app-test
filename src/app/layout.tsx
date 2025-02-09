import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {AuthProvider} from "@/contexts/auth-context";
import {Navbar} from "@/components/navbar";
import {QuizProvider} from "@/contexts/quiz-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Quiz App",
    description: "App created for test purpose on DOT Indonesia",
    icons: {
        icon: '/favicon.ico',
    },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      <AuthProvider>
          <QuizProvider>
              <Navbar/>
              {children}
          </QuizProvider>
      </AuthProvider>
      </body>
    </html>
  );
}
