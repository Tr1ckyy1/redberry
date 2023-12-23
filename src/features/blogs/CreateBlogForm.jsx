import { useForm } from "react-hook-form";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { PiDotOutlineFill } from "react-icons/pi";
import { useRef } from "react";

const MAX_NUM_CHARACTERS = 50;

function CreateBlogForm() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    watch,
  } = useForm({
    mode: "onChange",
  });
  const imageRef = useRef(null);
  const { ref, ...rest } = register("image", {
    required: "სურათი სავალდებულოა",
    validate: (value) =>
      value[0]?.type?.startsWith("image") || "ფაილი უნდა იყოს სურათი",
  });

  function onSubmit(data) {
    console.log(getValues().image[0].name.split("."));
  }

  function onError(err) {
    // console.log(getValues().image[0].name.split("."));
  }

  return (
    <div className="flex px-16 py-8">
      <div
        onClick={() => navigate(-1)}
        className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-[#E4E3EB] duration-100 hover:bg-[#D9D8E0]"
      >
        <IoIosArrowBack className="text-2xl" />
      </div>
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className="mx-auto flex w-[600px] flex-col gap-10"
      >
        <div>
          <h1 className="text-4xl  font-extrabold">ბლოგის დამატება</h1>
          <h1 className="mb-3 mt-10 font-bold">ატვირთეთ ფოტო</h1>
          {!errors?.image?.message && getValues()?.image?.length > 0 ? (
            <div className="mt-4 flex h-14  w-full items-center gap-2 rounded-xl bg-[#F4F3FF] px-4 duration-100 hover:bg-[#F1EFFB] ">
              <img src="../.././public/gallery.jpg" />
              {/* If image's name length exceeds MAX_NUM_CHARACTERS, show up to MAX_NUM_CHARACTERS, otherise show full name of the image*/}
              <p>
                {getValues().image[0].name.replaceAll(" ", "").split(".")[0]
                  .length > MAX_NUM_CHARACTERS
                  ? `${getValues()
                      .image[0].name.replaceAll(" ", "")
                      .split(".")[0]
                      .slice(0, MAX_NUM_CHARACTERS)}...${
                      getValues().image[0].name.split(".")[1]
                    }`
                  : getValues().image[0].name.replaceAll(" ", "")}
              </p>
            </div>
          ) : (
            <div
              className={`h-[200px]  rounded-xl border border-dashed  bg-[#F4F3FF] p-10 duration-100 hover:bg-[#F1EFFB] ${
                errors.image ? "border-[#EA1919]" : "border-[#85858D]"
              }`}
            >
              <div
                onClick={() => {
                  imageRef.current.click();
                  watch("image");
                }}
                className="flex flex-col items-center justify-center gap-8"
              >
                <div>
                  <img src="../../../public/add-file.png" />
                </div>
                <input
                  hidden
                  {...rest}
                  accept="image/*"
                  type="file"
                  id="imageRef"
                  ref={(e) => {
                    ref(e);
                    imageRef.current = e;
                  }}
                />
                <h1>
                  ჩააგდეთ ფაილი აქ ან{" "}
                  <span className="font-bold underline">აირჩიეთ ფაილი</span>
                </h1>
              </div>
            </div>
          )}
          {errors?.image?.message && (
            <p className="mt-2 text-[#EA1919]">{errors?.image?.message}</p>
          )}
        </div>
        <input
          type="text"
          placeholder="blabla"
          className="border-4 border-blue-400 bg-red-400"
          {...register("bla", {
            required: "ეს ველი საჭიროა",
          })}
        />
        {errors?.bla?.message && (
          <p className="text-red-400">{errors?.bla?.message}</p>
        )}
        {/* <div className="flex gap-10">
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
        </div> */}
        {/* After the image is uploaded, render this instead of the top one with file's text and gallery icon */}

        <button
          // className="ml-auto w-[288px] rounded-lg bg-[#E4E3EB] px-5 py-2.5 text-white"
          type="submit"
        >
          გამოქვეყნება
        </button>
        {/* <button
          className="ml-auto w-[288px] rounded-lg bg-[#E4E3EB] px-5 py-2.5 text-white"
          type="submit"
        >
          გამოქვეყნება
        </button> */}
      </form>
    </div>
  );
}

export default CreateBlogForm;
