import { responseOptions } from "@/lib/utils";
import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function GET() {
    revalidateTag("quotes")
    revalidatePath("/quote/list")
    return NextResponse.json({ message: "revalidated" }, responseOptions)
}