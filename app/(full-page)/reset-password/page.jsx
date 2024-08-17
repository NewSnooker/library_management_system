// import ForgotPasswordForm from "@/components/ForgotPasswordForm";
// import RegisterForm from "@/components/RegisterForm";

import ResetPasswordForm from "@/components/frontend/ResetPasswordForm ";
import { Info } from "lucide-react";
export const dynamic = "force-dynamic";
export default function PasswordReset() {
  return (
    <div className="max-w-2xl mx-auto px-8  mt-36">
      <div
        id="alert-additional-content-2"
        className="p-4 sm:py-10 mb-4 border rounded-lg bg-card "
        role="alert"
      >
        <div className="flex items-center sm:px-10 ">
          <Info className="flex-shrink-0 w-4 h-4 me-2" />
          <span className="sr-only">Info</span>
          <h3 className="text-xl font-medium">รีเซตรหัสผ่าน</h3>
        </div>
        <div className="mt-2 sm:px-10 mb-4 text-sm text-muted-foreground">
          กรอกรหัสผ่านใหม่ของคุณ เราจะอัพเดตรหัสผ่านของคุณให้เป็นปัจจุบัน
          โปรดตรวจสอบรหัสผ่านให้ดีก่อนที่คุณจะอัพเดตรหัสผ่าน เพื่อความปลอดภัยในการเข้าสู่ระบบ
        </div>
        <div className="sm:px-10">
          <ResetPasswordForm />
        </div>
      </div>
    </div>
  );
}
