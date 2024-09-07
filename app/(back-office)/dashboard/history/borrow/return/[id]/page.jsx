"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { getData } from "@/lib/getData";
import { useQuery } from "@tanstack/react-query";
import { Bold, Images, X } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import moment from "moment";
import "moment/locale/th";
import { FINE_RATE } from "@/lib/constants";
import { Label } from "@radix-ui/react-label";
import { differenceInDays } from "date-fns";
import { useRouter } from "next/navigation";
moment.locale("th");

export default function Page({ params: { id } }) {
  const router = useRouter();
  const {
    data: borrow,
    isLoading: isBorrowLoading,
    error: borrowError,
  } = useQuery({
    queryKey: ["borrow", id],
    queryFn: () => getData(`admin/borrows/${id}`),
  });
  if (borrowError) return <div> Error: {borrowError.message}</div>;
  const fineAmount = Math.round(borrow?.book.price * FINE_RATE.DAY);

  return (
    <div>
      {isBorrowLoading ? (
        <>
          <Skeleton className=" sm:flex items-center justify-between py-6 sm:py-8 px-6  sm:px-12 mb-2"></Skeleton>
          <Skeleton className="w-full h-96 mb-2 " />
        </>
      ) : (
        <div className="">
          <div className="flex justify-between items-center py-4 sm:py-6 px-6 border rounded-sm sm:px-12 mb-2 ">
            <h2 className=" text-xl font-semibold">รายละเอียดการยืม</h2>
            <button
              className=" hover:text-red-500 transition-all"
              onClick={() => router.back()}
            >
              <X />
            </button>
          </div>
          <div className="grid sm:grid-cols-12 gap-2 sm:gap-5">
            <div className="sm:col-span-8 py-4 sm:py-6 px-6 border rounded-sm">
              <div className="text-lg font-semibold text-center mb-3">
                ข้อมูลการยืม
              </div>
              <div className="flex gap-x-10">
                <div className="w-1/3">
                  {borrow.book.imageUrl && (
                    <Image
                      src={borrow.book.imageUrl}
                      width={220}
                      height={220}
                      alt={borrow.book.title}
                      className="rounded-sm object-cover"
                    />
                  )}
                </div>
                <div className="w-2/3">
                  <p>
                    <strong>ชื่อหนังสือ :</strong> {borrow.book.title}
                  </p>
                  <p>
                    <strong>ผู้แต่ง :</strong> {borrow.book.author}
                  </p>
                  <p>
                    <strong>ราคา :</strong> {borrow.book.price} บาท
                  </p>
                  <p>
                    <strong>จำนวนทั้งหมด :</strong> {borrow.book.quantity} เล่ม
                  </p>
                  <p>
                    <strong>จำนวนคงเหลือ :</strong> {borrow.book.remaining} เล่ม
                  </p>

                  <p className="mt-5 sm:mt-10">
                    <strong>วันที่ยืม :</strong>{" "}
                    {moment(borrow.borrowDate).format("lll")}
                  </p>
                  <p>
                    <strong>กำหนดส่ง :</strong>{" "}
                    {moment(borrow.dueDate).format("lll")}
                  </p>
                  <p>
                    <strong>วันที่ส่งคืน :</strong>{" "}
                    {moment(borrow?.returnDate).format("lll")}
                  </p>
                  <p>จำนวนวันที่กำหนดยืม : {borrow.numberOfDays} วัน</p>
                  {/* <p>
                    <strong>จำนวนวันที่ยืม :</strong>  {borrow.returnDate ? differenceInDays(new Date(borrow.returnDate), new Date(borrow.borrowDate)) : "ไม่ระบุ"} วัน
                  </p> */}
                  <p>
                    <strong>สถานะ :</strong>{" "}
                    <span
                      className={`${
                        borrow.status === "BORROWED"
                          ? "text-yellow-800 dark:text-yellow-500"
                          : borrow.status === "RETURNED"
                          ? "text-green-800 dark:text-green-500"
                          : borrow.status === "OVERDUE"
                          ? "text-orange-800 dark:text-orange-500"
                          : borrow.status === "LOST"
                          ? "text-red-800 dark:text-red-500"
                          : ""
                      }`}
                    >
                      {borrow.status === "BORROWED"
                        ? "กำลังยืม"
                        : borrow.status === "RETURNED"
                        ? "ส่งคืนแล้ว"
                        : borrow.status === "OVERDUE"
                        ? "เกินกำหนด"
                        : borrow.status === "LOST"
                        ? "สูญหาย"
                        : ""}
                    </span>
                  </p>
                  <p>
                    <strong>ส่งคืน :</strong>{" "}
                    <span
                      className={
                        borrow.isReturned === false
                          ? "text-red-800 dark:text-red-500"
                          : "text-green-800 dark:text-green-500"
                      }
                    >
                      {borrow.isReturned === false
                        ? "ยังไม่ส่งคืน"
                        : "ส่งคืนแล้ว"}
                    </span>
                  </p>
                  <p className="flex items-center space-x-2">
                    <strong>สูญหาย :</strong>{" "}
                    {borrow.status === "LOST" ? (
                      <span className="text-red-800 dark:text-red-500">
                        สูญหาย
                      </span>
                    ) : (
                      <span className="text-green-800 dark:text-green-500">
                        ไม่สูญหาย
                      </span>
                    )}
                  </p>
                  <p className="mt-5 sm:mt-10">
                    <strong>ค่าปรับ :</strong>{" "}
                    <span>{(FINE_RATE.DAY * 100).toLocaleString()}</span> %
                    ของหนังสือ
                  </p>
                  <p>
                    <strong>ค่าปรับเล่มละ :</strong>{" "}
                    <span>{fineAmount.toLocaleString()}</span> บาท / วัน
                  </p>
                  <p className="flex items-center">
                    <strong>ค่าเสียหาย : </strong>
                    <span className="text-red-800 dark:text-red-500 font-bold mx-2">
                      {borrow?.damaged.toLocaleString() || 0}
                    </span>
                    บาท
                  </p>

                  <p>
                    <strong>ค่าปรับรวม :</strong>
                    <span className="text-red-800 dark:text-red-500 font-bold mx-2">
                      {borrow.fine.toLocaleString()}
                    </span>
                    บาท
                  </p>
                </div>
              </div>
            </div>
            <div className="sm:col-span-4 space-y-2 sm:space-y-5">
              <div className="py-4 sm:py-6 px-6 border rounded-sm">
                <div className="text-lg font-semibold mb-3 text-center">
                  ข้อมูลผู้ยืม
                </div>
                <div>
                  <div className=" flex justify-center">
                    {borrow.borrower.profileImage &&
                    borrow.borrower.profileImage.length > 0 ? (
                      <Image
                        src={borrow.borrower.profileImage}
                        width={100}
                        height={100}
                        alt="profile image"
                        className="mb-3 rounded-sm object-cover"
                      />
                    ) : null}
                  </div>
                  <p>
                    <strong>ชื่อ :</strong> {borrow.borrower.prefix}{" "}
                    {borrow.borrower.fullName}
                  </p>
                  <p>
                    <strong>หมายเลขประจำตัว :</strong>{" "}
                    {borrow.borrower.codeNumber}
                  </p>
                  <p>
                    <strong>เบอร์โทร :</strong> {borrow.borrower.phoneNumber}
                  </p>
                  <p>
                    <strong>ระดับการศึกษา :</strong>{" "}
                    {borrow.borrower.educationLevel}{" "}
                    {borrow.borrower.educationYear}
                  </p>
                </div>
              </div>
              <div className="py-4 sm:py-6 px-6 border rounded-sm">
                <div className="text-lg font-semibold mb-3 text-center">
                  ข้อมูลผู้อนุมัติการยืม
                </div>
                <div>
                  <div className=" flex justify-center">
                    {borrow.approver.profileImage &&
                    borrow.approver.profileImage.length > 0 ? (
                      <Image
                        src={borrow.approver.profileImage}
                        width={100}
                        height={100}
                        alt="profile image"
                        className="mb-3 rounded-sm object-cover"
                      />
                    ) : null}
                  </div>
                  <p>
                    <strong>ชื่อ :</strong> {borrow.approver.prefix}{" "}
                    {borrow.approver.fullName}
                  </p>
                  {/* <p><strong>เบอร์โทร:</strong> {borrow.approver.phoneNumber}</p> */}
                  <p>
                    <strong>หมายเลขประจำตัว :</strong>{" "}
                    {borrow.approver.codeNumber}
                  </p>
                </div>
              </div>
              {borrow.returnApprover && (
                <div className="py-4 sm:py-6 px-6 border rounded-sm">
                  <div className="text-lg font-semibold mb-3 text-center">
                    ข้อมูลผู้อนุมัติการคืน
                  </div>
                  <div>
                    <>
                      <div className=" flex justify-center">
                        {borrow.returnApprover.profileImage &&
                        borrow.returnApprover.profileImage.length > 0 ? (
                          <Image
                            src={borrow.returnApprover.profileImage}
                            width={100}
                            height={100}
                            alt="profile image"
                            className="mb-3 rounded-sm object-cover"
                          />
                        ) : null}
                      </div>
                      <p>
                        <strong>ชื่อ :</strong> {borrow.returnApprover.prefix}{" "}
                        {borrow.returnApprover.fullName}
                      </p>
                      {/* <p><strong>เบอร์โทร:</strong> {borrow.returnApprover.phoneNumber}</p> */}
                      <p>
                        <strong>หมายเลขประจำตัว :</strong>{" "}
                        {borrow.returnApprover.codeNumber}
                      </p>
                    </>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
