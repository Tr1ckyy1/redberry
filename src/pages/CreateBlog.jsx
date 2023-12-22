import CreateBlogForm from "../features/blogs/CreateBlogForm";

function CreateBlog() {
  return (
    <div>
      <header className="sticky top-0 flex justify-center border-b border-[#E4E3EB] bg-[#FFFFFF] px-14 py-6 text-sm">
        <img
          className="cursor-pointer object-none"
          src="../../public/redberry-logo.jpg"
          onClick={() =>
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
          }
        />
      </header>
      <CreateBlogForm/>
    </div>
  );
}

export default CreateBlog;
