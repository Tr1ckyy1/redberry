import { useNavigate } from "react-router-dom";
import CreateBlogForm from "../features/blogs/CreateBlogForm";

function CreateBlog() {
  const navigate = useNavigate();
  return (
    <div>
      <header className="sticky top-0 flex justify-center border-b border-[#E4E3EB] bg-[#FFFFFF] px-14 py-6 text-sm">
        <img
          className="cursor-pointer object-none"
          src="../../public/redberry-logo.jpg"
          onClick={() => navigate("/")}
        />
      </header>
      <CreateBlogForm />
    </div>
  );
}

export default CreateBlog;
