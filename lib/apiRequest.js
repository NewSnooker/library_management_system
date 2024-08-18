import { isLoading } from "@/redux/slices/loadingFullScreenSlice";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

export async function makePostRequest(
  setLoading,
  endpoint,
  data,
  resourceName,
  reset,
  redirect
) {
  try {
    const dispatch = useDispatch();
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
      toast.success(`New ${resourceName} Created Successfully`);
      reset();
      setLoading(false);
      dispatch(isLoading(false));
      redirect();
    }
    if (response.status === 404) {
      toast.error(responseData.message || "Something Went wrong");
      setLoading(false);
      dispatch(isLoading(false));
    }
    if (response.status === 409) {
      toast.error(responseData.message || "Something Went wrong");
      setLoading(false);
      dispatch(isLoading(false));
    }
  } catch (error) {
    toast.error("Something Went wrong");
    setLoading(false);
    dispatch(isLoading(false));
    console.log(error);
  }
}

export async function makePutRequest(
  setLoading,
  endpoint,
  data,
  resourceName,
  reset,
  redirect
) {
  try {
    const dispatch = useDispatch();
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
      toast.success(`${resourceName} Updated Successfully`);
      reset();
      setLoading(false);
      dispatch(isLoading(false));
      redirect();
    }
    if (response.status === 404) {
      toast.error(responseData.message || "Something Went wrong");
      setLoading(false);
      dispatch(isLoading(false));
    }
    if (response.status === 409) {
      toast.error(responseData.message || "Something Went wrong");
      setLoading(false);
      dispatch(isLoading(false));
    } else {
      toast.error("Something Went wrong");
      setLoading(false);
      dispatch(isLoading(false));
    }
  } catch (error) {
    setLoading(false);
    dispatch(isLoading(false));
    console.log(error);
  }
}
