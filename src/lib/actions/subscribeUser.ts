"use server";
import { db } from "@/server/db";
import { notifications } from "@/server/db/schema";
import { eq } from "drizzle-orm";

const insertSubscribedUser = async (email: string) => {
  await db
    .insert(notifications)
    .values({
      email: email,
      subscribed: true,
    })
    .catch((err) => {
      console.log("error", err);
    });
};

export async function subscribeUser(_: unknown, queryData: FormData) {
  // there has to be a better way that is not just casting to string
  const userEmail = (queryData.get("email") as string).trim();

  const user = await db.query.notifications.findFirst({
    where: (users, { eq }) => eq(users.email, userEmail),
  });

  if (user) {
    // update user
    if (!user.subscribed) {
      await db
        .update(notifications)
        .set({ subscribed: true })
        .where(eq(notifications.email, userEmail))
        .catch((err) => {
          console.log("error", err);
          return { message: `Error updating user`, error: true };
        });
      return { message: `User resubscribed`, error: false };
    }

    return { message: `User already subscribed`, error: true };
  }

  await insertSubscribedUser(userEmail).catch((err) => {
    console.log("error", err);
    return { message: `Error inserting user`, error: true };
  });

  return {
    message: "Subscribed!",
    error: false,
  };
}
