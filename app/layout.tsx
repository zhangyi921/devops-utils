import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Yi's DevOps utils",
  description: "Yi's DevOps utils",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
      <div style={{ padding: "20px" }}>
      <div style={{ display: "flex" }}>
        <h1>DevOps utils</h1>
        <button style={{ margin: 10 }}><Link href="/run">Run command on server💻</Link></button>
        <button style={{ margin: 10 }}><Link href="/connection-test">Test server's network connection🛜</Link></button>
      </div>
        {children}
        </div>
      </body>
    </html>
  );
}
