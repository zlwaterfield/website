// Downloads a favicon for every entry in data/investments.json into
// public/favicons/<hostname>.png, so the site serves its own icons instead of
// hitting a third-party service on every page view.
//
//   npm run favicons
//
// Run it after adding an investment; the page derives the filename from the
// entry's url, so a missing file just renders as an empty square.
import fs from 'node:fs/promises';
import path from 'node:path';

const OUT_DIR = path.resolve('./public/favicons');
const SIZE = 128; // 2x the rendered size, for retina

const investments = JSON.parse(await fs.readFile(path.resolve('./data/investments.json'), 'utf-8'));

await fs.mkdir(OUT_DIR, { recursive: true });

let failures = 0;

for (const { name, url } of investments) {
  const { hostname } = new URL(url);
  const source = `https://www.google.com/s2/favicons?domain=${hostname}&sz=${SIZE}`;

  try {
    const response = await fetch(source, { redirect: 'follow' });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const bytes = Buffer.from(await response.arrayBuffer());
    await fs.writeFile(path.join(OUT_DIR, `${hostname}.png`), bytes);
    console.log(`✓ ${name} (${hostname}) — ${bytes.length} bytes`);
  } catch (error) {
    failures += 1;
    console.error(`✗ ${name} (${hostname}) — ${error.message}`);
  }
}

if (failures > 0) {
  console.error(`\n${failures} icon(s) failed to download.`);
  process.exit(1);
}
