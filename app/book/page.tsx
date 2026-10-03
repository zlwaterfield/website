import Script from "next/script";

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
