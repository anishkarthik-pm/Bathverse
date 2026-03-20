import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { phone } = await req.json();
  if (!phone || phone.length < 10) {
    return NextResponse.json({ error: "Invalid phone number" }, { status: 400 });
  }
  // TODO: send OTP via SMS provider (e.g. Twilio, MSG91)
  return NextResponse.json({ success: true, message: "OTP sent" });
}
