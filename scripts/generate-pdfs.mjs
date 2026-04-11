/**
 * Convert all HTML resource files to premium PDF using Puppeteer.
 * Injects CSS inline so PDFs are styled even without a server.
 * Run: node scripts/generate-pdfs.mjs
 */

import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const RESOURCES_DIR = path.resolve(__dirname, "../public/resources");
const CSS_FILE = path.join(RESOURCES_DIR, "style-premium.css");

async function main() {
  // Read the CSS file
  const cssContent = fs.readFileSync(CSS_FILE, "utf-8");

  const htmlFiles = fs
    .readdirSync(RESOURCES_DIR)
    .filter((f) => f.endsWith(".html"))
    .sort();

  console.log(`Found ${htmlFiles.length} HTML files to convert`);
  console.log(`CSS loaded: ${(cssContent.length / 1024).toFixed(0)} KB\n`);

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  for (const htmlFile of htmlFiles) {
    const htmlPath = path.join(RESOURCES_DIR, htmlFile);
    const pdfFile = htmlFile.replace(".html", ".pdf");
    const pdfPath = path.join(RESOURCES_DIR, pdfFile);

    try {
      let htmlContent = fs.readFileSync(htmlPath, "utf-8");

      // Replace external CSS link with inline <style> block
      htmlContent = htmlContent.replace(
        /<link\s+rel="stylesheet"\s+href="[^"]*style-premium\.css"[^>]*>/gi,
        `<style>${cssContent}</style>`
      );

      // Also handle any remaining external CSS links that point to /resources/
      htmlContent = htmlContent.replace(
        /<link\s+rel="stylesheet"\s+href="\/resources\/[^"]*"[^>]*>/gi,
        ""
      );

      const page = await browser.newPage();

      // Set content with base URL for any relative resources
      await page.setContent(htmlContent, {
        waitUntil: "networkidle0",
        timeout: 10000,
      });

      // Wait for fonts to load
      await page.evaluateHandle("document.fonts.ready");

      // Generate PDF with premium settings
      await page.pdf({
        path: pdfPath,
        format: "A4",
        margin: { top: "15mm", right: "12mm", bottom: "15mm", left: "12mm" },
        printBackground: true,
        displayHeaderFooter: false,
        preferCSSPageSize: false,
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
  const totalSize = fs.readdirSync(RESOURCES_DIR)
    .filter((f) => f.endsWith(".pdf"))
    .reduce((sum, f) => sum + fs.statSync(path.join(RESOURCES_DIR, f)).size, 0);

  console.log(`\n✓ Done! ${pdfCount} PDFs generated (${(totalSize / 1024 / 1024).toFixed(1)} MB total)`);
}

main().catch(console.error);
