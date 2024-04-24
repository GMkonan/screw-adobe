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

  await new Promise((res) => setTimeout(res, 1000));

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
          return { message: `error: ${err}` };
        });
      return { message: `User resubscribed` };
    }

    return { message: `User already subscribed` };
  }

  await insertSubscribedUser(userEmail).catch((err) => {
    console.log("error", err);
    return { message: `error: ${err}` };
  });

  return {
    message: "Subscribed!",
  };
}
