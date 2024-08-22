"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Button } from "../ui/button";
import SelectInput from "../formInputs/SelectInput";
import TextInput from "../formInputs/TextInput";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { isLoading } from "@/redux/slices/loadingFullScreenSlice";
import { getData } from "@/lib/getData";
import { makePutRequest } from "@/lib/apiRequest";

// Fetch user data
const fetchUser = async (id) => {
  const userResponse = await getData(`users/${id}`);
  if (userResponse.status === 500) {
    throw new Error("ID ของคุณไม่ถูกต้อง");
  }
  return userResponse;
};

export default function OnboardingForm({ id }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const [availableYears, setAvailableYears] = useState([]);

  // Query to fetch user data
  const {
    data: user,
    isLoading: userLoading,
    error: userError,
  } = useQuery({
    queryKey: ["user", id],
    queryFn: () => fetchUser(id),
    onSuccess: (data) => {
      reset({
        username: data.username,
        emailAddress: data.email,
      });
    },
    onError: (error) => {
      dispatch(isLoading(false));
      toast.error(error.message || "ID ของคุณไม่ถูกต้อง");
    },
  });

  // Mutation to update user data
  const mutation = useMutation({
    mutationFn: (data) => {
      return makePutRequest(data, "api/users/user-profile", "User Profile");
    },
    onSuccess: () => {
      toast.success("Profile updated successfully");
      router.replace("/login");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update profile");
    },
  });

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

  const selectedEducationLevel = watch("educationLevel");

  useEffect(() => {
    if (selectedEducationLevel === "ปวช") {
      setAvailableYears(educationYear);
    } else if (
      selectedEducationLevel === "ปวส" ||
      selectedEducationLevel === "ป.ตรี"
    ) {
      setAvailableYears(educationYear.slice(0, 2));
    }
  }, [selectedEducationLevel]);

  const onSubmit = (data) => {
    data.userId = id;
    mutation.mutate(data);
  };

  if (userLoading) {
    return <div>Loading user data...</div>;
  }

  if (userError) {
    return <div>Error: {userError.message}</div>;
  }

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
            label="คำนำหน้า"
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
        {mutation.isLoading ? (
          <Button type="button" disabled className="btn btn-active">
            <svg
              aria-hidden="true"
              role="status"
              className="inline w-4 h-4 mr-3 text-background animate-spin"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="#E5E7EB"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentColor"
              />
            </svg>{" "}
            กำลังดำเนินการ
          </Button>
        ) : (
          <Button type="submit">ยืนยัน</Button>
        )}
      </div>
    </form>
  );
}
