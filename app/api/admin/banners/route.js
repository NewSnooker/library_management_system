import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { imageUrls, adminId } = await request.json();

    const res = await db.banner.create({
      data: {
        imageUrls, 
      },
    });
    await db.activity.create({
      data: {
        type: "CREATE_BANNER",
        userProfileId: adminId,
        bannerId: res.id,
      },
    });
    console.log("CREATE_BANNER");
    return NextResponse.json(res);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "เกิดข้อผิดพลาดในการสร้างแบนเนอร์", error },
      { status: 500 }
    );
  }
}
export async function PUT(request) {
  try {
    const { id, imageUrls, adminId } = await request.json();

    const res = await db.banner.update({
      where: {
        id: id, 
      },
      data: {
        imageUrls, 
      },
    });
    await db.activity.create({
      data: {
        type: "UPDATE_BANNER",
        userProfileId: adminId,
        bannerId: res.id,
      },
    });
    console.log("UPDATE_BANNER");
    return NextResponse.json(res);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "เกิดข้อผิดพลาดในการสร้างแบนเนอร์", error },
      { status: 500 }
    );
  }
}
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

    return NextResponse.json(banners[0]);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "เกิดข้อผิดพลาดในการดึงข้อมูลแบนเนอร", error },
      { status: 500 }
    );
  }
}

