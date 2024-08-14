import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function VerifyEmail() {
  return (
    <div className="max-w-2xl mx-auto min-h-screen px-8 mt-36">
      <div
        id="alert-additional-content-2"
        className="p-4 mb-4  border rounded-lg bg-card "
        role="alert"
      >
        <div className="flex items-center">
          <Info className="flex-shrink-0 w-4 h-4 me-2" />
          <span className="sr-only">Info</span>
          <h3 className="text-lg font-medium">เราได้ส่งอีเมลไปหาคุณแล้ว</h3>
        </div>
        <div className="mt-2 mb-4 text-sm text-muted-foreground">
          โปรดตรวจสอบอีเมลของคุณ ก่อนที่คุณจะสามารถเข้าสู่ระบบได้
          เพื่อยืนยันตัวตนก่อนเข้าสู่ระบบ ทางเราขอขอบคุณที่ใช้บริการ
          โปรดไว้วางใจและให้ความร่วมมือ ขอบคุณครับ.
        </div>
        <div className="mt-4 flex justify-end">
          <Link
            href="/login"
            className=""
          >
            <Button className="text-sm font-bold" size="sm">เข้าสู่ระบบ</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
