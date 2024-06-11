export const dynamic = "force-dynamic"

import { db } from "@/db";
import { poetries } from "@/db/schema";
import { responseOptions } from "@/lib/utils";
import { eq, sql } from "drizzle-orm";
import { unstable_cache as us } from "next/cache";
import { NextResponse } from "next/server";


// * Get Random Poetry
const getUnstableRandomPoetry = us(
    () =>
        db
            .select()
            .from(poetries)
            .orderBy(sql`RANDOM()`)
            .limit(1)
            .where(eq(poetries.approved, true)),
    ["poetry"],
    { tags: ["poetry"], revalidate: 0.1 },
);


export async function GET(request: Request) {
    const poetry = await getUnstableRandomPoetry()
    return NextResponse.json(poetry[0], responseOptions)
}
