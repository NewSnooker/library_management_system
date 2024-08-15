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
          message: "Not User Found",
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
          message: "Not User Profile Found",
        },
        { status: 404 }
      );
    }


     const updatedUserProfile =await db.userProfile.update({
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

    return NextResponse.json(updatedUserProfile);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to create User Profile", error },
      { status: 500 }
    );
  }
}

