import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request, { params: { id } }) {
  try {
    const userProfile = await db.userProfile.findUnique({
      where: {
        userId: id,
      },
    });
    if (!userProfile) {
      return NextResponse.json(
        {
          data: null,
          message: "User Profile Not Found",
        },
        { status: 409 }
      );
    }
    return NextResponse.json(userProfile);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to Fetch User", error },
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
          message: "User Profile Not Found",
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
    return NextResponse.json(updatedUserProfile);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to Update User Profile", error },
      { status: 500 }
    );
  }
}
