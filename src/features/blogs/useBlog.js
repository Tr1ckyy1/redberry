import { useQuery } from "@tanstack/react-query";
import { getBlog } from "../../services/apiBlogs";
import { useParams } from "react-router-dom";

export function useBlog() {
  const { blogId } = useParams();
  const { data: blog, isLoading } = useQuery({
    queryKey: ["blog", blogId],
    queryFn: () => getBlog(blogId),
  });

  return { blog, isLoading };
}
