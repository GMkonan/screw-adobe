import { NextResponse } from "next/server";
import { load } from "cheerio";
import { db } from "@/server/db";
import { onSale } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { env } from "@/env";
import { Resend } from "resend";
import SubscribeEmailTemplate from "@/components/emails/SubscribeEmailTemplate";
import { render } from "@react-email/render";
import { verifySignatureAppRouter } from "@upstash/qstash/dist/nextjs";

const resend = new Resend(env.RESEND_API_KEY);

const sendEmail = async (userEmail: string) => {
  const templateToHtml = render(
    SubscribeEmailTemplate({ userEmail: userEmail }) as React.ReactElement,
  );

  await resend.emails.send({
    from: "test <noreply@gmkonan.dev>",
    to: userEmail,
    subject: "Affinity suite is on sale!",
    html: templateToHtml,
    // not sure why but passing directly react property doesnt work, so it needs to render and go as html
  });
};

const sendNotification = async () => {
  const users = await db.query.notifications.findMany({
    where: (users, { eq }) => eq(users.subscribed, true),
  });

  // this way the emails will still be sent even if one goes wrong
  // probably the best I can do without implementing a queue system
  const userPromises = [...new Set(users)].map((user) => {
    return sendEmail(user.email!);
  });

  return await Promise.all(userPromises);
};

async function handler() {
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

    // only send notifications if the sale is on
    const data = await sendNotification();

    console.log(data);
  } else if (!sale) {
    isOnSale?.isOnSale === true &&
      (await db
        .update(onSale)
        .set({ isOnSale: false })
        .where(eq(onSale.id, 1)));
  }

  return sale
    ? NextResponse.json(
        { message: "Sale ON!", sale: Boolean(sale) },
        { status: 200 },
      )
    : NextResponse.json(
        { message: "No sale found", sale: Boolean(sale) },
        { status: 200 },
      );
}

export const GET = verifySignatureAppRouter(handler);
