const EMBED_URL = 'https://cal.com';

export default function BookPage() {
  return (
    <main className="min-h-screen p-4 sm:p-8 md:p-12">
      <iframe
        src={EMBED_URL}
        className="h-[calc(100vh-2rem)] sm:h-[calc(100vh-4rem)] md:h-[calc(100vh-6rem)] w-full border-0"
        title="Booking"
      />
    </main>
  );
}
