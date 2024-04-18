// app/api/route.js 👈🏽

import { NextResponse } from "next/server";
import { load } from "cheerio";
import { db } from "@/server/db";
import { onSale } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  // fetch data from affinity website
  const res = await fetch("https://affinity.serif.com/en-us/affinity-pricing/");
  const html = await res.text();
  const $ = load(html);

  // s is a "sale" tag
  // maybe we should check classes as well to be more precise
  const sale = $("s").length >= 1;

  const isOnSale = await db.query.onSale.findFirst();

  // maybe passing sale to isOnSale directly but having a way to not update if is the same value is better
  if (sale) {
    // update should probably not rely on hardcoded id 1
    isOnSale?.isOnSale === false &&
      (await db.update(onSale).set({ isOnSale: true }).where(eq(onSale.id, 1)));
    console.log("update to true");
  } else if (!sale) {
    isOnSale?.isOnSale === true &&
      (await db
        .update(onSale)
        .set({ isOnSale: false })
        .where(eq(onSale.id, 1)));
    console.log("update to false");
  }

  return sale
    ? NextResponse.json(
        { message: "Found some cool sale!", sale: Boolean(sale) },
        { status: 200 },
      )
    : NextResponse.json(
        { message: "No sale found", sale: Boolean(sale) },
        { status: 200 },
      );
}
