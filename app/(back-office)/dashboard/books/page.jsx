"use client";
import React, { useEffect, useState } from "react";
import PageHeader from "@/components/backoffice/PageHeader";
import DataTable from "@/components/backoffice/data-table-components/DataTable";
import { getData } from "@/lib/getData";
import { columns } from "./columns";
import { Skeleton } from "@/components/ui/skeleton";

const Page = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData("admin/books");
        // console.log(data);
        
        setBooks(data);
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
      {/* Header */}
      <PageHeader
        loading={loading}
        heading="หนังสือ"
        linkTitle="เพิ่มหนังสือ"
        href="/dashboard/books/new"
      />
      <div className="py-2">
        {loading ? (
          <Skeleton className="w-full h-96 mb-2 " />
        ) : (
          <DataTable
            data={books}
            columns={columns}
            filterKeys={["title"]}
          />
        )}
      </div>
    </div>
  );
};

export default Page;
