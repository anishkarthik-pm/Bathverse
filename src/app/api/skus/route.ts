import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const style = searchParams.get("style");
  // TODO: query DB
  return NextResponse.json({ skus: [], category, style });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  // TODO: create SKU
  return NextResponse.json({ id: "new-sku-id", ...body }, { status: 201 });
}
