"use client";

import FormHeader from "@/components/backoffice/FormHeader";
import BookForm from "@/components/backoffice/form/BookForm";
import { Skeleton } from "@/components/ui/skeleton";
import { getData } from "@/lib/getData";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export default function NewBook() {
  const { data: session, status } = useSession();
  const adminId = session?.user?.id;

  const { data: categories, isLoading: isCategoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getData("admin/categories"),
  });

  const isLoading = isCategoriesLoading;
  return (
    <div>
      <FormHeader title="เพิ่มหนังสือ" loading={isLoading} />
      {isLoading ? (
        <Skeleton className="w-full h-96 mb-2 " />
      ) : (
        <BookForm
          adminId={adminId}
          categories={categories}
          loading={isLoading}
        />
      )}
    </div>
  );
}
