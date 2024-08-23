import db from "@/lib/db";
import { NextResponse } from "next/server";

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
    // const filterBanners = banners.map((item) => {
    //   const creatorActivity = item.activities.find(
    //     (activity) => activity.type === "CREATE_BANNER"
    //   );
    //   const updaterActivity = item.activities.find(
    //     (activity) => activity.type === "UPDATE_BANNER"
    //   );

    //   return {
    //     ...item,
    //     creator: creatorActivity?.userProfile?.username || null,
    //     updater: updaterActivity?.userProfile?.username || null,
    //   };
    // });

    const filterImages = banners.map((item) => item.imageUrls);

    return NextResponse.json(filterImages[0]);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "เกิดข้อผิดพลาดในการดึงข้อมูลแบนเนอร", error },
      { status: 500 }
    );
  }
}
