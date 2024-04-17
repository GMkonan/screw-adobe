// app/api/route.js 👈🏽

import { NextResponse } from "next/server";
import { load } from "cheerio";

export async function GET() {
  // fetch data from affinity website
  const res = await fetch("https://affinity.serif.com/en-us/affinity-pricing/");
  const html = await res.text();
  const $ = load(html);

  // maybe we should check classes as well to be more precise
  console.log("Is there a sale?", $("s").length);

  // s is a "sale" tag
  return $("s").length >= 1
    ? NextResponse.json({ message: "Found some cool sale!" }, { status: 200 })
    : NextResponse.json({ message: "No sale found" }, { status: 200 });
}
