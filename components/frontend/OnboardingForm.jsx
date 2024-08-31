"use client";
import { getData } from "@/lib/getData";
import React, { useEffect, useState } from "react";
import TextInput from "../formInputs/TextInput";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import SelectInput from "../formInputs/SelectInput";
import { Button } from "../ui/button";
import { makePutRequest } from "@/lib/apiRequest";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { isLoading } from "@/redux/slices/loadingFullScreenSlice";

export default function OnboardingForm({ id }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const prefix = [
    { id: "นาย", title: "นาย" },
    { id: "นาง", title: "นาง" },
    { id: "นางสาว", title: "นางสาว" },
  ];
  const educationLevel = [
    { id: "ปวช", title: "ปวช" },
    { id: "ปวส", title: "ปวส" },
    { id: "ป.ตรี", title: "ป.ตรี" },
  ];
  const educationYear = [
    { id: "1", title: "1" },
    { id: "2", title: "2" },
    { id: "3", title: "3" },
  ];

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const [availableYears, setAvailableYears] = useState(educationYear);

  useEffect(() => {
    getUser();
  }, []);

  const onSuccess = () => {
    router.replace("/login");
    router.refresh();
  };

  const getUser = async () => {
    try {
      dispatch(isLoading(true));
      const userResponse = await getData(`users/${id}`);
      if (userResponse.status === 500) {
        console.error("ID ของคุณไม่ถูกต้อง");
        toast.error("ID ของคุณไม่ถูกต้อง");
        dispatch(isLoading(false));
        return;
      }
      reset({
        username: userResponse.username,
        emailAddress: userResponse.email,
      });
      dispatch(isLoading(false));
    } catch (error) {
      dispatch(isLoading(false));
      console.error("ID ของคุณไม่ถูกต้อง", error);
      toast.error("ID ของคุณไม่ถูกต้อง");
    }
  };

  const selectedEducationLevel = watch("educationLevel");
  useEffect(() => {
    if (selectedEducationLevel === "ปวช") {
      setAvailableYears(educationYear); // สามารถเลือกปี 1, 2, 3
    } else if (selectedEducationLevel === "ปวส") {
      setAvailableYears(educationYear.slice(0, 2)); // สามารถเลือกปี 1, 2
    } else if (selectedEducationLevel === "ป.ตรี") {
      setAvailableYears(educationYear.slice(0, 2)); // สามารถเลือกปี 1, 2
    }
  }, [selectedEducationLevel]);

  const onSubmit = async (data) => {
    data.userId = id;
    makePutRequest(
      "api/users/user-profile",
      data,
      "โปรไฟล์",
      onSuccess,
      reset,
      dispatch
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-2 sm:gap-x-10 sm:gap-y-4">
        <TextInput
          label="ชื่อผู้ใช้"
          name="username"
          register={register}
          errors={errors}
          className="w-full"
        />
        <TextInput
          label="อีเมล"
          name="emailAddress"
          register={register}
          errors={errors}
          className="w-full"
        />
        <div className="flex gap-2">
          <SelectInput
            label="คำนำ"
            name="prefix"
            register={register}
            errors={errors}
            className="20"
            options={prefix}
          />
          <TextInput
            label="ชื่อ นามสกุล"
            name="fullName"
            register={register}
            errors={errors}
            className="w-full"
          />
        </div>
        <div className="flex gap-2">
          <div className="flex gap-3 sm:gap-2">
            <SelectInput
              label="ระดับ"
              name="educationLevel"
              register={register}
              errors={errors}
              className="w-9"
              options={educationLevel}
            />
            <SelectInput
              label="ชั้นปี"
              name="educationYear"
              register={register}
              errors={errors}
              className="w-16"
              options={availableYears}
            />
          </div>

          <TextInput
            label="รหัสนักศึกษา"
            name="codeNumber"
            type="number"
            register={register}
            errors={errors}
            className="w-full"
          />
        </div>

        <TextInput
          label="เบอร์โทรศัพท์"
          name="phoneNumber"
          type="number"
          register={register}
          errors={errors}
          className="w-full"
        />
      </div>
      <div className="flex justify-end mt-4">
        <Button type="submit" className="">
          ยืนยัน
        </Button>
      </div>
    </form>
  );
}
