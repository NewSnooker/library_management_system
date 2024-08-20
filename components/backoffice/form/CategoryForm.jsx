"use client";
import ImageInput from "@/components/FormInputs/ImageInput";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import TextAreaInput from "@/components/FormInputs/TextArealInput";
import TextInput from "@/components/FormInputs/TextInput";
import ToggleInput from "@/components/FormInputs/ToggleInput";
import { makePostRequest, makePutRequest } from "@/lib/apiRequest";
import { generateSlug } from "@/lib/generateSlug";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

export default function CategoryForm({ updateData = {}, adminId }) {
  const dispatch = useDispatch();
  const initialImageUrl = updateData?.imageUrl ?? "";
  const id = updateData?.id ?? "";

  const [imageUrl, setImageUrl] = useState(initialImageUrl);
  const [loading, setLoading] = useState(false);

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
  const redirect = () => {
    router.push("/dashboard/categories");
    router.refresh();
  };

  const onSubmit = async (data) => {
    setLoading(true);
    const slug = generateSlug(data.title);
    data.slug = slug;
    data.imageUrl = imageUrl;
    data.adminId = adminId;
    // console.log(data);

    if (id) {
      makePutRequest(
        setLoading,
        `api/admin/categories/${id}`,
        data,
        "หมู่หมวดหมู่",
        reset,
        redirect,
        dispatch
      );
    } else {
      makePostRequest(
        setLoading,
        "api/admin/categories",
        data,
        "หมู่หมวดหมู่",
        reset,
        redirect,
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
          <SubmitButton
            isLoading={loading}
            buttonTitle={id ? "อัพเดตหมวดหมู่" : "สร้างหมวดหมู่"}
            LoadingButtonTitle={
              id ? "กำลังอัพเดตหมวดหมู่" : "กำลังสร้างหมวดหมู่"
            }
          />
        </div>
      </div>
    </form>
  );
}
