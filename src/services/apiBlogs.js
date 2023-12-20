import { TOKEN, API } from "../data";

export async function getBlogs() {
  const res = await fetch(`"${API}/blogs"`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
  if (!res.ok) throw new Error("Failed fetching data");
  const { data } = await res.json();
  return data;
}

// export async function getBlog(){

// }

export async function createBlog() {
  const res = await fetch(`${API}/blogs`, {
    headers: {
      method: "POST",
      Authorization: `Bearer ${TOKEN}`,
    },
  });
  if (!res.ok) throw new Error("Failed fetching data");
  const { data } = await res.json();
  return data;
}
