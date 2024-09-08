import { BASE_URL } from "@/constants";

export const getAllPlaces = async () => {
  const res = await fetch(`${BASE_URL}/api/admin/place`);
  return res.json();
};
