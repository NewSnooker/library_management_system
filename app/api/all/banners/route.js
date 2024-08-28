import db from "@/lib/db";
import { NextResponse } from "next/server";
export const fetchCache = "force-no-store";

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
        headers: { "Cache-Control": "no-cache" },
      });
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        { message: "เกิดข้อผิดพลาดในการดึงข้อมูลแบนเนอร์", error },
        { status: 500 }
      );
    }
  }