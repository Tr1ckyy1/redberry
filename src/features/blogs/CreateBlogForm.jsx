import { useRef } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

function CreateBlogForm() {
  const navigate = useNavigate();
  const inputRef = useRef();

  return (
    <div className="flex px-16 py-8">
      <div>
        <div
          onClick={() => navigate(-1)}
          className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-[#E4E3EB] duration-100 hover:bg-[#D9D8E0]"
        >
          <IoIosArrowBack className="text-2xl" />
        </div>
      </div>
      <form className="mx-auto w-[600px]">
        <h1 className="text-4xl  font-extrabold">ბლოგის დამატება</h1>
        <h1 className="mb-3 mt-10 font-bold">ატვირთეთ ფოტო</h1>
        <div className="h-[200px] rounded-xl border border-dashed border-[#85858D] bg-[#F4F3FF] p-10 duration-100 hover:bg-[#F1EFFB]">
          <div
            onClick={() => {
              // inputRef.current.click();
              console.log(inputRef);
            }}
            onDragOver={(e) => {
              e.preventDefault();
              // console.log(e);
            }}
            onDrop={(e) => {
              e.preventDefault();
              // console.log(e)
            }}
            className="flex flex-col items-center justify-center gap-8"
          >
            <div>
              <img src="../../../public/add-file.png" />
            </div>
            <input ref={inputRef} type="file" />
            <h1>
              ჩააგდეთ ფაილი აქ ან{" "}
              <span className="font-bold underline">აირჩიეთ ფაილი</span>
            </h1>
          </div>
          {/* <label>ატვირთეთ ფოტო</label>
          <input
          type="file"
          className="h-44 w-full rounded-xl border border-dashed border-[#85858D] bg-[#F4F3FF] p-4 focus:outline-none"
        /> */}
        </div>
        {/* After the image is uploaded, render this instead of the top one with file's text and gallery icon */}
        <div className="mt-4 h-14 w-full rounded-xl bg-[#F2F2FA]"></div>
      </form>
    </div>
  );
}

export default CreateBlogForm;
