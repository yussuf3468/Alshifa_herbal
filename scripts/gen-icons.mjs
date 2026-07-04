// Generate PNG app icons from the Al-Shifa Herbal sprig mark using sharp.
// Run: node scripts/gen-icons.mjs
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = resolve(__dirname, "../public");

// White herbal sprig + gold bud, drawn in a 1024×1024 design space so it
// scales cleanly to any icon size.
const sprig = `
  <g fill="#f5f2ea">
    <path d="M497 780 C 497 626 499 474 512 336 C 525 474 527 626 527 780 Z"/>
    <g transform="translate(512 640) rotate(-32)"><path d="M0 0 C 66 -62 156 -62 224 0 C 156 62 66 62 0 0 Z"/></g>
    <g transform="translate(512 640) rotate(-148)"><path d="M0 0 C 66 -62 156 -62 224 0 C 156 62 66 62 0 0 Z"/></g>
    <g transform="translate(512 524) rotate(-30) scale(0.82)"><path d="M0 0 C 66 -62 156 -62 224 0 C 156 62 66 62 0 0 Z"/></g>
    <g transform="translate(512 524) rotate(-150) scale(0.82)"><path d="M0 0 C 66 -62 156 -62 224 0 C 156 62 66 62 0 0 Z"/></g>
    <g transform="translate(512 430) rotate(-28) scale(0.62)"><path d="M0 0 C 66 -62 156 -62 224 0 C 156 62 66 62 0 0 Z"/></g>
    <g transform="translate(512 430) rotate(-152) scale(0.62)"><path d="M0 0 C 66 -62 156 -62 224 0 C 156 62 66 62 0 0 Z"/></g>
  </g>
  <circle cx="512" cy="330" r="44" fill="#b9863a"/>`;

// Evergreen tile + sprig. Maskable icons scale the art into a ~80% safe zone
// and go full-bleed (square); standard icons get rounded corners.
const tile = (size, { maskable = false } = {}) => {
  const radius = maskable ? 0 : Math.round(1024 * 0.22);
  const rx = radius ? `rx="${radius}" ry="${radius}"` : "";
  const art = maskable
    ? `<g transform="translate(512 512) scale(0.8) translate(-512 -512)">${sprig}</g>`
    : sprig;
  return Buffer.from(
    `<svg width="${size}" height="${size}" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
       <defs>
         <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
           <stop offset="0%" stop-color="#236b51"/>
           <stop offset="100%" stop-color="#123c2d"/>
         </linearGradient>
         <radialGradient id="sheen" cx="0.3" cy="0.2" r="1">
           <stop offset="0%" stop-color="#ffffff" stop-opacity="0.18"/>
           <stop offset="55%" stop-color="#ffffff" stop-opacity="0"/>
         </radialGradient>
       </defs>
       <rect width="1024" height="1024" ${rx} fill="url(#bg)"/>
       <rect width="1024" height="1024" ${rx} fill="url(#sheen)"/>
       ${art}
     </svg>`,
  );
};

const targets = [
  { file: "alshifa-icon-192.png", size: 192 },
  { file: "alshifa-icon-512.png", size: 512 },
  { file: "alshifa-icon-maskable-512.png", size: 512, maskable: true },
  { file: "alshifa-icon-180.png", size: 180 }, // apple-touch
  { file: "alshifa-icon-152.png", size: 152 }, // apple-touch (iPad)
  { file: "alshifa-icon-32.png", size: 32 },
  { file: "favicon-16.png", size: 16 },
];

await mkdir(publicDir, { recursive: true });

for (const t of targets) {
  const svg = tile(t.size, { maskable: t.maskable });
  await sharp(svg, { density: 384 })
    .resize(t.size, t.size)
    .png()
    .toFile(resolve(publicDir, t.file));
  console.log(`✓ ${t.file} (${t.size}x${t.size}${t.maskable ? ", maskable" : ""})`);
}

console.log("Done.");
