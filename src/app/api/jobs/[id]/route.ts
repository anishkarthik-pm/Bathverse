import { NextRequest, NextResponse } from "next/server";

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  // TODO: fetch job from DB
  return NextResponse.json({ id: params.id });
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const body = await req.json();
  // TODO: update job
  return NextResponse.json({ id: params.id, ...body });
}
