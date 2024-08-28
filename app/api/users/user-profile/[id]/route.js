import db from "@/lib/db";
import { NextResponse } from "next/server";
export const fetchCache = "force-no-store";
export const revalidate = 0;

export async function GET(request, { params: { id } }) {
  try {
    const userProfile = await db.userProfile.findUnique({
      where: {
        userId: id,
      },
      include: {
        activities: true,
      },
    });
    if (!userProfile) {
      return NextResponse.json(
        {
          data: null,
          message: "ไม่พบโปรไฟล์ผู้ใช้งาน",
        },
        { status: 409 }
      );
    }

    return NextResponse.json(userProfile, {
      status: 200,
      headers: {
        "Cache-Control":
          "no-store, no-cache, must-revalidate, proxy-revalidate",
        "CDN-Cache-Control": "no-store",
        "Vercel-CDN-Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "เกิดข้อผิดพลาดในการดึงข้อมูลโปรไฟล์ผู้ใช้งาน", error },
      { status: 500 }
    );
  }
}
export async function PUT(request, { params: { id } }) {
  try {
    const {
      username,
      emailAddress,
      prefix,
      fullName,
      codeNumber,
      phoneNumber,
      educationLevel,
      educationYear,
      description = "",
      profileImage = "",
    } = await request.json();

    const userProfile = await db.userProfile.findUnique({
      where: {
        userId: id,
      },
    });
    if (!userProfile) {
      return NextResponse.json(
        {
          data: null,
          message: "ไม่พบโปรไฟล์ผู้ใช้งาน",
        },
        { status: 409 }
      );
    }
    const updatedUserProfile = await db.userProfile.update({
      where: {
        userId: id,
      },
      data: {
        username,
        emailAddress,
        prefix,
        fullName,
        codeNumber,
        phoneNumber,
        educationLevel,
        educationYear,
        description,
        profileImage,
      },
    });
    const updateUser = await db.user.update({
      where: {
        id: id,
      },
      data: {
        username,
        email: emailAddress,
      },
    });
    console.log(updateUser);
    return NextResponse.json(updatedUserProfile);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "เกิดข้อผิดพลาดในการอัพเดทโปรไฟลผู้ใช้งาน", error },
      { status: 500 }
    );
  }
}
