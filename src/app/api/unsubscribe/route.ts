import { db } from "@/server/db";
import { notifications } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const param = searchParams.get("email")!;
  console.log(param);

  await db
    .update(notifications)
    .set({ subscribed: false })
    .where(eq(notifications.email, param))
    .catch((err) => {
      console.log("error", err);
      return { message: `Error unsubscribing` };
    });

  return NextResponse.json(
    { message: "You got unsubscribed!" },
    { status: 200 },
  );
}
