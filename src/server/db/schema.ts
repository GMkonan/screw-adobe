// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  int,
  sqliteTableCreator,
  integer,
  text,
} from "drizzle-orm/sqlite-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = sqliteTableCreator((name) => `screw-adobe_${name}`);

export const onSale = createTable("sale", {
  id: int("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  isOnSale: integer("is_on_sale", { mode: "boolean" }),
});

export const notifications = createTable("notifications", {
  id: int("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  email: text("name", { length: 256 }).unique(),
  subscribed: integer("subscribed", { mode: "boolean" }),
  createdAt: int("created_at", { mode: "timestamp" })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: int("updatedAt", { mode: "timestamp" }),
});
