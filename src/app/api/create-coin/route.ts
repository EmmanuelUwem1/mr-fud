import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.formData();
  const token = body.get("cf-turnstile-response");

  const formData = new URLSearchParams();
  formData.append("secret", process.env.TURNSTILE_SECRET_KEY!);
  formData.append("response", token as string);

  const res = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      body: formData,
    }
  );

  const result = await res.json();
  if (!result.success) {
    return NextResponse.json({ error: "CAPTCHA failed" }, { status: 400 });
  }

  // success — continue flow
  return NextResponse.json({ message: "Verified!" });
}
