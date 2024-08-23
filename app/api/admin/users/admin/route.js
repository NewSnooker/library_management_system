import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const userProfiles = await db.userProfile.findMany({
      where: {
        user: {
          role: "ADMIN", 
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!userProfiles) {
      return NextResponse.json(
        {
          data: null,
          message: "ไม่พบผู้ใช้งาน",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(userProfiles);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้งาน", error },
      { status: 500 }
    );
  }
}
