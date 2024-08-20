"use client";

import FormHeader from "@/components/backoffice/FormHeader";
import CategoryForm from "@/components/backoffice/form/CategoryForm";
import { useSession } from "next-auth/react";

export default  function NewCategory() {
  const { data: session, status } = useSession();
  const adminId = session?.user?.id;
  // console.log(`adminId:${adminId}`);
  
  return (
    <div>
      <FormHeader title="เพิ่มหมวดหมู่" />
      <CategoryForm adminId={adminId} />
    </div>
  );
}
