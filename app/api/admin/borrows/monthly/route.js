import db from "@/lib/db";
import { NextResponse } from "next/server";

// api/admin/borrows/monthly
export async function GET(request) {
  try {
    // Get the year from query params
    const url = new URL(request.url);
    const year = parseInt(url.searchParams.get("year")) || new Date().getFullYear();

    // Fetch borrow records for the selected year
    const borrows = await db.borrow.findMany({
      where: {
        borrowDate: {
          gte: new Date(`${year}-01-01T00:00:00.000Z`),
          lte: new Date(`${year}-12-31T23:59:59.999Z`),
        },
      },
      orderBy: {
        borrowDate: "desc",
      },
    });

    // console.log("Fetched borrows:", borrows); // Add this to see fetched data

    // Process and aggregate data by month
    const monthlyData = Array.from({ length: 12 }, (_, i) => ({
      month: new Date(0, i).toLocaleString('default', { month: 'short' }),
      count: 0,
    }));

    borrows.forEach(borrow => {
      const monthIndex = new Date(borrow.borrowDate).getMonth();
      monthlyData[monthIndex].count += 1;
    });

    // console.log("Monthly data:", monthlyData); // Add this to see processed data

    return NextResponse.json(monthlyData);
  } catch (error) {
    console.log("Error fetching data:", error); // Add this for error logging
    return NextResponse.json(
      { message: "เกิดข้อผิดพลาดในการดึงข้อมูลการยืมรายเดือน", error },
      { status: 500 }
    );
  }
}
