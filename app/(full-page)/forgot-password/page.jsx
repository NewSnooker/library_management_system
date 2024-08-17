import ForgotPasswordForm from "@/components/frontend/ForgotPasswordForm";
import { Info } from "lucide-react";

export default function Register() {
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
          <h3 className="text-xl font-medium">ลืมรหัสผ่าน</h3>
        </div>

        <div className="sm:px-10">
          <ForgotPasswordForm />
        </div>
      </div>
    </div>
  );
}
