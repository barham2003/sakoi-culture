"use server"

import { db } from "@/db"
import { Quote, quotes } from "@/db/schema"
import { sql } from "drizzle-orm"
import { revalidateTag, unstable_cache as us } from "next/cache"
import { createInsertSchema, } from 'drizzle-zod';
import * as z from "zod"
interface Props {
    message: string
    status: string
    errors?: {
        quote?: string[],
        source?: string[]
    }
    id?: number
}


interface getQuoteProps {
    message: string
    status: string
    quote?: Quote
}

// *  Get Random Quote
const getUnstableQuote = us(() => db.select()
    .from(quotes)
    .orderBy(sql`RANDOM()`)
    .limit(1), ["quotes"], { tags: ["quotes"], revalidate: 0.1 })


export async function getRandomQuote(formState: Props): Promise<getQuoteProps> {
    const quote = await getUnstableQuote()
    if (!quote || quote.length === 0) return { message: "هیچ نەدۆزراوە", status: "error" }
    return { quote: quote[0], message: "سەرکەوتوو بوو", status: "success" };
}

// *  Insert Quote

const quoteSchema = createInsertSchema(quotes, {
    quote: z.string().min(5, { message: 'پێویستە "وتە" بەلایەنی کەمەوە لە پێنج پیت پێكهاتبێت' })
})

// * Get All quotes
const getUnstableAllQuote = us(() => db.select()
    .from(quotes), ["quotes"], { tags: ["quotes"], revalidate: 60 * 60 * 24 })

export async function getAllQuotes(): Promise<Quote[]> {
    const quotes = getUnstableAllQuote()
    return quotes
}



export async function addQuote(formState: Props, formData: FormData): Promise<Props> {
    const result = quoteSchema.safeParse({
        quote: formData.get("quote"),
        source: formData.get("source"),
        explaination: formData.get("explaination")
    })

    if (!result.success) return { message: "فۆڕمەکە بە تەواوی پڕبکەوە", status: "error", errors: result.error.flatten().fieldErrors }

    await db.insert(quotes).values(result.data)
    revalidateTag("quotes")
    return { message: "سەرکەوتوو بوو", status: "success" }
}


