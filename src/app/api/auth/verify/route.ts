import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { phone, otp } = await req.json();
  if (!phone || !otp) {
    return NextResponse.json({ error: "Phone and OTP required" }, { status: 400 });
  }
  // TODO: verify OTP, issue JWT
  const mockToken = `mock-jwt-${phone}-${Date.now()}`;
  return NextResponse.json({ token: mockToken, isNewUser: true });
}
