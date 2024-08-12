import toast from "react-hot-toast";

export async function makePostRequest(
  setLoading,
  endpoint,
  data,
  resourceName,
  reset,
  redirect
) {
  try {
    setLoading(true);
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
      redirect()
    }
    if (response.status === 404) {
      toast.error(responseData.message || "Something Went wrong");
      setLoading(false);
    } 
    if (response.status === 409) {
      toast.error(responseData.message || "Something Went wrong");
      setLoading(false);
    } 

  } catch (error) {
    toast.error("Something Went wrong");
    setLoading(false);
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
    setLoading(true);
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const response = await fetch(`${baseUrl}/${endpoint}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      toast.success(`${resourceName} Updated Successfully`);
      reset();
      setLoading(false);
      redirect()
    } else {
      toast.error("Something Went wrong");
      setLoading(false);
    }
  } catch (error) {
    setLoading(false);
    console.log(error);
  }
}
