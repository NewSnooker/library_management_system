import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const {
      title,
      slug,
      price,
      quantity,
      author,
      imageUrls,
      description,
      categoryId,
      adminId,
    } = await request.json();
    const newBook = {
      title,
      slug,
      price: parseInt(price),
      quantity: parseInt(quantity),
      remaining: parseInt(quantity),
      author,
      imageUrls,
      imageUrl : imageUrls[0],
      description,
      categoryId,
    };

    const exitingBook = await db.book.findUnique({
      where: {
        slug,
      },
    });
    if (exitingBook) {
      return NextResponse.json(
        {
          data: null,
          message: "มีหนังสือนี้อยู่แล้ว",
        },
        { status: 409 }
      );
    }
    const res = await db.book.create({
      data: newBook,
    });
    await db.activity.create({
      data: {
        type: "CREATE_BOOK",
        userProfileId: adminId,
        bookId: res.id,
      },
    });
    console.log("CREATE_BOOK");
    return NextResponse.json(res);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "เกิดข้อผิดพลาดในการสร้างหนังสือ", error },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const books = await db.book.findMany({
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
    const filterBooks = books.map((item) => {
      const creatorActivity = item.activities.find(
        (activity) => activity.type === "CREATE_BOOK"
      );
      const updaterActivity = item.activities
      .filter((activity) => activity.type === "UPDATE_BOOK")
      .sort((a, b) => (b.updatedAt ?? b.createdAt) - (a.updatedAt ?? a.createdAt))[0];

      return {
        ...item,
        creator: creatorActivity?.userProfile?.username || null,
        updater: updaterActivity?.userProfile?.username || null,
      };
    });

    return NextResponse.json(filterBooks);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "เกิดข้อผิดพลาดในการดึงข้อมูลหนังสือ", error },
      { status: 500 }
    );
  }
}
