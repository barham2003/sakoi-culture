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
    title?: string[];
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
  () => db.select().from(poetries).where(eq(poetries.approved, true)),
  ["poetry"],
  { tags: ["poetry"] },
);

export async function getPoetries() {
  const poetries = await getUnstablePoetries();
  console.log(poetries);
  return poetries;
}
export async function getPoetryIds() {
  const poetryIds = await db.select({ id: poetries.id }).from(poetries);
  return poetryIds;
}

export async function getOnePoetry(id: number) {
  const poetry = (
    await db.select().from(poetries).where(eq(poetries.id, id))
  ).at(0);
  return poetry;
}

const poetrySchema = createInsertSchema(poetries, {
  poet: z
    .string()
    .min(3, { message: "ناوی شاعیر دەبێت بە لایەنی کەمەوە سێ پیت بێت" }),
  text: z
    .string()
    .min(10, { message: "شیعرەکە دەبێت لە چەند وشەیەكی زیاتر پێکهاتبێت" }),
  title: z.string().min(3, {
    message: "ناوی شیعرەکە دەبێت بە لایەنی کەمەوە لە سێ پیت زیاتر بێت",
  }),
});

export async function uploadFileAndGetUrl(file: File) {
  const fileForm = new FormData();
  fileForm.append("file", file);

  const fileUploadResponse = await fetch("https://api.filedoge.com/upload", {
    method: "POST",
    body: fileForm,
  });

  const fileResponseJson = await fileUploadResponse.json();

  const fileToken = fileResponseJson.token;

  const fileUrl = `http://api.filedoge.com/download/${fileToken}`;

  return fileUrl;
}

export async function addPoetry(
  formState: Props,
  formData: FormData,
): Promise<Props> {
  const voiceFile = formData.get("voice") as File;
  let voiceUrl;

  if (voiceFile) voiceUrl = await uploadFileAndGetUrl(voiceFile);

  const result = poetrySchema.safeParse({
    text: formData.get("text"),
    poet: formData.get("poet"),
    title: formData.get("title"),
    voice: voiceUrl,
  });

  if (!result.success)
    return {
      errors: result.error.flatten().fieldErrors,
      message: "فۆڕمەکە بە تەواو پڕ بکەوە",
      status: "error",
    };

  const poetryID = await db
    .insert(poetries)
    .values(result.data)
    .returning({ id: poetries.id });
  return {
    message: "بەسەرکەوتووی نێردرا",
    status: "success",
    id: poetryID[0].id,
  };
}
