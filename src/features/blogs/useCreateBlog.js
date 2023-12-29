import { useMutation } from "@tanstack/react-query";
import { createBlog as createBlogApi } from "../../services/apiBlogs";

function useCreateBlog() {
  const { mutate: createBlog } = useMutation({
    mutationFn: createBlogApi,
  });
  return { createBlog };
}

export default useCreateBlog;
