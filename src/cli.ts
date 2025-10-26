#!/usr/bin/env node
import { chromium } from 'playwright';
import { Command, InvalidArgumentError } from 'commander';
import { generatePDF } from './pdf.js';
import { Paper } from './types.js';

function parsePaper(value: string): Paper {
  const v = value.toUpperCase();
  if (v === 'A4' || v === 'A5') return v as Paper;
  throw new InvalidArgumentError('Paper must be A4 or A5');
}

export async function run(argv = process.argv) {
  const program = new Command();

  program
    .name('url2pdf')
    .description('Generate a print-styled PDF from a URL using Playwright (Chromium headless).')
    .argument('<url>', 'URL to generate PDF from')
    .argument('[output]', 'Output PDF path', 'page.pdf')
    .option('-p, --paper <size>', 'Paper size (A4 or A5)', parsePaper, 'A4')
    .action(async (url: string, output: string, opts: { paper: Paper }) => {
      const browser = await chromium.launch({ headless: true });
      try {
        const context = await browser.newContext({ acceptDownloads: true });
        const page = await context.newPage();
        await page.goto(url, { waitUntil: 'networkidle' });
        await generatePDF(page, output, opts.paper);
        console.log(`Saved PDF to ${output}`);
      } catch (err) {
        console.error('Failed to save PDF:', err);
        process.exitCode = 1;
      } finally {
        await browser.close();
      }
    });

  await program.parseAsync(argv);
}

// executed via bin or npm script
run();
