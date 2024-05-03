import { InferInsertModel, InferSelectModel, relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";


export const quotes = sqliteTable("quotes", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  quote: text("quote").notNull(),
  source: text("source"),
  explaination: text("explaination").notNull()
})


export const poetries = sqliteTable("poetries", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  text: text('text').notNull(),
  poet: text("poet").notNull(),
})


export type Quote = InferSelectModel<typeof quotes>;
export type Poetry = InferInsertModel<typeof poetries>