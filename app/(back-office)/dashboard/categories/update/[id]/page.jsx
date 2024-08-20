"use client";
import FormHeader from "@/components/backoffice/FormHeader";
import CategoryForm from "@/components/backoffice/form/CategoryForm";
import { Skeleton } from "@/components/ui/skeleton";
import { getData } from "@/lib/getData";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
export const dynamic = "force-dynamic";
// คอมโพเนนต์สำหรับดึงข้อมูลหมวดหมู่

export default function UpdateCategory({ params: { id } }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const { data: session, status } = useSession();
  const adminId = session?.user?.id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData(`admin/categories/${id}`);
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
      <FormHeader title="แก้ไขหมวดหมู่" loading={loading} />
      {loading ? (
        <Skeleton className="w-full h-96 mb-2 " />
      ) : (
        <CategoryForm updateData={categories} adminId={adminId} />
      )}
    </div>
  );
}
