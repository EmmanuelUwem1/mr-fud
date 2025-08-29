import { scrapeOcicatHolders } from "@/scraper/ocicatDexScraper";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const holders = await scrapeOcicatHolders();
    return NextResponse.json({ holders }, { status: 200 });
  } catch (error) {
    console.error("Holders scraper error:", error);
    return NextResponse.json(
      { error: "Failed to fetch Ocicat holders data" },
      { status: 500 }
    );
  }
}
