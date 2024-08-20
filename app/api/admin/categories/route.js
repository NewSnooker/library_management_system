import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { title, slug, imageUrl, description, adminId } = await request.json();
    console.log(adminId);
    const newCategory = {
      title,
      slug,
      imageUrl,
      description,
      creatorId: adminId,
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
    const category = await db.category.findMany({
      orderBy: {
        title: "desc",
      },
      include: {
        book: true,
        creator: true,
        updater: true,
      },
    });
    const processedCategory = category.map((item) => ({
      ...item,
      creator: item.creator?.username || null,
      updater: item.updater?.username || null,
    }));
    return NextResponse.json(processedCategory);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "เกิดข้อผิดพลาดในการดึงข้อมูลหมวดหมู่", error },
      { status: 500 }
    );
  }
}
