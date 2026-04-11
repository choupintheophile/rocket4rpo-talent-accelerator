import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIR = path.resolve(__dirname, '../public/resources');

const files = fs.readdirSync(DIR).filter(f => f.endsWith('.html') && f !== 'moodboard-design.html').sort();

let fixed = 0;

for (const file of files) {
  const filepath = path.join(DIR, file);
  let content = fs.readFileSync(filepath, 'utf-8');
  const original = content;

  // Extract the cover-bottom div content
  const bottomMatch = content.match(/<div class="cover-bottom">[^<]*<\/div>/);
  if (!bottomMatch) {
    console.log(`SKIP (no cover-bottom): ${file}`);
    continue;
  }

  const bottomHtml = bottomMatch[0];

  // Remove cover-bottom from wherever it currently is
  content = content.replace(/\s*<div class="cover-bottom">[^<]*<\/div>/g, '');

  // Find the cover-meta closing div, and insert cover-bottom after it but before the cover closing div
  // Pattern: cover-meta content...</div>\n  </div>\n\n  <div class="content">
  // We want: cover-meta content...</div>\n    <div class="cover-bottom">...</div>\n  </div>\n\n  <div class="content">

  // Strategy: find </div> that comes just before <div class="content">
  // and insert cover-bottom before that </div>
  const contentDivIndex = content.indexOf('<div class="content">');
  if (contentDivIndex === -1) {
    console.log(`SKIP (no content div): ${file}`);
    continue;
  }

  // Find the </div> just before <div class="content">
  const beforeContent = content.substring(0, contentDivIndex);
  const lastCloseDivIndex = beforeContent.lastIndexOf('</div>');

  if (lastCloseDivIndex === -1) {
    console.log(`SKIP (no closing div before content): ${file}`);
    continue;
  }

  // Insert cover-bottom before this last </div>
  content = beforeContent.substring(0, lastCloseDivIndex) +
    `    ${bottomHtml}\n  ` +
    beforeContent.substring(lastCloseDivIndex) +
    content.substring(contentDivIndex);

  if (content !== original) {
    fs.writeFileSync(filepath, content, 'utf-8');
    console.log(`✓ Fixed: ${file}`);
    fixed++;
  }
}

console.log(`\nDone: ${fixed}/${files.length} files fixed`);
