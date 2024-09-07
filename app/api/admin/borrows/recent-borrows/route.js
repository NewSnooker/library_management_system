import db from "@/lib/db";
import { NextResponse } from "next/server";
export const fetchCache = "force-no-store";
export const revalidate = 0;
// api/admin/borrows/recent-borrows
export async function GET(request) {
  try {
    const borrows = await db.borrow.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        borrower: true, // Assuming you want to include borrower details
      },
      take: 5, // Limit to 5 results
    });
    return NextResponse.json(borrows);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "เกิดข้อผิดพลาดในการดึงข้อมูลการยืม", error },
      { status: 500 }
    );
  }
}
