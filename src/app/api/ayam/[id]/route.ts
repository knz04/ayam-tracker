import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/sessions";

export async function DELETE({ params }: { params: { id: string } }) {
  try {
    const session = (await cookies()).get("session")?.value;
    const payload = await decrypt(session);

    if (!payload || typeof payload.userId !== "number") {
      throw new Error("Session is not valid or userId is not a string");
    }

    const userId = payload.userId;
    const id = parseInt(params.id, 10); // Parse the dynamic `id` parameter from the URL

    if (isNaN(id)) {
      return NextResponse.json(
        { error: "Invalid ID parameter" },
        { status: 400 }
      );
    }

    // Perform the delete operation
    await sql`DELETE FROM "Logs" WHERE id = ${id} AND user_id = ${userId}`;
    return NextResponse.json("Successfully deleted ayam log.", { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete ayam log" },
      { status: 500 }
    );
  }
}
