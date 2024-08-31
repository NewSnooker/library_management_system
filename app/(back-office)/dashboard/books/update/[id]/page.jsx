"use client";

import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import FormHeader from "@/components/backoffice/FormHeader";
import BookForm from "@/components/backoffice/form/BookForm";
import { Skeleton } from "@/components/ui/skeleton";
import { getData } from "@/lib/getData";

export default function UpdateBook({ params: { id } }) {
  const { data: session } = useSession();
  const adminId = session?.user?.id;

  const {
    data: book,
    isLoading: isBookLoading,
    error: bookError,
  } = useQuery({
    queryKey: ["book", id],
    queryFn: () => getData(`admin/books/${id}`),
  });

  const {
    data: categories,
    isLoading: isCategoriesLoading,
    error: CategoriesError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getData("admin/categories"),
  });

  const isLoading = isBookLoading || isCategoriesLoading;

  if (bookError || CategoriesError)
    return <div> Error: {bookError.message || CategoriesError.message}</div>;
  
  return (
    <div>
      <FormHeader title="แก้ไขหนังสือ" loading={isLoading} />
      {isLoading ? (
        <Skeleton className="w-full h-96 mb-2" />
      ) : (
        <BookForm
          adminId={adminId}
          loading={isLoading}
          updateData={book}
          categories={categories}
        />
      )}
    </div>
  );
}
