import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { PHProvider } from "./providers";

const openSans = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Zach Waterfield - Engineer, Investor & Coffee Enthusiast ☕",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Jersey+10&display=swap" rel="stylesheet" />
      </head>
      <PHProvider>
        <body className={openSans.className}>{children}</body>
      </PHProvider>
    </html>
  );
}
