"use server";

import { db } from "@/db";
import { Poetry, poetries } from "@/db/schema";
import { eq, not, sql } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { revalidateTag, unstable_cache as us } from "next/cache";
import * as z from "zod";

interface Props {
    message: string;
    status: string;
    errors?: {
        poet?: string[];
        text?: string[];
        title?: string[]
    };
    id?: number;
    poetry?: Poetry;
}

// *  Get Random Poetry
const getUnstableRandomPoetry = us(
    () =>
        db
            .select()
            .from(poetries)
            .orderBy(sql`RANDOM()`)
            .where(eq(poetries.approved, true))
            .limit(1),
    ["poetry"],
    { tags: ["poetry"], revalidate: 0.1 },
);

export async function getRandomPoetry(formState: Props): Promise<Props> {
    const poetry = await getUnstableRandomPoetry();

    if (poetry.length === 0)
        return { message: "هیچ نەدۆزرایەوە", status: "error" };
    return { poetry: poetry.at(0), message: "", status: "success" };
}

//! ========================================= Another Part =========================================

const getUnstablePoetries = us(
    () =>
        db
            .select()
            .from(poetries)
            .where(eq(poetries.approved, true)),
    ["poetry"],
    { tags: ["poetry"] },
);

export async function getPoetries() {
    const poetries = await getUnstablePoetries()
    return poetries
}


const poetrySchema = createInsertSchema(poetries, {
    poet: z.string().min(3, { message: "ناوی شاعیر دەبێت بە لایەنی کەمەوە سێ پیت بێت" }),
    text: z.string().min(10, { message: "شیعرەکە دەبێت لە چەند وشەیەكی زیاتر پێکهاتبێت" }),
    title: z.string().min(3, { message: "ناوی شیعرەکە دەبێت بە لایەنی کەمەوە لە سێ پیت زیاتر بێت" })
}
)


export async function addPoetry(formState: Props, formData: FormData): Promise<Props> {
    const result = poetrySchema.safeParse({
        text: formData.get("text"),
        poet: formData.get("poet"),
        title: formData.get("title")
    })

    if (!result.success) return { errors: result.error.flatten().fieldErrors, message: "فۆڕمەکە بە تەواو پڕ بکەوە", status: "error" }

    const poetryID = await db.insert(poetries).values(result.data).returning({ id: poetries.id })
    return { message: "بەسەرکەوتووی نێردرا", status: "success", id: poetryID[0].id }
}