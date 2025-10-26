import { Page } from 'playwright';
import { Paper } from './types.js';
import { defaultLayouts } from './layouts.js';

export async function generatePDF(page: Page, outputFilePath: string, paper: Paper = 'A4') {
  await page.emulateMedia({ media: 'print' });
  const layout = defaultLayouts[paper];
  const pdfOptions = {
    path: outputFilePath,
    format: paper,
    printBackground: true,
    margin: layout.margin,
    scale: layout.scale,
  } as const;
  await page.pdf(pdfOptions);
}
