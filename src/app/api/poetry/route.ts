import { db } from "@/db";
import { poetries } from "@/db/schema";
import { sql } from "drizzle-orm";
import { unstable_cache as us } from "next/cache";
import { NextResponse } from "next/server";


const getUnstableRandomPoetry = us(
    () =>
        db
            .select()
            .from(poetries)
            .orderBy(sql`RANDOM()`)
            .limit(1),
    ["poetry"],
    { tags: ["poetry"], revalidate: 0.1 },
);


export async function GET(request: Request) {
    const poetry = await getUnstableRandomPoetry()
    return NextResponse.json(poetry)
}
