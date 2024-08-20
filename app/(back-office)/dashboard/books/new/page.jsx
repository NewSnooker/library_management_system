"use client";

import FormHeader from "@/components/backoffice/FormHeader";
import BookForm from "@/components/backoffice/form/BookForm";
import { Skeleton } from "@/components/ui/skeleton";
import { getData } from "@/lib/getData";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function NewBook() {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const { data: session, status } = useSession();
  const adminId = session?.user?.id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getData("admin/categories");
        setCategories(data);
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
      <FormHeader title="เพิ่มหนังสือ" loading={loading} />
      {loading ? (
        <Skeleton className="w-full h-96 mb-2 " />
      ) : (
        <BookForm
          adminId={adminId}
          categories={categories}
          loading={loading}
          setLoading={setLoading}
        />
      )}
    </div>
  );
}
