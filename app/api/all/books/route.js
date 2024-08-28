// api/books
import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const books = await db.book.findMany({
      where: {
        active: true,
      },
      orderBy: {
        title: "asc",
      },
    });

    return NextResponse.json(books, {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=0',
        'CDN-Cache-Control': 'public, s-maxage=0',
        'Vercel-CDN-Cache-Control': 'public, s-maxage=0',
      },
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "เกิดข้อผิดพลาดในการดึงข้อมูลหนังสือ", error },
      { status: 500 }
    );
  }
}