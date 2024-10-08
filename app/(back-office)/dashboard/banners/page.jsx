"use client";
import PageHeaderNoAdd from "@/components/backoffice/PageHeaderNoAdd";
import MultipleImageInput from "@/components/formInputs/MultipleImageInput";
import SubmitButton from "@/components/formInputs/SubmitButton";
import { Skeleton } from "@/components/ui/skeleton";
import { makePostRequest, makePutRequest } from "@/lib/apiRequest";
import { getData } from "@/lib/getData";
import { queryClient } from "@/lib/react-query-client";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

export default function page() {
  const { data: session } = useSession();
  const adminId = session?.user?.id;
  const {
    data: banners,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["banners"],
    queryFn: () => getData("all/banners"),
  });

  const [imageUrls, setImageUrls] = useState();
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (banners) {
      setImageUrls(banners.imageUrls);
    }
  }, [banners]);

  const {
    register,
    reset,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  if (isLoading)
    return (
      <div className="w-full mb-4 border bg-card rounded-sm">
        <Skeleton className="w-full h-96 mb-2 " />
      </div>
    );
  if (error) return <div>{error.message}</div>;
  const onSuccess = () => {
    queryClient.invalidateQueries(["banners"]);
    router.push("/home");
    router.refresh();
  };

  const onSubmit = async (data) => {
    data.imageUrls = imageUrls;
    data.adminId = adminId;
    data.id = banners?.id;

    if (banners) {
      makePutRequest(
        `api/admin/banners`,
        data,
        "แบนเนอร์",
        onSuccess,
        reset,
        dispatch
      );
    } else {
      makePostRequest(
        "api/admin/banners",
        data,
        "แบนเนอร์",
        onSuccess,
        reset,
        dispatch
      );
    }
    setImageUrls("");
  };

  return (
    <div>
      {/* Header */}
      <PageHeaderNoAdd loading={false} heading="ตั้งค่าแบนเนอร์" />
      <div className="py-2">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full p-4 border rounded-sm
          sm:p-6 md:p-8 mx-auto "
        >
          <MultipleImageInput
            label="ภาพแบนเนอร์"
            imageUrls={imageUrls}
            setImageUrls={setImageUrls}
            endpoint="bannerImageUploader"
            className=""
          />
          <div className="col-span-full flex justify-end mt-3">
            <SubmitButton
              buttonTitle={banners ? "อัพเดตแบนเนอร์" : "เพิ่มแบนเนอร์"}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
