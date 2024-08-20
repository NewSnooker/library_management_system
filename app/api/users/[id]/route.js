import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request, { params: { id } }) {
  try {
    const user = await db.user.findUnique({
      where: {
        id,
      },
      select: {
        createdAt: true,
        id: true,
        email: true,
        username: true,
        userProfile: true,
      },
    });
    // console.log(user);
    return NextResponse.json(user);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้งาน", error },
      { status: 500 }
    );
  }
}
