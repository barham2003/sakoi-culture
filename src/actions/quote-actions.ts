"use server"

import { db } from "@/db"
import { quotes } from "@/db/schema"
import { count, sql } from "drizzle-orm"
import { revalidateTag, unstable_cache as us } from "next/cache"


import * as z from "zod"

function getRandom(min: number, max: number): number {
    return Math.floor(Math.random() * max);
}

interface Props {
    message: string
    status: string
    errors?: {
        quote?: string[],
        source?: string[]
    }

}

const getUnstableQuote = us(() => db.select()
    .from(quotes)
    .orderBy(sql`RANDOM()`) // use the SQL RANDOM() function to get a random order
    .limit(1), ["quotes"], { tags: ["quotes"], revalidate: 0.1 })


export async function getRandomQuote() {
    const quote = await getUnstableQuote()
    return quote[0];
}


const quoteSchema = z.object({
    quote: z.string().min(5),
    source: z.string().min(5)
})

export async function addQuote(formState: Props, formData: FormData): Promise<Props> {
    const result = quoteSchema.safeParse({
        quote: formData.get("quote"),
        source: formData.get("source")
    })

    if (!result.success) return { message: "Validation Error", status: "error", errors: result.error.flatten().fieldErrors }

    await db.insert(quotes).values(result.data)
    revalidateTag("quotes")
    return { message: "Done", status: "success" }
}