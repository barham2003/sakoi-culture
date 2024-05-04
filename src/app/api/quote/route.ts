import { getRandomQuote } from "@/actions";
import { db } from "@/db";
import { quotes } from "@/db/schema";
import { sql } from "drizzle-orm";
import { NextResponse } from "next/server";
import { unstable_cache as us } from "next/cache";


// *  Get Random Quote
const getUnstableQuote = us(() => db.select()
    .from(quotes)
    .orderBy(sql`RANDOM()`)
    .limit(1), ["quotes"], { tags: ["quotes"], revalidate: 0.1 })


export async function GET(request: Request) {
    const quote = await getUnstableQuote()
    return NextResponse.json(quote)
}
