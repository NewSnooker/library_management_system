import db from "@/lib/db";
import { NextResponse } from "next/server";
export const fetchCache = "force-no-store";
export const revalidate = 0;

export async function GET(request) {
  try {
    const banners = await db.banner.findMany({
      include: {
        activities: {
          include: {
            userProfile: true,
          },
        },
      },
    });

    return NextResponse.json(banners[0], {
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
      { message: "เกิดข้อผิดพลาดในการดึงข้อมูลแบนเนอร์", error },
      { status: 500 }
    );
  }
}
