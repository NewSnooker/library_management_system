// import BookForm from "@/components/backoffice/form/BookForm";
import FormHeader from "@/components/backoffice/FormHeader";
import { getData } from "@/lib/getData";
import React from "react";
export const dynamic = "force-dynamic";
export default async function page() {
  try {
    // const categoriesData = await getData("categories");
    // const categories = Array.isArray(categoriesData) ? categoriesData.map((category) => ({
    //   id: category.id,
    //   title: category.title,
    // })) : [];

    return (
      <div>
        <FormHeader title="New Book" />
        {/* <BookForm categories={categories} /> */}
      </div>
    );
  } catch (error) {
    console.error("Error fetching categories:", error);
    return <div>Error loading categories. Please try again later.</div>;
  }
}
