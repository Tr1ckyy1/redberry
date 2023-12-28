import BlogsData from "../features/blogs/BlogsData";
import Categories from "../features/categories/Categories";
import image from "../../public/blog-logo.jpg";

function Dashboard() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-6xl font-bold">ბლოგი</h1>
        <img src={image} />
      </div>
      <Categories />
      <BlogsData />
    </div>
  );
}

export default Dashboard;
