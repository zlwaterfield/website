/**
 * Renders scripts/og-card.html to public/og.png at 1200x630 with headless
 * Chrome. Run after changing the tagline or the card template:
 *
 *   npm run og
 *
 * Checked into the repo so the build never depends on a browser being present.
 */
import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

const CARD = resolve('scripts/og-card.html');
const OUT = resolve('public/og.png');

const CHROME =
  process.env.CHROME_PATH ??
  ['google-chrome', 'chromium', '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'].find(
    (candidate) => candidate.startsWith('/') ? existsSync(candidate) : true,
  );

execFileSync(
  CHROME,
  [
    '--headless',
    '--disable-gpu',
    '--hide-scrollbars',
    '--window-size=1200,630',
    '--default-background-color=FFFFFFFF',
    // The card pulls webfonts, so give the renderer time to settle.
    '--virtual-time-budget=5000',
    `--screenshot=${OUT}`,
    `file://${CARD}`,
  ],
  { stdio: 'inherit' },
);

console.log(`Wrote ${OUT}`);
