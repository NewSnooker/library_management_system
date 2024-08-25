import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { title, slug, imageUrl, description, adminId } =
      await request.json();
    console.log(adminId);
    const newCategory = {
      title,
      slug,
      imageUrl,
      description,
    };
    console.log("newCategory", newCategory);

    const exitingCategory = await db.category.findUnique({
      where: {
        slug,
      },
    });
    if (exitingCategory) {
      return NextResponse.json(
        {
          data: null,
          message: "มีหมวดหมู่นี้อยู่แล้ว",
        },
        { status: 409 }
      );
    }
    const category = await db.category.create({
      data: newCategory,
    });
    console.log(category);

    await db.activity.create({
      data: {
        type: "CREATE_CATEGORY",
        categoryId: category.id,
        userProfileId: adminId,
      },
    });
    console.log("CREATE_CATEGORY");

    return NextResponse.json(category);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "เกิดข้อผิดพลาดในการสร้างหมวดหมู่", error },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const categories = await db.category.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        activities: {
          include: {
            userProfile: true,
          },
        },
      },
    });
    const filterCategories = categories.map((item) => {
      const creatorActivity = item.activities.find(
        (activity) => activity.type === "CREATE_CATEGORY"
      );
      const updaterActivity = item.activities
      .filter((activity) => activity.type === "UPDATE_CATEGORY")
      .sort((a, b) => (b.updatedAt ?? b.createdAt) - (a.updatedAt ?? a.createdAt))[0];


      return {
        ...item,
        creator: creatorActivity?.userProfile?.username || null,
        updater: updaterActivity?.userProfile?.username || null,
      };
    });

    return NextResponse.json(filterCategories);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "เกิดข้อผิดพลาดในการดึงข้อมูลหมวดหมู่", error },
      { status: 500 }
    );
  }
}
