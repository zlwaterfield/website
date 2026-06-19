export default function BookPage() {
  return (
    <main className="min-h-screen p-4 sm:p-8 md:p-12">
      <div className="flex items-start justify-between gap-8">
        <div>
          <script
            src="https://rovetravel.com/embed.js"
            data-rove-listing="surfside-villa"
            data-theme="light"
            async
          />
        </div>

        <iframe
          src="https://rovetravel.com/embed/listing/surfside-villa?theme=light"
          width="100%"
          height="480"
          style={{ border: 0, maxWidth: 420 }}
          loading="lazy"
          title="Book Direct"
        />
      </div>
    </main>
  );
}
