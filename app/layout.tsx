import type { Metadata } from "next";
import { Newsreader, Open_Sans } from "next/font/google";
import "./globals.css";
import { PHProvider } from "./providers";

const openSans = Open_Sans({ subsets: ["latin"] });
const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://zlwaterfield.com"),
  title: "Zach Waterfield - Engineer, Investor & Coffee Enthusiast ☕",
  alternates: {
    types: { "application/rss+xml": "/rss.xml" },
  },
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
        <body className={`${openSans.className} ${newsreader.variable}`}>{children}</body>
      </PHProvider>
    </html>
  );
}
