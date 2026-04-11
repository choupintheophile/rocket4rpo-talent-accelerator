/**
 * Convert all HTML resource files to PDF using Puppeteer.
 * Run: node scripts/generate-pdfs.mjs
 */

import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const RESOURCES_DIR = path.resolve(__dirname, "../public/resources");

async function main() {
  const htmlFiles = fs
    .readdirSync(RESOURCES_DIR)
    .filter((f) => f.endsWith(".html"))
    .sort();

  console.log(`Found ${htmlFiles.length} HTML files to convert\n`);

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  for (const htmlFile of htmlFiles) {
    const htmlPath = path.join(RESOURCES_DIR, htmlFile);
    const pdfFile = htmlFile.replace(".html", ".pdf");
    const pdfPath = path.join(RESOURCES_DIR, pdfFile);

    try {
      const page = await browser.newPage();

      // Load the HTML file
      const htmlContent = fs.readFileSync(htmlPath, "utf-8");
      await page.setContent(htmlContent, { waitUntil: "networkidle0" });

      // Generate PDF
      await page.pdf({
        path: pdfPath,
        format: "A4",
        margin: { top: "20mm", right: "15mm", bottom: "20mm", left: "15mm" },
        printBackground: true,
        displayHeaderFooter: false,
      });

      await page.close();

      const size = (fs.statSync(pdfPath).size / 1024).toFixed(0);
      console.log(`✓ ${pdfFile} (${size} KB)`);
    } catch (err) {
      console.error(`✗ ${htmlFile}: ${err.message}`);
    }
  }

  await browser.close();

  const pdfCount = fs.readdirSync(RESOURCES_DIR).filter((f) => f.endsWith(".pdf")).length;
  console.log(`\nDone! ${pdfCount} PDF files in ${RESOURCES_DIR}`);
}

main().catch(console.error);
