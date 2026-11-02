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
  title: "Zach Waterfield",
  description: "Engineer, investor, and coffee enthusiast based in Toronto, Canada.",
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
      <PHProvider>
        <body className={`${openSans.className} ${newsreader.variable}`}>{children}</body>
      </PHProvider>
    </html>
  );
}
