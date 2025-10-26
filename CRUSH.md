Usage
- Generate PDF: npm run pdf -- "<url>" [output.pdf] [--paper=A4|A5]

Development
- Install: npm install
- Tests: npx playwright test

Notes
- Single entrypoint: npm run pdf (runs node --import tsx ./src/cli.ts)
- Uses Playwright Chromium headless with print media, background graphics, and predefined A4/A5 layouts
