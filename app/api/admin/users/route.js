import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const users = await db.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    if (!users) {
      return NextResponse.json(
        {
          data: null,
          message: "ไม่พบผู้ใช้งาน",
        },
        { status: 404 }
      );
    }
    console.log(users);

    return NextResponse.json(users);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้งาน", error },
      { status: 500 }
    );
  }
}
