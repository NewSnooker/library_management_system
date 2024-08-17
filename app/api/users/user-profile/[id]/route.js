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
