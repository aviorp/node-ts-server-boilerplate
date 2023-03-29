import chromium from '@sparticuz/chromium';
import { chromium as playwright } from 'playwright-core';
export async function initBrowser() {
  const browser = await playwright.launch({
    args: chromium.args,
    executablePath: await chromium.executablePath(),
    headless: true,
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  return { browser, context, page };
}
