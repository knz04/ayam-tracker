import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

export const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ayam Tracker",
  description: "Ayam Tracker is a simple app to track your ayam consumption.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html data-theme="bumblebee" lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
