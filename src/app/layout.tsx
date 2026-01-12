import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import BackgroundParticles from "@/components/ui/BackgroundParticles";
import ScrollReset from "@/components/layout/ScrollReset";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "My Portfolio",
  description: "A showcase of my work and skills.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased bg-background text-foreground`}>
        <ScrollReset />
        <BackgroundParticles />
        <Navbar />
        <main className="min-h-screen flex flex-col items-center w-full">
          {children}
        </main>
      </body>
    </html>
  );
}
