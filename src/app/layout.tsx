import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import { siteName } from "@/constants/meta";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: siteName,
  description: `${siteName} is a tool to create professional resumes online`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
