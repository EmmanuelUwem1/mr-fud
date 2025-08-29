import { NextResponse } from "next/server";
import fs from "fs";

export async function GET() {
  try {
    const raw = fs.readFileSync("public/holders.json", "utf-8");
    const holders = JSON.parse(raw);
    return NextResponse.json({ holders }, { status: 200 });
  } catch (error) {
    console.error("Failed to load holders:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
