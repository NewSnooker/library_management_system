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
    
    return NextResponse.json(user);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to Fetch User", error },
      { status: 500 }
    );
  }
}
