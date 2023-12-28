import { useNavigate } from "react-router-dom";
import CreateBlogForm from "../features/blogs/CreateBlogForm";
import logo from "../../public/redberry-logo.jpg";

function CreateBlog() {
  const navigate = useNavigate();
  return (
    <div>
      <header className="sticky top-0 z-10 flex justify-center border-b border-[#E4E3EB] bg-[#FFFFFF] px-14 py-6 text-sm">
        <img
          className="cursor-pointer object-none"
          src={logo}
          onClick={() => navigate("/")}
        />
      </header>
      <CreateBlogForm />
    </div>
  );
}

export default CreateBlog;
