import { InferInsertModel, InferSelectModel, relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";


export const quotes = sqliteTable("quotes", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  quote: text("text").notNull(),
  source: text("text")
})





export type Quote = InferSelectModel<typeof quotes>;