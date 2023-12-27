import { useMutation } from "@tanstack/react-query";
import { createBlog as createBlogApi } from "../../services/apiBlogs";

function useCreateBlog() {
  const { mutate: createBlog, isLoading } = useMutation({
    mutationFn: createBlogApi,
  });
  return { createBlog, isLoading };
}

export default useCreateBlog;
