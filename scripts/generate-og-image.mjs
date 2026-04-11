import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function main() {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();

  await page.setViewport({ width: 1200, height: 630 });

  await page.setContent(`
    <html>
    <head>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
          width: 1200px;
          height: 630px;
          background: #0c111d;
          font-family: 'Inter', sans-serif;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }
        .orb1 {
          position: absolute;
          top: -80px;
          right: -80px;
          width: 400px;
          height: 400px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(13,147,115,0.25) 0%, transparent 70%);
        }
        .orb2 {
          position: absolute;
          bottom: -60px;
          left: -60px;
          width: 300px;
          height: 300px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(16,185,129,0.15) 0%, transparent 70%);
        }
        .grid {
          position: absolute;
          inset: 0;
          opacity: 0.04;
          background-image:
            linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px);
          background-size: 50px 50px;
        }
        .content {
          position: relative;
          text-align: center;
          max-width: 900px;
          padding: 0 60px;
        }
        .logo {
          font-size: 18px;
          font-weight: 900;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          margin-bottom: 40px;
          opacity: 0.9;
        }
        .logo span {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          background: #10b981;
          border-radius: 6px;
          font-size: 18px;
          font-weight: 900;
          letter-spacing: 0;
          margin: 0 2px;
        }
        h1 {
          font-size: 52px;
          font-weight: 900;
          line-height: 1.1;
          letter-spacing: -0.02em;
          margin-bottom: 20px;
        }
        h1 em {
          font-style: normal;
          color: #10b981;
        }
        .sub {
          font-size: 20px;
          color: rgba(255,255,255,0.5);
          line-height: 1.5;
        }
        .stats {
          display: flex;
          gap: 40px;
          justify-content: center;
          margin-top: 40px;
          padding-top: 24px;
          border-top: 1px solid rgba(255,255,255,0.08);
        }
        .stat-val {
          font-size: 28px;
          font-weight: 800;
          color: #10b981;
        }
        .stat-lbl {
          font-size: 11px;
          color: rgba(255,255,255,0.35);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-top: 2px;
        }
        .line {
          position: absolute;
          top: 30px;
          left: 50%;
          transform: translateX(-50%);
          width: 50px;
          height: 3px;
          background: #10b981;
          border-radius: 2px;
        }
      </style>
    </head>
    <body>
      <div class="orb1"></div>
      <div class="orb2"></div>
      <div class="grid"></div>
      <div class="line"></div>
      <div class="content">
        <div class="logo">ROCKET<span>4</span>RPO</div>
        <h1>Recruteur senior <em>intégré</em> en 48h</h1>
        <p class="sub">Le top 1% des Talent Acquisition de France. RPO, CDD, CDI.</p>
        <div class="stats">
          <div><div class="stat-val">200+</div><div class="stat-lbl">Recrutements</div></div>
          <div><div class="stat-val">48h</div><div class="stat-lbl">Pour démarrer</div></div>
          <div><div class="stat-val">92%</div><div class="stat-lbl">Rétention 12 mois</div></div>
          <div><div class="stat-val">5x</div><div class="stat-lbl">Moins cher</div></div>
        </div>
      </div>
    </body>
    </html>
  `, { waitUntil: 'networkidle0' });

  await page.evaluateHandle('document.fonts.ready');

  const outputPath = path.resolve(__dirname, '../public/og-default.png');
  await page.screenshot({ path: outputPath, type: 'png' });

  const fs = await import('fs');
  const size = (fs.default.statSync(outputPath).size / 1024).toFixed(0);
  console.log(`Generated og-default.png (${size} KB)`);

  await browser.close();
}

main().catch(console.error);
