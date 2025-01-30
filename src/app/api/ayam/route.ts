import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/sessions";

export async function POST(request: NextRequest) {
  try {
    const session = (await cookies()).get("session")?.value;
    const payload = await decrypt(session);
    if (!payload || typeof payload.userId !== "string") {
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

    return NextResponse.json("Successfully added ayam log.", {
      status: 200,
      headers: { "Cache-Control": "no-store" },
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to add ayam log" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = (await cookies()).get("session")?.value;
    const payload = await decrypt(session);
    if (!payload || typeof payload.userId !== "string") {
      throw new Error("Session is not valid or userId is not a string");
    }
    const userId = payload.userId;

    const searchParams = request.nextUrl.searchParams;
    const page = Number(searchParams.get("page")) || 1;
    const limit = 12;
    const offset = (Number(page) - 1) * limit;

    const result = await sql`
    SELECT 
      l.id,
      l.rating, 
      l.created_at, 
      l.notes,
      a.part AS part_name 
    FROM 
      "Logs" l
    JOIN 
      "Ayam" a ON l.part_id = a.id
    WHERE 
      l.user_id = ${userId}
    ORDER BY 
      l.created_at DESC 
    LIMIT ${limit} OFFSET ${offset}
  `;

    const totalItemsResult =
      await sql`SELECT COUNT(*) FROM "Logs" WHERE user_id = ${userId}`;
    const totalItems = totalItemsResult.rows[0].count;

    const totalPages = Math.ceil(Number(totalItems) / limit);

    return NextResponse.json(
      {
        logs: result.rows,
        totalItems: totalItems,
        totalPages: totalPages,
        currentPage: page,
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch ayam logs" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = (await cookies()).get("session")?.value;
    const payload = await decrypt(session);
    if (!payload || typeof payload.userId !== "string") {
      throw new Error("Session is not valid or userId is not a string");
    }
    const userId = payload.userId;

    const { id } = await request.json();

    if (typeof id !== "number") {
      return NextResponse.json(
        { error: "Invalid input data" },
        { status: 400 }
      );
    }

    await sql`DELETE FROM "Logs" WHERE id = ${id} AND user_id = ${userId}`;
    return NextResponse.json("Succesfully deleted ayam log.", { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete ayam log" },
      { status: 500 }
    );
  }
}
