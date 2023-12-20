import Spinner from "../../ui/Spinner";
import { useBlogs } from "./useBlogs";

function BlogsData() {
  const { blogs, isLoading } = useBlogs();

  // console.log(blogs);

  if (isLoading) return <Spinner />;
  return <div>s</div>;
}

export default BlogsData;
