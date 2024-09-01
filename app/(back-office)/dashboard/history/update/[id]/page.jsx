"use client";
import FormHeader from "@/components/backoffice/FormHeader";
import CategoryForm from "@/components/backoffice/form/CategoryForm";
import { Skeleton } from "@/components/ui/skeleton";
import { getData } from "@/lib/getData";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
export const dynamic = "force-dynamic";
// คอมโพเนนต์สำหรับดึงข้อมูลหมวดหมู่

export default function UpdateCategory({ params: { id } }) {
  const { data: session, status } = useSession();
  const adminId = session?.user?.id;

  const { data: categories, isLoading: isCategoriesLoading } = useQuery({
    queryKey: ["categories",id],
    queryFn: () => getData(`admin/categories/${id}`),
  });
  const isLoading = isCategoriesLoading;
  return (
    <div>
      <FormHeader title="แก้ไขหมวดหมู่" loading={isLoading} />
      {isLoading ? (
        <Skeleton className="w-full h-96 mb-2 " />
      ) : (
        <CategoryForm updateData={categories} adminId={adminId} />
      )}
    </div>
  );
}
