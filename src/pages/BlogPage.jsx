import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import SingleBlogPage from "../features/blogs/SingleBlogPage";
import { useBlog } from "../features/blogs/useBlog";
import { useBlogs } from "../features/blogs/useBlogs";
import { MdArrowOutward } from "react-icons/md";
import { useState } from "react";

function BlogPage() {
  const [startIndex, setStartIndex] = useState(0);
  const BLOGS_PER_PAGE = 3;

  const navigate = useNavigate();

  const { blog, isLoading } = useBlog();
  const { blogs } = useBlogs();

  const currentDate = new Date();

  // Extract categories from the current blog
  const categories = blog?.categories.map((category) => category.title);
  // Filter blogs that have at least one category in common with the current blog
  const similarBlogs = blogs
    ?.filter((single) =>
      single.categories.some((category) =>
        categories?.includes(category.title),
      ),
    )
    .filter((similarBlog) => similarBlog.id !== blog.id)
    .filter((blog) => {
      const publishDate = new Date(blog.publish_date);
      return publishDate <= currentDate;
    });

  function slideRight() {
    if (startIndex + BLOGS_PER_PAGE < similarBlogs.length) {
      setStartIndex((oldIndex) => oldIndex + 1);
    }
  }

  function slideLeft() {
    if (startIndex > 0) {
      setStartIndex((oldIndex) => oldIndex - 1);
    }
  }

  return (
    <>
      <div className="flex">
        <div
          onClick={() => navigate(-1)}
          className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-[#E4E3EB] duration-100 hover:bg-[#D9D8E0]"
        >
          <IoIosArrowBack className="text-2xl" />
        </div>

        <div className="ml-[25%] w-1/2 gap-10">
          <SingleBlogPage blog={blog} isLoading={isLoading} />
        </div>
      </div>

      {similarBlogs && similarBlogs.length > 0 && (
        <>
          <div className="mt-20 flex items-center justify-between">
            <h1 className="text-2xl font-bold">მსგავსი სტატიები</h1>
            <div className="space-x-6">
              <button
                onClick={slideLeft}
                disabled={startIndex === 0}
                className={`rounded-full bg-[#5D37F3] p-4 text-2xl text-white duration-100 ${
                  startIndex === 0
                    ? "cursor-not-allowed"
                    : "hover:brightness-90"
                } disabled:bg-[#E4E3EB]`}
              >
                <IoIosArrowBack />
              </button>
              <button
                disabled={startIndex + BLOGS_PER_PAGE >= similarBlogs.length}
                onClick={slideRight}
                className={`rounded-full bg-[#5D37F3] p-4 text-2xl text-white duration-100 ${
                  startIndex + BLOGS_PER_PAGE >= similarBlogs.length
                    ? "cursor-not-allowed"
                    : "hover:brightness-90"
                } disabled:bg-[#E4E3EB]`}
              >
                <IoIosArrowForward />
              </button>
            </div>
          </div>
          <div className="mt-10 flex gap-4 overflow-x-hidden">
            {similarBlogs
              ?.slice(startIndex, startIndex + BLOGS_PER_PAGE)
              .map((similarBlog) => (
                <div key={similarBlog.id} className="w-1/3 space-y-2">
                  <h1 className="w-full flex-grow">{similarBlog.title}</h1>
                  <img
                    src={similarBlog.image}
                    className="h-[328px] w-full rounded-xl object-cover"
                  />
                  <div className="space-y-1 text-sm">
                    <p className="font-bold">{similarBlog.author}</p>
                    <p className="text-[#85858D]">
                      {similarBlog.publish_date.replaceAll("-", ".")}
                    </p>
                  </div>
                  <h1 className="font-bold">{similarBlog.title}</h1>
                  <ul className="flex flex-wrap gap-x-4 gap-y-2">
                    {similarBlog.categories.map((category) => (
                      <li
                        key={category.id}
                        style={{
                          color: category.text_color,
                          background: category.background_color,
                        }}
                        className={`whitespace-nowrap rounded-full border-none px-2.5 py-1.5 outline-none duration-100`}
                      >
                        {category.title}
                      </li>
                    ))}
                  </ul>
                  <p>
                    {similarBlog.description.length > 80
                      ? `${similarBlog.description.substring(0, 80)}...`
                      : similarBlog.description}
                  </p>
                  <Link
                    to={`/blogs/${similarBlog.id}`}
                    className="flex items-center gap-2 font-bold text-[#5D37F3] duration-100 hover:opacity-90"
                  >
                    სრულად ნახვა
                    <span>
                      <MdArrowOutward />
                    </span>
                  </Link>
                </div>
              ))}
          </div>
        </>
      )}
    </>
  );
}

export default BlogPage;
