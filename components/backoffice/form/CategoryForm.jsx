"use client";
import { makePostRequest, makePutRequest } from "@/lib/apiRequest";
import { generateSlug } from "@/lib/generateSlug";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import ImageInput from "@/components/formInputs/ImageInput";
import SubmitButton from "@/components/formInputs/SubmitButton";
import TextAreaInput from "@/components/formInputs/TextArealInput";
import TextInput from "@/components/formInputs/TextInput";
import { isLoading } from "@/redux/slices/loadingFullScreenSlice";
import { queryClient } from "@/lib/react-query-client";

export default function CategoryForm({ updateData = {}, loading, adminId }) {
  const dispatch = useDispatch();
  const initialImageUrl = updateData?.imageUrl ?? "";
  const id = updateData?.id ?? "";
  const [imageUrl, setImageUrl] = useState(initialImageUrl);
  if(loading){
    dispatch(isLoading(true));
  }
  const {
    register,
    reset,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ...updateData,
    },
  });

  const router = useRouter();
  const onSuccess = () => {
    queryClient.invalidateQueries(["categories"]);
    router.push("/dashboard/categories");
    router.refresh();
  };

  const onSubmit = async (data) => {
    const slug = generateSlug(data.title);
    data.slug = slug;
    data.imageUrl = imageUrl;
    data.adminId = adminId;
    // console.log(data);

    if (id) {
      makePutRequest(
        `api/admin/categories/${id}`,
        data,
        "หมู่หมวดหมู่",
        onSuccess,
        reset,
        dispatch
      );
    } else {
      makePostRequest(
        "api/admin/categories",
        data,
        "หมู่หมวดหมู่",
        onSuccess,
        reset,
        dispatch
      );
    }
    setImageUrl("");
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full p-4 border rounded-sm
      sm:p-6 md:p-8 mx-auto "
    >
      <div className="grid gap-2 sm:grid-cols-2 sm:gap-4">
        <TextInput
          label="ชื่อหมวดหมู่"
          name="title"
          register={register}
          errors={errors}
        />

        <TextAreaInput
          label="รายละเอียดหมวดหมู่"
          name="description"
          register={register}
          errors={errors}
        />
        <ImageInput
          label="ภาพหมวดหมู่"
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
          endpoint="categoryImageUploader"
          className="sm:col-span-2"
        />

        <div className="col-span-full flex justify-end">
          <SubmitButton buttonTitle={id ? "อัพเดตหมวดหมู่" : "สร้างหมวดหมู่"} />
        </div>
      </div>
    </form>
  );
}
