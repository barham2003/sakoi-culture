import { getRandomQuote } from "@/actions";
import { db } from "@/db";
import { quotes } from "@/db/schema";
import { sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const quote = await db.select()
        .from(quotes)
        .orderBy(sql`RANDOM()`)
        .limit(1)
    return NextResponse.json(quote)
}
