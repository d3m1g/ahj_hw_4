import puppeteer from 'puppeteer';
import { fork } from 'child_process';

jest.setTimeout(30000);

describe('Credit Card Validator form', () => {
  let browser = null;
  let page = null;
  let server = null;
  const baseUrl = 'http://localhost:9000';

  beforeAll(async () => {
    server = fork(`${__dirname}/e2e.server.js`);
    await new Promise((resolve, reject) => {
      server.on('error', reject);
      server.on('message', (message) => {
        if (message === 'ok') {
          resolve();
        }
      });
    });

    browser = await puppetteer.launch({
      // headless: false, // show gui
      // slowMo: 250,
      // devtools: true, // show devTools
    });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
    server.kill();
  });

  describe('Credit Card Validator form', () => {
    test('should add .valid class for valid card number', async () => {
      await page.goto(baseUrl);

      const form = await page.$('[data-id=form-selector]');
      const input = await form.$('[data-id=input-selector]');
      await input.type('371449635398431');

      const submit = await form.$('[data-id=click-selector]');
      submit.click();

      await page.waitForSelector('.valid');
    });

    test('should add .invalid class for not valid card number', async () => {
      await page.goto(baseUrl);

      const form = await page.$('[data-id=form-selector]');
      const input = await form.$('[data-id=input-selector]');
      await input.type('371449635398430');

      const submit = await form.$('[data-id=click-selector]');
      submit.click();

      await page.waitForSelector('.invalid');
    });
  });
});