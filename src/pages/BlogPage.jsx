import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

function BlogPage() {
  const navigate = useNavigate();

  return (
    <div className="flex">
      <div
        onClick={() => navigate(-1)}
        className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-[#E4E3EB] duration-100 hover:bg-[#D9D8E0]"
      >
        <IoIosArrowBack className="text-2xl" />
      </div>

      <div
        // onSubmit={handleSubmit(onSubmit, onError)}
        className="ml-[25%] w-1/2 gap-10 bg-red-200"
      >
        <img src="" className="h-[328px]" />
      </div>
    </div>
  );
}

export default BlogPage;
