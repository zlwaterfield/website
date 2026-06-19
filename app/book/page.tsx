const EMBED_URL = 'https://cal.com';

export default function BookPage() {
  return (
    <main className="min-h-screen p-4 sm:p-8 md:p-12">
      <script src="https://rovetravel.com/embed.js" data-rove-listing="surfside-villa" data-theme="light" async></script>
      <iframe src="https://rovetravel.com/embed/listing/surfside-villa?theme=light" width="100%" height="480" style="border:0;max-width:420px" loading="lazy" title="Book Direct"></iframe>
    </main>
  );
}
