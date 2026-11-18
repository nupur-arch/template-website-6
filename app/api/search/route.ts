import { NextResponse } from "next/server";
import { searchContent } from "@/services/search";

export async function GET(request: Request) {
  const query = new URL(request.url).searchParams.get("q") ?? "";
  try { return NextResponse.json(await searchContent(query, request.signal)); }
  catch { return NextResponse.json({ error: "Search is unavailable." }, { status: 500 }); }
}
