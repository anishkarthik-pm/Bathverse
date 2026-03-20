import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const jobId = searchParams.get("jobId");
  // TODO: query DB
  return NextResponse.json({ reports: [], jobId });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  // TODO: create QC report
  return NextResponse.json({ id: "new-qc-id", ...body }, { status: 201 });
}
