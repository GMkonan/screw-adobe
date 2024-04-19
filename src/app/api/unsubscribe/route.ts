import { NextResponse } from "next/server";

export async function GET() {
  // fetch db for user (in this case it should be POST)
  return NextResponse.json(
    { message: "Found some cool sale!" },
    { status: 200 },
  );
}
