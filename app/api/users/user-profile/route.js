import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function PUT(request) {
  try {
    //แบบไม่ Destructuring ตัวแปร
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
      userId,
    } = await request.json();

    const existingUser = await db.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!existingUser) {
      return NextResponse.json(
        {
          data: null,
          message: "ไม่พบผู้ใช้งาน",
        },
        { status: 404 }
      );
    }

    const existingUserprofile = await db.userProfile.findUnique({
      where: {
        userId,
      },
    });
    if (!existingUserprofile) {
      return NextResponse.json(
        {
          data: null,
          message: "ไม่พบโปรไฟล์ผู้ใช้งาน",
        },
        { status: 404 }
      );
    }

    const updateEmailVerified = await db.user.update({
      where: {
        id: existingUser.id,
      },
      data: {
        emailVerified: true,
        username,
        email: emailAddress,
      },
    });

    const updatedUserProfile = await db.userProfile.update({
      where: {
        userId: existingUser.id,
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
    console.log(updateEmailVerified);
    return NextResponse.json(updatedUserProfile);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "เกิดข้อผิดพลาดในการอัพเดทผู้ใช้งาน", error },
      { status: 500 }
    );
  }
}
