"use client";
import ImageInput from "@/components/FormInputs/ImageInput";
import SelectInput from "@/components/FormInputs/SelectInput";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import TextAreaInput from "@/components/FormInputs/TextArealInput";
import TextInput from "@/components/FormInputs/TextInput";
import ToggleInput from "@/components/FormInputs/ToggleInput";
import { makePostRequest, makePutRequest } from "@/lib/apiRequest";
import { generateSlug } from "@/lib/generateSlug";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const QuillEditor = dynamic(
  () => import("@/components/FormInputs/QuillEditor"),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }
);

export default function BookForm({ categories, updateData = {} }) {
  const id = updateData?.id ?? "";
  const initialImageUrl = updateData?.imageUrl ?? "";
  const initialContent = updateData?.content ?? "";

  const [imageUrl, setImageUrl] = useState(initialImageUrl);
  const [content, setContent] = useState(initialContent);
  const [loading, setLoading] = useState(false);

  const {
    register,
    reset,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      isActive: true,
      ...updateData,
    },
  });

  const isActive = watch("isActive");
  const router = useRouter();
  const redirect = () => {
    router.push("/dashboard/community");
    router.refresh();
  };

  const onSubmit = async (data) => {
    setLoading(true);
    const slug = generateSlug(data.title);
    data.slug = slug;
    data.imageUrl = imageUrl;
    data.content = content;

    if (id) {
      makePutRequest(
        setLoading,
        `api/trainings/${id}`,
        data,
        "Training",
        reset,
        redirect
      );
    } else {
      makePostRequest(
        setLoading,
        "api/trainings",
        data,
        "Training",
        reset,
        redirect
      );
      setImageUrl("");
      setContent("");
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-4xl p-4 bg-white border rounded-lg shadow-md
        sm:p-6 md:p-8 dark:bg-slate-700  mx-auto "
    >
      <div className="grid gap-2 sm:grid-cols-2 sm:gap-4">
        <TextInput
          label="Training Title"
          name="title"
          register={register}
          errors={errors}
          className="w-full"
        />
        <SelectInput
          label="Select Category"
          name="categoryId"
          register={register}
          errors={errors}
          className="w-full"
          options={categories}
          multiple={false}
        />
        <TextAreaInput
          label="Training Description"
          name="description"
          register={register}
          errors={errors}
        />
        <ImageInput
          label="Training thumbnail"
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
          endpoint="trainingImageUploader"
        />
        {/* Content */}
        <QuillEditor
          label="Training Content"
          value={content}
          onChange={setContent}
        />
        {/* Content End */}

        <ToggleInput
          label="Training Status"
          name="isActive"
          trueTitle="Active"
          falseTitle="Draft"
          register={register}
        />

        <SubmitButton
          isLoading={loading}
          buttonTitle={id ? "Update Training" : "Create Training"}
          LoadingButtonTitle={
            id ? "Update Training please wait..." : "Create Training please wait..."
          }
        />
      </div>
    </form>
  );
}
