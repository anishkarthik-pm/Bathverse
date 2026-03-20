import { NextRequest, NextResponse } from "next/server";

export async function GET(_req: NextRequest) {
  // TODO: query DB
  return NextResponse.json({ vendors: [] });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  // TODO: create vendor
  return NextResponse.json({ id: "new-vendor-id", ...body }, { status: 201 });
}
