import db from "@/lib/db";
import { NextResponse } from "next/server";

// api/admin/borrows/[id]/route.js
export async function GET(request, { params: { id } }) {
  try {
    const borrow = await db.borrow.findUnique({
      where: {
        id,
      },
      include: {
        book: true,
        borrower: true,
        approver: true,
        returnApprover: true,
      },
    });

    return NextResponse.json(borrow);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "เกิดข้อผิดพลาดในการดึงข้อมูลการยืม", error },
      { status: 500 }
    );
  }
}

// api/admin/borrows/[id]/update
export async function PUT(request, { params: { id } }) {
  try {
    const body = await request.json();
    const { returnApproverId, returnDate, fine, damaged, status, bookId } = body;

    // ตรวจสอบว่า returnApproverId มีอยู่จริง
    if (returnApproverId) {
      const returnApprover = await db.userProfile.findUnique({
        where: {
          userId: returnApproverId,
        },
      });

      if (!returnApprover) {
        return NextResponse.json(
          { message: "ไม่พบผู้ใช้ที่ระบุสำหรับ returnApproverId" },
          { status: 404 }
        );
      }
    
    }

    // ค่าที่จะอัปเดต
    const updateData = {
      returnApproverId,
      returnDate,
      isReturned: status !== "LOST",
      fine:parseInt(fine),
      damaged:parseInt(damaged),
      status,
    };

    // อัปเดตข้อมูลการยืมในฐานข้อมูล
    const updatedBorrow = await db.borrow.update({
      where: {
        id,
      },
      data: updateData,
    });

    console.log(updatedBorrow);

    // อัปเดตข้อมูลจำนวนหนังสือ ถ้าได้คืนแล้ว
      if (status !== "LOST") {
        const updateBook = await db.book.update({
          where: {
            id: bookId,
          },
          data: {
            remaining: {
              increment: 1,
            },
          },
        });
        console.log(updateBook);
      }

    return NextResponse.json(updatedBorrow);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "เกิดข้อผิดพลาดในการอัปเดตข้อมูลการยืม", error },
      { status: 500 }
    );
  }
}
