import db from "@/lib/db";
import { NextResponse } from "next/server";
import { ActivityType } from "@prisma/client"; // นำเข้า enum จาก Prisma schema ของคุณ

export async function POST(request) {
  try {
    const {
      bookId,
      borrowerId,
      approverId,
      borrowDate,
      dueDate,
      numberOfDays,
    } = await request.json();

    // ค้นหาหนังสือที่ต้องการยืม
    const book = await db.book.findUnique({
      where: { id: bookId },
    });

    if (!book) {
      return NextResponse.json(
        { message: "ไม่พบหนังสือที่ต้องการยืม" },
        { status: 404 }
      );
    }

    // ตรวจสอบว่าหนังสือมีจำนวนคงเหลือเพียงพอหรือไม่
    if (book.remaining <= 0) {
      return NextResponse.json(
        { message: "หนังสือหมดสต็อก" },
        { status: 400 }
      );
    }

    // ลดจำนวนคงเหลือของหนังสือลง 1
    const updatedBook = await db.book.update({
      where: { id: bookId },
      data: { remaining: book.remaining - 1 },
    });

    // สร้างบันทึกการยืมใหม่ในฐานข้อมูล
    const newBorrow = {
      bookId,
      borrowerId,
      approverId,
      borrowDate,
      dueDate,
      numberOfDays: parseInt(numberOfDays),
    };

    const borrowRecord = await db.borrow.create({
      data: newBorrow,
    });

    // บันทึกกิจกรรมการอนุมัติคำขอยืมหนังสือ
    await db.activity.create({
      data: {
        type: "CREATE_BORROW",
        userProfileId: approverId,
        bookId: borrowRecord.bookId,
      },
    });

    console.log("CREATE_BORROW");
    return NextResponse.json(newBorrow);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "เกิดข้อผิดพลาดในการยืมหนังสือ", error },
      { status: 500 }
    );
  }
}
// api/admin/books
export async function GET(request) {
  try {
    const borrows = await db.borrow.findMany({
      orderBy: {
        borrowDate: "desc",
      },
      include: {
        book: true, // Assuming you want to include book details
        borrower: true, // Assuming you want to include borrower details
        approver: true, // Assuming you want to include approver details
      },
    });

    const filterBorrows = borrows.map((item) => {
      return {
        ...item,
        bookTitle: item.book?.title || "",
        borrowerName: `${item.borrower?.prefix || ""}${item.borrower?.fullName || ""}`.trim(),
        borrowerProfileImage: item.borrower?.profileImage || "",
        borrowerEducation: `${item.borrower?.educationLevel || ""} ${
          item.borrower?.educationYear || ""
        }`.trim(),
        borrowerCodeNumber: item.borrower?.codeNumber || "",
        borrowerPhoneNumber: item.borrower?.phoneNumber || "",
        approverName: item.approver?.username || "",
      };
    });

    return NextResponse.json(filterBorrows);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "เกิดข้อผิดพลาดในการดึงข้อมูลการยืม", error },
      { status: 500 }
    );
  }
}
