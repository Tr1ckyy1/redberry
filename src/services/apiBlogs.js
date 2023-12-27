import { TOKEN, API } from "../data";

export async function getBlog(id) {
  const res = await fetch(`${API}/blogs/${id}`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
  if (!res.ok) throw new Error("Failed fetching blog");
  const data = await res.json();
  return data;
}

export async function getBlogs() {
  const res = await fetch(`${API}/blogs`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
  if (!res.ok) throw new Error("Failed fetching blogs");
  const { data } = await res.json();
  return data;
}

export async function createBlog(obj) {
  const formData = new FormData();
  formData.append("title", obj.title);
  formData.append("description", obj.description);
  formData.append("image", obj.image);
  formData.append("author", obj.author);
  formData.append("publish_date", obj.publish_date);
  formData.append("categories", obj.categories);
  formData.append("email", obj.email);

  const res = await fetch(`${API}/blogs`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      accept: "application/json",
    },
    body: formData,
  });

  if (!res.ok) throw new Error("Failed creating new blog");
}
