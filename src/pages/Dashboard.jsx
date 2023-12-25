import BlogsData from "../features/blogs/BlogsData";
import Categories from "../features/categories/Categories";

function Dashboard() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-6xl font-bold">ბლოგი</h1>
        <img src="../../public/blog-logo.jpg" />
      </div>
      <Categories />
      <BlogsData />
    </div>
  );
}

export default Dashboard;
