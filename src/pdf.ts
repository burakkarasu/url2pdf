import { Page } from 'playwright';
import { Paper } from './types.js';
import { defaultLayouts } from './layouts.js';

export async function generatePDF(page: Page, outputFilePath: string, paper: Paper = 'A4') {
  await page.emulateMedia({ media: 'print' });
  const layout = defaultLayouts[paper];

  let pdfOptions;
  if (paper === 'CUSTOM') {
    pdfOptions = {
      path: outputFilePath,
      width: '954px',
      height: '1696px',
      printBackground: true,
      margin: layout.margin,
      scale: layout.scale,
    };
  } else {
    pdfOptions = {
      path: outputFilePath,
      format: paper,
      printBackground: true,
      margin: layout.margin,
      scale: layout.scale,
    };
  }

  await page.pdf(pdfOptions);
}
