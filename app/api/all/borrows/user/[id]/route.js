import db from "@/lib/db";
import { NextResponse } from "next/server";

// api/admin/books
export async function GET(request, { params: { id } }) {
  try {
    const borrows = await db.borrow.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        borrowerId: id,
      },
      include: {
        book: true, // Assuming you want to include book details
        borrower: true, // Assuming you want to include borrower details
        approver: true, // Assuming you want to include approver details
        returnApprover: true, // Assuming you want to include approver details
      },
    });

    const filterBorrows = borrows.map((item) => {
      return {
        ...item,
        bookTitle: item.book?.title || "",
        borrowerName: `${item.borrower?.prefix || ""} ${
          item.borrower?.fullName || ""
        }`.trim(),
        borrowerProfileImage: item.borrower?.profileImage || "",
        borrowerEducation: `${item.borrower?.educationLevel || ""} ${
          item.borrower?.educationYear || ""
        }`.trim(),
        borrowerCodeNumber: item.borrower?.codeNumber || "",
        borrowerPhoneNumber: item.borrower?.phoneNumber || "",
        approverName: item.approver?.username || "",
        bookImageUrl: item.book?.imageUrl || "",
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
