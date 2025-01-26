import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/sessions";

export async function POST(request: NextRequest) {
  try {
    const session = (await cookies()).get("session")?.value;
    const payload = await decrypt(session);
    if (!payload || typeof payload.userId !== "number") {
      throw new Error("Session is not valid or userId is not a string");
    }
    const userId = payload.userId;

    const { part, rating, notes } = await request.json();

    if (
      typeof part !== "number" ||
      typeof rating !== "number" ||
      typeof notes !== "string" ||
      rating < 1 ||
      rating > 5
    ) {
      return NextResponse.json(
        { error: "Invalid input data" },
        { status: 400 }
      );
    }

    await sql`INSERT INTO "Logs" (user_id, part_id, rating, notes) VALUES (${userId}, ${part}, ${rating}, ${notes})`;
    return NextResponse.json("Succesfully added ayam log.", { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Failed to add ayam log" },
      { status: 500 }
    );
  }
}
