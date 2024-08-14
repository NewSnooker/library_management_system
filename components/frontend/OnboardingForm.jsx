"use client";
import { getData } from "@/lib/getData";
import React, { useEffect, useState } from "react";
import TextInput from "../formInputs/TextInput";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import SelectInput from "../formInputs/SelectInput";
import { Button } from "../ui/button";
import ImageInput from "../formInputs/ImageInput";

export default function OnboardingForm({ id }) {
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

  const getUser = async () => {
    try {
      const userResponse = await getData(`users/${id}`);
      if (userResponse.status === 500) {
        console.error("ID ของคุณไม่ถูกต้อง");
        toast.error("ID ของคุณไม่ถูกต้อง");
        return;
      }
      reset({
        username: userResponse.username,
        email: userResponse.email,
      });
    } catch (error) {
      console.error("ID ของคุณไม่ถูกต้อง", error);
      toast.error("ID ของคุณไม่ถูกต้อง");
    }
  };

  const selectedEducationLevel = watch("educationLevel");
  const [imageUrl, setImageUrl] = useState("");
  useEffect(() => {
    if (selectedEducationLevel === "ปวช") {
      setAvailableYears(educationYear); // สามารถเลือกปี 1, 2, 3
    } else if (selectedEducationLevel === "ปวส") {
      setAvailableYears(educationYear.slice(0, 2)); // สามารถเลือกปี 1, 2
    } else if (selectedEducationLevel === "ป.ตรี") {
      setAvailableYears(educationYear.slice(0, 2)); // สามารถเลือกปี 1, 2
    }
  }, [selectedEducationLevel]);

  const onSubmit = (data) => {
    data.imageUrl = imageUrl;
    console.log(data); // ส่งข้อมูลที่กรอกในฟอร์ม
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-xl font-semibold mb-4">Basic information</h2>
      <div className="grid gap-2 sm:grid-cols-2 sm:gap-4">
        <TextInput
          label="ชื่อผู้ใช้"
          name="username"
          register={register}
          errors={errors}
          className="w-full"
        />
        <TextInput
          label="อีเมล"
          name="email"
          register={register}
          errors={errors}
          className="w-full"
        />
        <SelectInput
          label="คำนำหน้า"
          name="prefix"
          register={register}
          errors={errors}
          className="w-full"
          options={prefix}
        />
        <SelectInput
          label="ระดับการศึกษา"
          name="educationLevel"
          register={register}
          errors={errors}
          className="w-full"
          options={educationLevel}
        />
        <SelectInput
          label="ชั้นปี"
          name="educationYear"
          register={register}
          errors={errors}
          className="w-full"
          options={availableYears}
        />
        <TextInput
          label="ชื่อจริง"
          name="firstName"
          register={register}
          errors={errors}
          className="w-full"
        />
        <TextInput
          label="นามสกุล"
          name="lastName"
          register={register}
          errors={errors}
          className="w-full"
        />
        <TextInput
          label="รหัสนักศึกษา"
          name="codeNumber"
          type="number"
          register={register}
          errors={errors}
          className="w-full"
        />
        <TextInput
          label="เบอร์โทรศัพท์"
          name="phoneNumber"
          type="number"
          register={register}
          errors={errors}
          className="w-full"
        />
        <ImageInput
          label="test"
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
          endpoint="userProfileUploader"
        />
        
      </div>
      <Button type="submit" className="mt-4">
        ยืนยัน
      </Button>
    </form>
  );
}
