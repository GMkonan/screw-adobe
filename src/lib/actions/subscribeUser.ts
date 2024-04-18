"use server";
import { db } from "@/server/db";
import { notifications } from "@/server/db/schema";

export async function subscribeUser(_: unknown, queryData: FormData) {
  // there has to be a better way that is not just casting to string
  const userEmail = queryData.get("email") as string;
  await db
    .insert(notifications)
    .values({
      email: userEmail,
      subscribed: true,
    })
    .catch((err) => {
      console.log("error", err);
    });
  // handle error
  return {
    message: "Subscribed!",
  };
}
