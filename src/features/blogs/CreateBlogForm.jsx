import { useRef } from "react";
import { useForm } from "react-hook-form";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { PiDotOutlineFill } from "react-icons/pi";

function CreateBlogForm() {
  const navigate = useNavigate();

  const { register, handleSubmit, formState, getValues } = useForm();
  const { ref } = register("image");
  const imageRef = useRef(null);

  return (
    <div className="flex px-16 py-8">
      <div
        onClick={() => navigate(-1)}
        className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-[#E4E3EB] duration-100 hover:bg-[#D9D8E0]"
      >
        <IoIosArrowBack className="text-2xl" />
      </div>
      <form
        onSubmit={handleSubmit(
          (data) => ref,
          (err) => console.log(err),
        )}
        className="mx-auto flex w-[600px] flex-col gap-10"
      >
        <div>
          <h1 className="text-4xl  font-extrabold">ბლოგის დამატება</h1>
          <h1 className="mb-3 mt-10 font-bold">ატვირთეთ ფოტო</h1>
          <div className="h-[200px] rounded-xl border border-dashed border-[#85858D] bg-[#F4F3FF] p-10 duration-100 hover:bg-[#F1EFFB]">
            <div
              onClick={() => {
                imageRef.current.click();
                // console.log(inputRef);
              }}
              className="flex flex-col items-center justify-center gap-8"
            >
              <div>
                <img src="../../../public/add-file.png" />
              </div>
              <input
                hidden
                {...register("image")}
                accept="image/*"
                type="file"
                ref={(e) => {
                  ref(e);
                  imageRef.current = e; // you can still assign to ref
                }}
              />
              <h1>
                ჩააგდეთ ფაილი აქ ან{" "}
                <span className="font-bold underline">აირჩიეთ ფაილი</span>
              </h1>
            </div>
          </div>
        </div>
        <div className="flex gap-10">
          <div className="flex w-1/2 flex-col gap-3">
            <h1 htmlFor="author" className="font-bold">
              ავტორი *
            </h1>
            <input
              type="text"
              className="placeholer:text-[#E4E3EB] rounded-xl border bg-[#FCFCFD] px-4 py-2 outline-none"
              placeholder="შეიყვანეთ ავტორი"
            />
            <div className="flex text-sm text-[#85858D]">
              <PiDotOutlineFill />
              <p>მინიმუმ 4 სიმბოლო</p>
            </div>
            <div className="flex text-sm text-[#85858D]">
              <PiDotOutlineFill />
              <p>მინიმუმ ორი სიტყვა</p>
            </div>{" "}
            <div className="flex text-sm text-[#85858D]">
              <PiDotOutlineFill />
              <p>მხოლოდ ქართული სიმბოლოები</p>
            </div>
          </div>
          <div className="flex w-1/2 flex-col gap-3">
            <h1 htmlFor="title" className="font-bold">
              სათაური *
            </h1>
            <input
              type="text"
              className="placeholer:text-[#E4E3EB] rounded-xl border bg-[#FCFCFD] px-4 py-2 outline-none"
              placeholder="შეიყვანეთ სათაური"
            />
            <p className="text-sm text-[#85858D]">მინიმუმ 2 სიმბოლო</p>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <h1 htmlFor="author" className="font-bold">
            აღწერა *
          </h1>
          <textarea
            type="text"
            className="placeholer:text-[#E4E3EB] h-[124px] resize-none rounded-xl border bg-[#FCFCFD] px-4 py-2 outline-none"
            placeholder="შეიყვანეთ აღწერა"
          />
          <p className="text-sm text-[#85858D]">მინიმუმ 2 სიმბოლო</p>
        </div>
        <div className="flex gap-6">
          <div className="flex w-1/2 flex-col gap-3">
            <h1 htmlFor="author" className="font-bold">
              გამოქვეყნების თარიღი *
            </h1>
            <input
              type="date"
              className="placeholer:text-[#E4E3EB] rounded-xl border bg-[#FCFCFD] px-4 py-2 outline-none"
            />
          </div>
          <div className="flex w-1/2 flex-col gap-3">
            <h1 htmlFor="title" className="font-bold">
              კატეგორია *
            </h1>
            <input
              type="text"
              className="placeholer:text-[#E4E3EB] rounded-xl border bg-[#FCFCFD] px-4 py-2 outline-none"
              placeholder="შეიყვანეთ სათაური"
            />
          </div>
        </div>
        <div className="flex w-1/2 flex-col gap-3">
          <h1 htmlFor="title" className="font-bold">
            ელ-ფოსტა
          </h1>
          <input
            type="text"
            className="placeholer:text-[#E4E3EB] w-[288px] rounded-xl border bg-[#FCFCFD] px-4 py-2 outline-none"
            placeholder="Example@redberry.ge"
          />
        </div>
        {/* After the image is uploaded, render this instead of the top one with file's text and gallery icon */}
        {/* <div className="mt-4 h-14 w-full rounded-xl bg-[#F2F2FA]"></div> */}
        <button
          className="ml-auto w-[288px] rounded-lg bg-[#E4E3EB] px-5 py-2.5 text-white"
          type="submit"
        >
          გამოქვეყნება
        </button>
      </form>
    </div>
  );
}

export default CreateBlogForm;
