const puppeteer = require('puppeteer');
const path = require('path');

async function convertToPDF(htmlFile, pdfFile) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  const htmlPath = path.resolve(__dirname, '..', 'public', 'resources', htmlFile);
  const fileUrl = 'file:///' + htmlPath.split(path.sep).join('/');
  await page.goto(fileUrl, { waitUntil: 'networkidle0' });
  const pdfPath = path.resolve(__dirname, '..', 'public', 'resources', pdfFile);
  await page.pdf({
    path: pdfPath,
    format: 'A4',
    margin: { top: '20mm', bottom: '20mm', left: '15mm', right: '15mm' },
    printBackground: true,
  });
  await browser.close();
  console.log('Created: ' + pdfFile);
}

async function main() {
  await convertToPDF('guide-rpo-vs-cabinet.html', 'guide-rpo-vs-cabinet.pdf');
  await convertToPDF('scorecard-recrutement.html', 'scorecard-recrutement.pdf');
  await convertToPDF('grille-remuneration-tech-2026.html', 'grille-remuneration-tech-2026.pdf');
  await convertToPDF('checklist-onboarding.html', 'checklist-onboarding.pdf');
  console.log('All 4 PDFs created!');
}

main().catch(console.error);
