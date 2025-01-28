import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/sessions";

export async function GET() {
  try {
    const session = (await cookies()).get("session")?.value;
    const payload = await decrypt(session);
    if (!payload || typeof payload.userId !== "number") {
      throw new Error("Session is not valid or userId is not a string");
    }
    const userId = payload.userId;

    const weekResult = await sql`
        SELECT COUNT(*) 
        FROM "Logs" 
        WHERE user_id = ${userId} 
            AND created_at >= (CURRENT_DATE - INTERVAL '7 days')
            AND created_at < CURRENT_DATE + INTERVAL '1 day';
        `;

    const monthResult = await sql`
        SELECT COUNT(*)
        FROM "Logs"
        WHERE user_id = ${userId}
            AND DATE_TRUNC('month', created_at) = DATE_TRUNC('month', CURRENT_DATE);
    `;

    const yearResult = await sql`
        SELECT COUNT(*)
        FROM "Logs"
        WHERE user_id = ${userId}
            AND DATE_TRUNC('year', created_at) = DATE_TRUNC('year', CURRENT_DATE);
    `;

    const lastMonth = await sql`
        SELECT COUNT(*) 
        FROM "Logs" 
        WHERE user_id = ${userId} 
            AND created_at >= DATE_TRUNC('month', CURRENT_DATE) - INTERVAL '1 month'
            AND created_at < DATE_TRUNC('month', CURRENT_DATE);
    `;

    const lastYear = await sql`
        SELECT COUNT(*) 
        FROM "Logs" 
        WHERE user_id = ${userId} 
            AND created_at >= DATE_TRUNC('year', CURRENT_DATE) - INTERVAL '1 year'
            AND created_at < DATE_TRUNC('year', CURRENT_DATE);
    `;

    const lastMonthCount = lastMonth.rows[0]?.count;
    const lastYearCount = lastYear.rows[0]?.count;

    const weekCount = weekResult.rows[0]?.count;
    const monthCount = monthResult.rows[0]?.count;
    const yearCount = yearResult.rows[0]?.count;
    const compareMonthCount = Math.abs(monthCount - lastMonthCount);
    const compareYearCount = Math.abs(yearCount - lastYearCount);
    const monthUp = monthCount > lastMonthCount ? true : false;
    const yearUp = yearCount > lastYearCount ? true : false;

    return NextResponse.json(
      {
        weekCount,
        monthCount,
        yearCount,
        compareMonthCount,
        compareYearCount,
        monthUp,
        yearUp,
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
