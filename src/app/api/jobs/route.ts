import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const stage = searchParams.get("stage");
  // TODO: query DB
  return NextResponse.json({ jobs: [], stage });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  // TODO: create job in DB
  return NextResponse.json({ id: "new-job-id", ...body }, { status: 201 });
}
