"use client";
import DataTable from "@/components/backoffice/data-table-components/DataTable";
import { Skeleton } from "@/components/ui/skeleton";
import { getData } from "@/lib/getData";
import { useQuery } from "@tanstack/react-query";
import { X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { columns } from "./columns";
import { useSelector } from "react-redux";
import { useSession } from "next-auth/react";

import { addDays, differenceInDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import { th } from "date-fns/locale"; // นำเข้า locale ภาษาไทย

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

export default function page({ params: { id } }) {
  const router = useRouter();
  const userId = useSelector((store) => store.selectBorrowUser.userId);
  const { data: admin } = useSession();
  const adminId = admin?.user?.id;
  const adminName = admin?.user?.username;

  const [date, setDate] = React.useState({
    from: new Date(),
    to: addDays(new Date(), 7),
  });

  const numberOfDays =
    date?.from && date?.to ? differenceInDays(date.to, date.from) + 1 : 0; // คำนวณจำนวนวัน

  const {
    data: book,
    isLoading: isBookLoading,
    error: bookError,
  } = useQuery({
    queryKey: ["book", id],
    queryFn: () => getData(`admin/books/${id}`),
  });
  const {
    data: users,
    isUsersLoading,
    errorUsers,
  } = useQuery({
    queryKey: ["users"],
    queryFn: () => getData("admin/users"),
  });
  const {
    data: userDetail,
    isUserDetailLoading,
    errorUserDetail,
  } = useQuery({
    queryKey: ["userDetail", userId],
    queryFn: () => getData(`admin/users/${userId}`),
    enabled: !!userId,
  });
  if (bookError) return <div> Error: {bookError.message}</div>;
  if (errorUsers) return <div> Error: {errorUsers.message}</div>;
  if (errorUserDetail) return <div> Error: {errorUserDetail.message}</div>;

  return (
    <div className="">
      {isBookLoading ? (
        <>
          <Skeleton className=" sm:flex items-center justify-between py-6 sm:py-8 px-6  sm:px-12 mb-2"></Skeleton>
          <Skeleton className="w-full h-96 mb-2 " />
        </>
      ) : (
        <div className="">
          <div className="flex justify-between items-center py-4 sm:py-6 px-6 border rounded-sm sm:px-12 mb-2 ">
            <h2 className=" text-xl font-semibold">ยืมหนังสือ</h2>
            <button
              className=" hover:text-red-500 transition-all"
              onClick={() => router.back()}
            >
              <X />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 w-full p-4 border rounded-sm sm:p-6 md:p-8 mx-auto ">
            <div className="col-span-1 w-full">
              <Image
                src={book.imageUrl}
                alt="Item image"
                width={1000}
                height={667}
                loading="lazy"
                className="w-full h-auto sm:h-80 object-cover rounded-sm"
              />
              <h2 className="text-xl font-semibold mt-2">{book.title}</h2>
            </div>
            <div className="col-span-3">
              {isUsersLoading ? (
                <Skeleton className="w-full h-40 mb-2" />
              ) : (
                <DataTable
                  data={users || []}
                  columns={columns}
                  filterKeys={["fullName", "codeNumber"]}
                />
              )}
            </div>
          </div>
          {userId ? (
            <div className=" w-full py-4 sm:py-6 px-6 border rounded-sm sm:px-12 my-2">
              <h2 className="text-xl font-semibold mb-5">รายละเอียดการยืม</h2>
              <div className="flex items-center  ">
                {isUserDetailLoading ? (
                  <Skeleton className="w-full h-6 mb-2" />
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-3 items-stretch gap-4 w-full dark:text-muted-foreground ">
                    <div className="col-span-1">
                      <div className="text-lg font-semibold mb-3">
                        ข้อมูลผู้ยืม
                      </div>
                      <div className="">
                        ชื่อ : {userDetail?.prefix} {userDetail?.fullName}{" "}
                      </div>
                      <div className="">
                        ระดับการศึกษา : {userDetail?.educationLevel}{" "}
                        {userDetail?.educationYear}{" "}
                      </div>
                      <div className="">
                        รหัสนักศึกษา : {userDetail?.codeNumber}{" "}
                      </div>
                      <div className="">
                        เบอร์โทร : {userDetail?.phoneNumber}
                      </div>
                      <div className="text-lg font-semibold mb-3 mt-2 sm:mt-5">
                        ข้อมูลหนังสือ
                      </div>
                      <div className="">ชื่อหนังสือ : {book.title}</div>
                      <div className="">ราคาหนังสือ : {book.price} บาท</div>
                      <div className="">จำนวนที่ยืม : 1 เล่ม</div>
                      <div className="">คงเหลือ : {book.remaining} เล่ม</div>
                    </div>
                    <div className="col-span-1">
                      <div className="text-lg font-semibold mb-3">
                        ผู้อนุมัติ
                      </div>
                      <div className="">ผู้ดูแล : {adminName}</div>

                      <div className="mt-2 sm:mt-24">
                        <div className="text-lg font-semibold mb-3">
                          กำหนดการยืม
                        </div>
                        {date?.from ? (
                          date.to ? (
                            <>
                              วันที่{" "}
                              {format(date.from, "dd LLLL yyyy", {
                                locale: th,
                              })}{" "}
                              -{" "}
                              {format(date.to, "dd LLLL yyyy", {
                                locale: th,
                              })}
                            </>
                          ) : (
                            format(date.from, "dd LLLL yyyy", { locale: th })
                          )
                        ) : null}
                      </div>
                      <div className="">เป็นจำนวน : {numberOfDays} วัน</div>
                    </div>

                    <div className="col-span-1 sm:ml-4">
                      <div className={cn("grid gap-2")}>
                        <Button
                          id="date"
                          variant={"outline"}
                          className={cn(
                            "w-[280px]ห justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date?.from ? (
                            date.to ? (
                              <>
                                {format(date.from, "dd LLLL yyyy", {
                                  locale: th,
                                })}{" "}
                                -{" "}
                                {format(date.to, "dd LLLL yyyy", {
                                  locale: th,
                                })}
                              </>
                            ) : (
                              format(date.from, "dd LLLL yyyy", { locale: th })
                            )
                          ) : (
                            <span>เลือกวันที่</span>
                          )}
                        </Button>
                        <div className="w-auto p-0">
                          <Calendar
                            initialFocus
                            mode="range"
                            selected={date}
                            onSelect={setDate}
                            numberOfMonths={1}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="w-full flex justify-end mt-8 relative">
                <Button >ยืนยันการยืม</Button>
              </div>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
