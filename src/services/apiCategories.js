import { API } from "../data";

export async function getCategories() {
  const res = await fetch(`${API}/categories`);
  if (!res.ok) throw new Error("Failed fetching categories");
  const data = await res.json();
  return data.data;
}
