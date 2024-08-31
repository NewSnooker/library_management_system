import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request, { params: { id } }) {
  try {
    const userProfile = await db.userProfile.findUnique({
      where: {
        userId: id,
      },
      // select: {
      //   createdAt: true,
      //   email: true,
      //   id: true,
      //   username: true,
      //   role: true,
      //   userProfile: true,
      // },
    });
    return NextResponse.json(userProfile);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้", error },
      { status: 500 }
    );
  }
}
