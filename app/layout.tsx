import type { Metadata } from "next";
import { Newsreader, Open_Sans } from "next/font/google";
import "./globals.css";
import { PHProvider } from "./providers";
import { JsonLd } from "./components/JsonLd";
import { graph, personSchema, websiteSchema } from "@/lib/schema";
import { AUTHOR, SITE, SITE_URL } from "@/lib/site";

const openSans = Open_Sans({ subsets: ["latin"] });
const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE.name} — engineer and investor in Toronto`,
    template: `%s - ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: AUTHOR.name, url: SITE_URL }],
  creator: AUTHOR.name,
  publisher: AUTHOR.name,
  keywords: [
    "Zach Waterfield",
    "software engineer Toronto",
    "angel investor Toronto",
    "developer tools investor",
    "B2B SaaS investor",
    "startup advisor",
    "engineering leadership",
  ],
  category: "technology",
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": [{ url: "/rss.xml", title: `${SITE.name} — Writing` }],
      "text/plain": [{ url: "/llms.txt", title: "llms.txt" }],
    },
  },
  // `max-snippet: -1` removes the length cap on text pulled into a result or an
  // AI answer. Google requires snippet eligibility to use a page in AI
  // Overviews and AI Mode at all, so capping it would opt the site out.
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: `${SITE.name} — engineer and investor in Toronto`,
    description: SITE.description,
    url: SITE_URL,
    locale: "en_CA",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: `${SITE.name} — ${SITE.tagline}` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — engineer and investor in Toronto`,
    description: SITE.description,
    creator: "@zlwaterfield",
    site: "@zlwaterfield",
    images: ["/og.png"],
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
        {/* One graph for the whole site: the Person and WebSite nodes every page
            references by @id, so a crawler resolves them from any entry point. */}
        <JsonLd schema={graph(personSchema(), websiteSchema())} />
      </head>
      <PHProvider>
        <body className={`${openSans.className} ${newsreader.variable}`}>{children}</body>
      </PHProvider>
    </html>
  );
}
