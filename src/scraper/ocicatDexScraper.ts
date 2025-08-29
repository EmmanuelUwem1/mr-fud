import fs from "fs";

interface Holder {
  rank: number;
  wallet: string;
  quantity: string;
  percentage: string;
  value: string;
}

export async function scrapeOcicatHolders(): Promise<Holder[]> {
  const puppeteer = (await import("puppeteer-extra")).default;
  const StealthPlugin = (await import("puppeteer-extra-plugin-stealth"))
    .default;

  puppeteer.use(StealthPlugin());

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/114 Safari/537.36"
  );

  const url =
    "https://bscscan.com/token/0xE53D384Cf33294C1882227ae4f90D64cF2a5dB70#balances";

  try {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });

    await page.screenshot({ path: "holders_debug.png" });
    const html = await page.content();
    fs.writeFileSync("holders_debug.html", html);

    await page.waitForSelector("#maintable tbody tr", {
      timeout: 30000,
      visible: true,
    });

    const holders: Holder[] = await page.$$eval("table tbody tr", (rows) =>
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
    return holders;
  } catch (error) {
    console.error("Scraper failed:", error);
    await browser.close();
    throw error;
  }
}
