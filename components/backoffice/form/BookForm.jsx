"use client";
import MultipleImageInput from "@/components/formInputs/MultipleImageInput";
import SelectInput from "@/components/formInputs/SelectInput";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import TextAreaInput from "@/components/FormInputs/TextArealInput";
import TextInput from "@/components/FormInputs/TextInput";
import { makePostRequest, makePutRequest } from "@/lib/apiRequest";
import { generateSlug } from "@/lib/generateSlug";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

export default function BookForm({
  updateData = {},
  categories,
  setLoading,
  loading,
  adminId,
}) {
  const dispatch = useDispatch();
  const initialImageUrls = updateData?.imageUrls ?? "";
  const id = updateData?.id ?? "";
  const [imageUrls, setImageUrls] = useState(initialImageUrls);
  
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
    router.push("/dashboard/books");
    router.refresh();
  };

  const onSubmit = async (data) => {
    setLoading(true);
    if (imageUrls === undefined || imageUrls.length === 0) {
      toast.error("กรุณาเลือกรูปภาพ");
      setLoading(false);
      return;
    };

    const slug = generateSlug(data.title);
    data.slug = slug;
    data.imageUrls = imageUrls;
    data.adminId = adminId;

    if (id) {
      makePutRequest(
        setLoading,
        `api/admin/books/${id}`,
        data,
        "หนังสือ",
        reset,
        redirect,
        dispatch
      );
    } else {
      makePostRequest(
        setLoading,
        "api/admin/books",
        data,
        "หนังสือ",
        reset,
        redirect,
        dispatch
      );
    }

    setImageUrls("");
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full p-4 border rounded-sm
      sm:p-6 md:p-8 mx-auto "
    >
      <div className="grid gap-2 sm:grid-cols-2 sm:gap-4">
        <TextInput
          label="ชื่อหนังสือ"
          name="title"
          register={register}
          errors={errors}
        />
        <div className="grid gap-2 grid-cols-2">
          {" "}
          <TextInput
            label="ราคาหนังสือ"
            name="price"
            type="number"
            className=""
            register={register}
            errors={errors}
          />
          <TextInput
            label="จำนวนหนังสือ"
            name="quantity"
            type="number"
            register={register}
            errors={errors}
          />
        </div>
        <TextInput
          label="ชื่อผู้แต่ง"
          name="author"
          register={register}
          errors={errors}
        />
        <SelectInput
          label="หมวดหมู่"
          name="categoryId"
          register={register}
          errors={errors}
          className="w-1/2"
          options={categories}
        />

        <TextAreaInput
          label="รายละเอียดหนังสือ"
          name="description"
          className="sm:col-span-2"
          register={register}
          errors={errors}
        />
        <MultipleImageInput
          label="ภาพหมวดหมู่"
          imageUrls={imageUrls}
          setImageUrls={setImageUrls}
          endpoint="bookImageUploader"
          className="sm:col-span-2"
        />

        <div className="col-span-full flex justify-end">
          <SubmitButton
            isLoading={loading}
            buttonTitle={id ? "อัพเดตหนังสือ" : "เพิ่มหนังสือ"}
            LoadingButtonTitle={
              id ? "กำลังอัพเดตหนังสือ" : "กำลังเพิ่มหนังสือ"
            }
          />
        </div>
      </div>
    </form>
  );
}
