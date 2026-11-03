import type { Metadata } from "next";
import Script from "next/script";

/**
 * The listing is rendered client-side by a third-party script, so there is
 * nothing here for a crawler to read. Indexing it would publish an empty page
 * under this domain, which is a thin-content signal that drags on the pages
 * that do have substance.
 */
export const metadata: Metadata = {
  title: "Book a stay",
  robots: { index: false, follow: true },
};

export default function BookPage() {
  return (
    <main className="min-h-screen p-4 sm:p-8 md:p-12">
      <div className="flex items-start justify-between gap-8">
        <div>
          <div data-rove-embed data-listing="surfside-villa" />
          <Script
            src="https://www.rovetravel.com/embed/v1/embed.js"
            strategy="afterInteractive"
          />
        </div>
      </div>
    </main>
  );
}
