import { useSearchParams } from "react-router-dom";
import BlogsRow from "./BlogsRow";
import { useBlogs } from "./useBlogs";
import MiniSpinner from "../../ui/MiniSpinner";

function BlogsData() {
  const { blogs, isLoading } = useBlogs();
  const [searchParams] = useSearchParams();

  const currentDate = new Date();

  // Create a map to store category IDs and titles
  // const categoriesMap = new Map();
  // Assuming the parameters are like "id1=category1&id2=category2"
  // searchParams.forEach((value, key) => {
  //   if (key.startsWith("id")) {
  //     const categoryId = key.substring(2); // Extract category ID from parameter key
  //     categoriesMap.set(categoryId, value);
  //   }
  // });

  // const blogsToRender = categoriesMap.size > 0
  //   ? blogs
  //       ?.filter((blog) =>
  //         blog.categories.some(
  //           (category) =>
  //             categoriesMap.has(category.id.toString()) &&
  //             category.title.replaceAll(" ", "") ===
  //               categoriesMap.get(category.id.toString()),
  //         ),
  //       )
  //       .filter((blog) => {
  //         const publishDate = new Date(blog.publish_date);
  //         return publishDate <= currentDate;
  //       })
  //

  // better filtering - no forEach needed, no new map needed
  const filteredData = blogs?.filter((item) =>
    item.categories.some(
      (cat) =>
        cat.title.replaceAll(" ", "") === searchParams.get(`id${cat.id}`),
    ),
  );

  const blogsToRender =
    filteredData?.length > 0
      ? filteredData.filter((blog) => {
          const publishDate = new Date(blog.publish_date);
          return publishDate <= currentDate;
        })
      : // CHECK DATES ON FILTERED AND EVERY BLOG
        blogs?.filter((blog) => {
          const publishDate = new Date(blog.publish_date);
          return publishDate <= currentDate;
        });

  if (isLoading)
    return (
      <div className="mt-20 flex items-center justify-center">
        <MiniSpinner />
      </div>
    );
  return (
    <div className="grid grid-cols-3 gap-x-8 gap-y-16">
      {blogsToRender.map((blog) => (
        <BlogsRow key={blog.id} blog={blog} />
      ))}
    </div>
  );
}

export default BlogsData;
