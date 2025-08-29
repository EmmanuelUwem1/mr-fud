/* eslint-disable @typescript-eslint/no-require-imports */
const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const fs = require("fs");
/* eslint-enable @typescript-eslint/no-require-imports */

puppeteer.use(StealthPlugin());

async function scrapeOcicatHolders() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/114 Safari/537.36"
  );

  const url =
    "https://bscscan.com/token/0xE53D384Cf33294C1882227ae4f90D64cF2a5dB70#balances";
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });

  await page.waitForSelector("#maintable tbody tr", { timeout: 30000 });

  const holders = await page.$$eval("#maintable tbody tr", (rows) =>
    rows.slice(0, 10).map((row, index) => {
      const cells = row.querySelectorAll("td");
      return {
        rank: index + 1,
        wallet: cells[1]?.textContent?.trim() || "",
        quantity: cells[2]?.textContent?.trim() || "",
        percentage: cells[3]?.textContent?.trim() || "",
        value: cells[4]?.textContent?.trim() || "",
      };
    })
  );

  await browser.close();
  fs.writeFileSync("public/holders.json", JSON.stringify(holders, null, 2));
  console.log(" Holders scraped and saved.");
}

scrapeOcicatHolders();
