import { drizzle } from "drizzle-orm/libsql";

import { env } from "@/env";
import * as schema from "./schema";

import { createClient } from "@libsql/client";

const turso = createClient({
  url: env.TURSO_DATABASE_URL,
  authToken: env.TURSO_AUTH_TOKEN,
});

export const db = drizzle(turso, { schema });
