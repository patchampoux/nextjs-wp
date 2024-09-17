import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

async function handler(req) {
  revalidatePath("/", "layout");

  return NextResponse.json({});
}

export { handler as POST, handler as GET };