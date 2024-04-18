// app/api/route.js 👈🏽

import { NextResponse } from "next/server";
import { load } from "cheerio";
import { db } from "@/server/db";
import { onSale } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { env } from "@/env";
import { Resend } from "resend";
import { SubscribeEmailTemplate } from "@/components/SubscribeEmailTemplate";
import { renderAsync } from "@react-email/render";

const resend = new Resend(env.RESEND_API_KEY);

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

  const templateToHtml = await renderAsync(
    SubscribeEmailTemplate({ firstName: "John" }) as React.ReactElement,
  );

  const data = await resend.emails.send({
    from: "noreply@gmkonan.dev",
    to: ["guilhemontdev@gmail.com"],
    subject: "Affinity suite is on sale!",
    html: templateToHtml,
    // not sure why but passing directly react property doesnt work, so it needs to render and go as html
  });

  console.log(data);

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
