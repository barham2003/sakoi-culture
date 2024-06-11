import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function GET() {
    revalidateTag("quotes")
    revalidatePath("/quote/search-quotes")
    return NextResponse.json({ message: "revalidated" })
}