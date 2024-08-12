export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export async function getData(endpoint) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const response = await fetch(`${baseUrl}/api/${endpoint}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${endpoint}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    console.error(`Error fetching ${endpoint}:`, error);
    throw error; // re-throw the error after logging it
  }
}