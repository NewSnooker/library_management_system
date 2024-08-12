import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    return NextResponse.json("123");
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to Fetch banners", error },
      { status: 500 }
    );
  }
}

