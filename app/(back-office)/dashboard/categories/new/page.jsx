"use client";

import FormHeader from "@/components/backoffice/FormHeader";
import CategoryForm from "@/components/backoffice/form/CategoryForm";

export default  function NewCategory() {
  return (
    <div>
      <FormHeader title="เพิ่มหมวดหมู่" />
      <CategoryForm />
    </div>
  );
}
