"use server";

import { db } from "@/db";
import { Quote, quotes } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import { revalidateTag, unstable_cache as us } from "next/cache";
import { createInsertSchema } from "drizzle-zod";
import * as z from "zod";
import { catchDBError } from "@/lib/utils";
import { uploadFileAndGetUrl } from "./file-actions";
interface Props {
  message: string;
  status: string;
  errors?: {
    quote?: string[];
    source?: string[];
  };
  id?: number;
}

interface getQuoteProps {
  message: string;
  status: string;
  quote?: Quote;
}

// *  Get Random Quote
const getUnstableQuote = us(
  () =>
    db
      .select()
      .from(quotes)
      .orderBy(sql`RANDOM()`)
      .where(eq(quotes.approved, true))
      .limit(1),
  ["quotes"],
  { tags: ["quotes"], revalidate: 0.1 },
);

export async function getRandomQuote(formState: Props): Promise<getQuoteProps> {
  const quote = await getUnstableQuote();
  if (!quote || quote.length === 0)
    return { message: "هیچ نەدۆزراوە", status: "error" };
  return { quote: quote[0], message: "سەرکەوتوو بوو", status: "success" };
}

// * Get one quote
export async function getOneQuote(id: number) {
  const quote = (await db.select().from(quotes).where(eq(quotes.id, id))).at(0);

  return quote;
}

// * Get All quotes
const getUnstableAllQuote = us(
  () => db.select().from(quotes).where(eq(quotes.approved, true)),
  ["quotes"],
  { tags: ["quotes"] },
);

export async function getAllQuotes(): Promise<Quote[]> {
  const quotes = getUnstableAllQuote();
  return quotes;
}

// ? Get All Quote IDs
const getUnstableAllQuoteID = us(
  () => db.select({ id: quotes.id }).from(quotes),
  ["quotes"],
  { tags: ["quotes"] },
);

export async function getAllQuotesID(): Promise<{ id: number }[]> {
  const quotes = getUnstableAllQuoteID();
  return quotes;
}

// *  Insert Quote

const quoteSchema = createInsertSchema(quotes, {
  quote: z
    .string()
    .min(5, { message: 'پێویستە "وتە" بەلایەنی کەمەوە لە پێنج پیت پێكهاتبێت' }),
});

export async function addQuote(
  formState: Props,
  formData: FormData,
): Promise<Props> {


  const voiceFile = formData.get("voice") as File;
  let voiceUrl;

  if (voiceFile) voiceUrl = await uploadFileAndGetUrl(voiceFile);

  const result = quoteSchema.safeParse({
    quote: formData.get("quote"),
    source: formData.get("source"),
    explaination: formData.get("explaination"),
    voice: voiceUrl,
  });

  if (!result.success)
    return {
      message: "فۆڕمەکە بە تەواوی پڕبکەوە",
      status: "error",
      errors: result.error.flatten().fieldErrors,
    };

  const returnedID = await db
    .insert(quotes)
    .values(result.data)
    .returning({ id: quotes.id })
    .catch(catchDBError);

  if (typeof returnedID === "string")
    return { message: " دووبارەیە", status: "error" };
  return { message: "سەرکەوتوو بوو", status: "success", id: returnedID[0].id };
}
