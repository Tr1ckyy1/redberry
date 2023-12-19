export async function getBlogs() {
  const res = await fetch("https://api.blog.redberryinternship.ge/api/blogs");
  if (!res.ok) throw new Error("Failed fetching data");
  const data = await res.json();
  return data;
}
