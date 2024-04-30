import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import "dotenv/config";
import * as schema from "./schema";

export const connection = createClient({
  url: process.env.DB_URL || "",
  authToken: process.env.DB_TOKEN || "",
});

export const db = drizzle(connection, { schema });
