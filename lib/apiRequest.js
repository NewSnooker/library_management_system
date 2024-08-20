import { isLoading } from "@/redux/slices/loadingFullScreenSlice";
import toast from "react-hot-toast";

export async function makePostRequest(
  setLoading,
  endpoint,
  data,
  resourceName,
  reset,
  redirect,
  dispatch
) {
  try {
    setLoading(true);
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
      toast.success(`สร้าง${resourceName} สําเร็จ`);
      reset();
      setLoading(false);
      dispatch(isLoading(false));
      redirect();
    }
    if (response.status === 404) {
      toast.error(responseData.message || "เกิดข้อผิดพลาด");
      setLoading(false);
      dispatch(isLoading(false));
    }
    if (response.status === 409) {
      toast.error(responseData.message || "เกิดข้อผิดพลาด");
      setLoading(false);
      dispatch(isLoading(false));
    }
  } catch (error) {
    toast.error("Something Went wrong");
    setLoading(false);
    dispatch(isLoading(false));
    console.error(error);
  }
}

export async function makePutRequest(
  setLoading,
  endpoint,
  data,
  resourceName,
  reset,
  redirect,
  dispatch
) {
  try {
    dispatch(isLoading(true));
    setLoading(true);
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
      toast.success(`สร้าง${resourceName} สําเร็จ`);
      reset();
      setLoading(false);
      redirect();
      dispatch(isLoading(false));
    }
    if (response.status === 404) {
      toast.error(responseData.message || "เกิดข้อผิดพลาด");
      setLoading(false);
      dispatch(isLoading(false));
    }
    if (response.status === 409) {
      toast.error(responseData.message || "เกิดข้อผิดพลาด");
      setLoading(false);
      dispatch(isLoading(false));
    }
  } catch (error) {
    toast.error("เกิดข้อผิดพลาด");
    setLoading(false);
    dispatch(isLoading(false));
    console.error(error);
  }
}
