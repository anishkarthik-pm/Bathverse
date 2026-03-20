import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");
  // TODO: query DB
  return NextResponse.json({ leads: [], status });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  // TODO: create lead in DB
  return NextResponse.json({ id: "new-lead-id", ...body }, { status: 201 });
}
