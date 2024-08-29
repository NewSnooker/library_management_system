import { isLoading } from "@/redux/slices/loadingFullScreenSlice";
import toast from "react-hot-toast";

export async function makePostRequest(
  endpoint,
  data,
  resourceName,
  onSuccess,
  reset,
  dispatch
) {
  try {
    dispatch(isLoading(true));
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const response = await fetch(`${baseUrl}/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const responseData = await response.json();

    if (response.ok) {
      reset();
      onSuccess();
      toast.success(`สร้าง${resourceName}สําเร็จ`);
      dispatch(isLoading(false));
    }
    if (response.status === 400) {
      toast(responseData.message || "เกิดข้อผิดพลาด", {
        icon: '🫡',
      });
      dispatch(isLoading(false));

    }
    if (response.status === 404) {
      toast.error(responseData.message || "เกิดข้อผิดพลาด");
      dispatch(isLoading(false));
    }
    if (response.status === 409) {
      toast.error(responseData.message || "เกิดข้อผิดพลาด");
      dispatch(isLoading(false));
    }
  } catch (error) {
    toast.error("Something Went wrong");
    dispatch(isLoading(false));
    console.error(error);
  }
}
export async function makeDeleteRequest(
  endpoint,
  data,
  resourceName,
  onSuccess,
  reset,
  dispatch
) {
  try {
    dispatch(isLoading(true));
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const response = await fetch(`${baseUrl}/${endpoint}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const responseData = await response.json();

    if (response.ok) {
      reset();
      onSuccess();
      toast.success(`ลบ${resourceName}สําเร็จ`);
      dispatch(isLoading(false));
    }
    if (response.status === 400) {
      toast(responseData.message || "เกิดข้อผิดพลาด", {
        icon: '🫡',
      });
      dispatch(isLoading(false));

    }
    if (response.status === 404) {
      toast.error(responseData.message || "เกิดข้อผิดพลาด");
      dispatch(isLoading(false));
    }
    if (response.status === 409) {
      toast.error(responseData.message || "เกิดข้อผิดพลาด");
      dispatch(isLoading(false));
    }
  } catch (error) {
    toast.error("Something Went wrong");
    dispatch(isLoading(false));
    console.error(error);
  }
}

export async function makePutRequest(
  endpoint,
  data,
  resourceName,
  onSuccess,
  reset = () => {},
  dispatch
) {
  try {
    dispatch(isLoading(true));
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const response = await fetch(`${baseUrl}/${endpoint}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const responseData = await response.json();

    if (response.ok) {
      reset();
      onSuccess();
      toast.success(`อัพเดท${resourceName}สําเร็จ`);
      dispatch(isLoading(false));
    }
    if (response.status === 404) {
      toast.error(responseData.message || "เกิดข้อผิดพลาด");
      dispatch(isLoading(false));
    }
    if (response.status === 409) {
      toast.error(responseData.message || "เกิดข้อผิดพลาด");
      dispatch(isLoading(false));
    }
  } catch (error) {
    toast.error("เกิดข้อผิดพลาด");
    dispatch(isLoading(false));
    console.error(error);
  }
}
