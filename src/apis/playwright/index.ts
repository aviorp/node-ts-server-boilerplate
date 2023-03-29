import { chromium } from 'playwright';

let page;
let browser;
let context;

export const initBrowser: any = async () => {
  browser = await chromium.launch({ headless: true });
  context = await browser.newContext({ locale: 'en-US' });
  page = await context.newPage();
  return { page, browser };
};
