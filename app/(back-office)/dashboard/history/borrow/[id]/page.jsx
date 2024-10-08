"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { getData } from "@/lib/getData";
import { useQuery } from "@tanstack/react-query";
import { Bold, Images, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import moment from "moment";
import "moment/locale/th";
import { FINE_RATE } from "@/lib/constants";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { Badge } from "@/components/ui/badge";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { isLoading } from "@/redux/slices/loadingFullScreenSlice";
import toast from "react-hot-toast";
moment.locale("th");

export default function Page({ params: { id } }) {
  const { data: session } = useSession();
  const returnApproverId = session?.user?.id;
  const returnApproverName = session?.user?.username;
  const router = useRouter();
  const dispatch = useDispatch();

  const {
    data: borrow,
    isLoading: isBorrowLoading,
    error: borrowError,
  } = useQuery({
    queryKey: ["borrow", id],
    queryFn: () => getData(`admin/borrows/${id}`),
  });
  if (borrowError) return <div> Error: {borrowError.message}</div>;
  const today = new Date();
  const due = new Date(borrow?.dueDate);
  const difference = due - today;
  const daysRemaining = Math.round(difference / (1000 * 60 * 60 * 24));
  const overdueDays = borrow?.isReturned ? 0 : Math.max(0, daysRemaining * -1); // จำนวนวันที่เกินกำหนด
  const fineAmount = Math.round(borrow?.book.price * FINE_RATE.DAY);
  const calculatedFine = overdueDays * fineAmount;
  const [manualFine, setManualFine] = useState(0);
  const [totalFine, setTotalFine] = useState(0); // เก็บค่าปรับรวม
  const [isLost, setIsLost] = useState(false); // state สำหรับเก็บสถานะ toggle
  useEffect(() => {
    setTotalFine(calculatedFine);
  }, [calculatedFine]);

  const handleExtraFine = (extraFine) => {
    setManualFine(extraFine);
    setTotalFine(calculatedFine + extraFine); // อัปเดตค่าปรับรวม
  };
  const onSuccess = () => {
    router.push("/dashboard/history");
    router.refresh();
  };

  const handleConfirmReturn = async() => {
    Swal.fire({
      title: "คุณแน่ใจมั้ย??",
      text: "คุณต้องการคืนหนังสือเล่มนี้ใช่หรอไม่!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ใช่ ยืนยัน!",
      cancelButtonText: "ยกเลิก",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const data = {};
        data.returnApproverId = returnApproverId;
        data.returnDate = new Date().toISOString();
        data.fine = totalFine;
        data.damaged = manualFine;
        data.status = "RETURNED";
        data.bookId = borrow?.bookId;
    
        if (isLost) {
          data.status = "LOST";
        } else if (daysRemaining < 0) {
          data.status = "OVERDUE";
        } else {
          data.status = "RETURNED";
        }

        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
        dispatch(isLoading(true));
        const res = await fetch(`${baseUrl}/api/admin/borrows/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        if (res.status === 400) {
          const data = await res.json();
          toast.error(data.message);
          dispatch(isLoading(false));
        }
        if (res.status === 404) {
          const data = await res.json();
          toast.error(data.message);
          dispatch(isLoading(false));
        }
        if (res.ok) {
          onSuccess();
          // window.location.reload();
          toast.success(`ทำการคืนหนังสือสำเร็จ`);
          dispatch(isLoading(false));
        }
      } else {
        dispatch(isLoading(false));
        router.refresh();
      }
    });
  };


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
                    <strong>จำนวนวันที่ยืม :</strong> {borrow.numberOfDays} วัน
                  </p>
                  <p>
                    <strong>จำนวนวันที่คงเหลือ :</strong>{" "}
                    {daysRemaining > 0 ? daysRemaining : 0} วัน
                  </p>
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
                          ? "text-yellow-800 dark:text-yellow-500"
                          : "text-green-800 dark:text-green-500"
                      }
                    >
                      {borrow.isReturned === false
                        ? "ยังไม่ส่งคืน"
                        : "ส่งคืนแล้ว"}
                    </span>
                  </p>

                  <p className="mt-5 sm:mt-10">
                    <strong>จำนวนวันที่เกินกำหนด : </strong>
                    <span>
                      {borrow.isReturned === false
                        ? `${overdueDays.toLocaleString()}`
                        : 0}{" "}
                      {/*borrow.saveOverdueDays */}
                    </span>{" "}
                    วัน
                  </p>
                  <p>
                    <strong>ค่าปรับ :</strong>{" "}
                    <span>{(FINE_RATE.DAY * 100).toLocaleString()}</span> %
                    ของหนังสือ
                  </p>
                  <p>
                    <strong>ค่าปรับเล่มละ :</strong>{" "}
                    <span>{fineAmount.toLocaleString()}</span> บาท / วัน
                  </p>
                  <p className="flex items-center">
                    <strong>ค่าเสียหาย :</strong>{" "}
                    <Input
                      type="number"
                      placeholder="กรอกค่าปรับ"
                      // defaultValue={0}
                      onChange={(e) => handleExtraFine(Number(e.target.value))}
                      className="h-6 border mx-2 w-28 "
                    />{" "}
                    บาท 
                  </p>

                  <p>
                    <strong>ค่าปรับ :</strong> {overdueDays} x {fineAmount} +{" "}
                    {manualFine} ={" "}
                    <span className="text-red-800 dark:text-red-500">
                      {totalFine || calculatedFine}
                    </span>{" "}
                    บาท
                  </p>
                  <p className="flex items-center space-x-2">
                    <strong>สูญหาย :</strong>{" "}
                    <input
                      type="checkbox"
                      className="toggle toggle-error toggle-xs sm:toggle-sm "
                      checked={isLost}
                      onChange={(e) => setIsLost(e.target.checked)} // อัปเดต state isLost เมื่อ toggle ถูกเช็ค
                    />
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
            </div>
          </div>
          <div className="my-2 py-4 sm:py-6 px-6 border rounded-sm  ">
            <div className="grid sm:grid-cols-12 gap-5 sm:gap-10">
              <div className="sm:col-span-8">
                {" "}
                <div className="flex justify-between items-center">
                  <div className="flex flex-col sm:flex-row items-center">
                    {" "}
                    <strong>ผู้อนุมัติการคืน : </strong> {returnApproverName}{" "}
                    <Badge
                      variant="outline"
                      className="mx-2 border-custom-text text-custom-text dark:border-blue-700 dark:text-blue-300"
                    >
                      ฉัน
                    </Badge>
                  </div>
                  <div className="font-bold sm:text-2xl">
                    <Label className="">
                      ค่าปรับรวม{" "}
                      <span className="text-red-800 dark:text-red-500 text-2xl ">
                        {totalFine.toLocaleString() || calculatedFine}
                      </span>{" "}
                    </Label>
                    บาท
                  </div>
                </div>
              </div>
              <div className="sm:col-span-4 ">
                <div className="flex justify-end ">
                  <Button onClick={handleConfirmReturn} className="">
                    ยืนยันการคืน
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

