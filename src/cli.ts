import { parseArgs } from 'node:util';
import { Paper } from './types.js';
import { chromium } from 'playwright';
import { generatePDF } from './pdf.js';

const options = {
  paper: {
    type: 'string',
    short: 'p',
    default: 'A4'
  },
} as const;

const {
  values,
  positionals
} = parseArgs({ options, allowPositionals: true });

const url = positionals[0];
const outputPath = positionals[1];
const v = values.paper.toUpperCase();
console.log(v);
if (v != 'A4' && v != 'A5') {
  throw new Error('Paper must be A4 or A5');
}
const paper = v as Paper;

const browser = await chromium.launch({ headless: true });
try {
  const context = await browser.newContext({ acceptDownloads: true });
  const page = await context.newPage();
  await page.goto(url, { waitUntil: 'networkidle' });
  await generatePDF(page, outputPath, paper);
  console.log(`Saved PDF to ${outputPath}`);
} catch (err) {
  console.error('Failed to save PDF:', err);
  process.exitCode = 1;
} finally {
  await browser.close();
}
