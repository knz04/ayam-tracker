import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/sessions";

export async function GET() {
  try {
    const session = (await cookies()).get("session")?.value;
    const payload = await decrypt(session);
    if (!payload || typeof payload.userId !== "string") {
      throw new Error("Session is not valid or userId is not a string");
    }
    const userId = payload.userId;
    const getUser = await sql` SELECT * FROM "Users" WHERE id = ${userId}`;
    if (getUser.rows.length === 0) {
      throw new Error("User not found");
    }
    const user = getUser.rows[0];
    return NextResponse.json({ user });
  } catch {
    return NextResponse.json({ error: "Failed to get user" }, { status: 500 });
  }
}
