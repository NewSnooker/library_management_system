"use client";
import FormHeader from "@/components/backoffice/FormHeader";
import BookForm from "@/components/backoffice/form/BookForm";
import { Skeleton } from "@/components/ui/skeleton";
import { getData } from "@/lib/getData";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function UpdateBook({ params: { id } }) {
  const { data: session, status } = useSession();
  const adminId = session?.user?.id;

  const [loading, setLoading] = useState(true);
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getData(`admin/books/${id}`);
        setBooks(data);
        const category = await getData("admin/categories");
        setCategories(category);
        setLoading(true);
        console.log(data);
      } catch (error) {
        console.error("เกิดความเสียบางอย่างเกี่ยวกับข้อมูล:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  return (
    <div>
      <FormHeader title="แก้ไขหนังสือ" loading={loading} />
      {loading ? (
        <Skeleton className="w-full h-96 mb-2 " />
      ) : (
        <BookForm
          adminId={adminId}
          loading={loading}
          updateData={books}
          categories={categories}
          setLoading={setLoading}
        />
      )}
    </div>
  );
}
