import { useForm } from "react-hook-form";
import { IoIosArrowBack, IoIosArrowDown } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { PiDotOutlineFill } from "react-icons/pi";
import { useRef } from "react";
import { useCategories } from "../categories/useCategories";

const MAX_NUM_CHARACTERS = 50;

function CreateBlogForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, dirtyFields },
    getValues,
    watch,
    setError,
  } = useForm({
    mode: "onChange",
  });
  const { categories, isLoading } = useCategories();
  const navigate = useNavigate();
  const imageRef = useRef(null);

  const { ref, ...rest } = register("image", {
    required: "სურათი სავალდებულოა",
    validate: (value) =>
      value[0]?.type?.startsWith("image") || "ფაილი უნდა იყოს სურათი",
  });

  const { onChange, ...inpRest } = register("dda", {
    required: "ეს ველი სავალდებულოა",
    minLength: {
      value: 10,
      message: "should be at least 10 characters",
    },
    pattern: {
      value: /^[\w-\.]+@redberry.ge$/g,
      message: "უნდა მთავრდებოდეს @redberry.ge-თ",
    },
    validate: (value) => value === "asd" || "err",

    // value.replaceAll(" ", "").length >= 4 || "bla",
  });

  function stuff() {}

  function onSubmit(data) {
    // console.log(isDirty);
    // console.log(isValid);
    console.log(dirtyFields);
  }

  function onError(err) {
    console.log(err);
  }

  return (
    <div className="flex px-14 py-10">
      <div
        onClick={() => navigate(-1)}
        className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-[#E4E3EB] duration-100 hover:bg-[#D9D8E0]"
      >
        <IoIosArrowBack className="text-2xl" />
      </div>
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className="ml-[25%] flex w-[41.6%] flex-col gap-10"
      >
        <div>
          <h1 className="text-4xl  font-extrabold">ბლოგის დამატება</h1>
          <h1 className="mb-3 mt-10 font-bold">ატვირთეთ ფოტო</h1>
          {!errors?.image?.message && getValues()?.image?.length > 0 ? (
            <div className="mt-4 flex h-14  w-full items-center gap-2 rounded-xl bg-[#F4F3FF] px-4 duration-100 hover:bg-[#F1EFFB]">
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

        <div className="flex gap-10">
          <div className="flex w-1/2 flex-col gap-3">
            <h1 className="font-bold">ავტორი *</h1>
            <input
              {...register("author", {
                required: "ეს ველი სავალდებულოა",
                // minLength: {
                //   value: 10,
                //   message: "should be at least 10 characters",
                // },
                // pattern: {
                //   value: /^[\w-\.]+@redberry.ge$/g,
                //   message: "უნდა მთავრდებოდეს @redberry.ge-თ",
                // },
                // validate: (value) => value === "asd" || "err",

                // value.replaceAll(" ", "").length >= 4 || "bla",
              })}
              type="text"
              className={`${
                dirtyFields.author && !errors.author
                  ? "border-[#14D81C] bg-[#FCFCFD]"
                  : errors?.author
                    ? "border-[#EA1919] bg-[#EA1919]/10"
                    : "bg-[#FCFCFD]"
              } placeholer:text-[#E4E3EB] rounded-xl border border-[#E4E3EB]  px-4 py-2 outline-none focus:border-[#5D37F3] focus:bg-[#FCFCFD]`}
              placeholder="შეიყვანეთ ავტორი"
            />
            {errors?.author?.message && errors?.author?.type === "required" && (
              <p className="text-sm text-[#EA1919]">{errors.author.message}</p>
            )}
            <div className={"flex text-sm text-[#85858D]"}>
              <PiDotOutlineFill />
              <p
                className={`${
                  dirtyFields.author && !errors.author
                    ? "text-[#14D81C]"
                    : errors?.author?.message
                      ? "text-[#EA1919]"
                      : "text-[#85858D]"
                }`}
              >
                მინიმუმ 4 სიმბოლო
              </p>
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
            <h1 className="font-bold">სათაური *</h1>
            <input
              {...register("title", {
                required: "ეს ველი სავალდებულოა",
                validate: (value) => value.replaceAll(" ", "").length >= 2,
              })}
              type="text"
              className={`placeholer:text-[#E4E3EB] $ rounded-xl  border border-[#E4E3EB]  px-4 py-2 outline-none focus:border-[#5D37F3] focus:bg-[#FCFCFD] ${
                dirtyFields.title && !errors.title
                  ? "border-[#14D81C] bg-[#FCFCFD]"
                  : errors?.title
                    ? "border-[#EA1919] bg-[#EA1919]/10"
                    : "bg-[#FCFCFD]"
              }`}
              placeholder="შეიყვანეთ სათაური"
            />
            {errors?.title?.message && (
              <p className="text-sm text-[#EA1919]">{errors.title.message}</p>
            )}
            <p
              className={`text-sm ${
                dirtyFields.title && !errors.title
                  ? "text-[#14D81C]"
                  : errors?.title
                    ? "text-[#EA1919]"
                    : "text-[#85858D]"
              } `}
            >
              მინიმუმ 2 სიმბოლო
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <h1 className="font-bold">აღწერა *</h1>
          <textarea
            {...register("description", {
              required: "ეს ველი სავალდებულოა",
              validate: (value) => value.replaceAll(" ", "").length >= 2,
            })}
            type="text"
            className={`focus:border-[#5D37F3] focus:bg-[#FCFCFD] ${
              dirtyFields.description && !errors.description
                ? "border-[#14D81C] bg-[#FCFCFD]"
                : errors?.description
                  ? "border-[#EA1919] bg-[#EA1919]/10"
                  : "bg-[#FCFCFD]"
            } placeholer:text-[#E4E3EB] h-[124px] resize-none rounded-xl border border-[#E4E3EB] px-4 py-2 outline-none`}
            placeholder="შეიყვანეთ აღწერა"
          />
          {errors?.description?.message && (
            <p className="text-sm text-[#EA1919]">
              {errors.description.message}
            </p>
          )}
          <p
            className={`text-sm  ${
              dirtyFields.description && !errors.description
                ? "text-[#14D81C]"
                : errors?.description
                  ? "text-[#EA1919]"
                  : "text-[#85858D]"
            }`}
          >
            მინიმუმ 2 სიმბოლო
          </p>
        </div>
        <div className="flex gap-6">
          <div className="flex w-1/2 flex-col gap-3">
            <h1 className="font-bold">გამოქვეყნების თარიღი *</h1>
            <input
              type="date"
              className="placeholer:text-[#E4E3EB] rounded-xl border border-[#E4E3EB] bg-[#FCFCFD] px-4 py-2 outline-none"
            />
          </div>
          <div className="flex w-1/2 flex-col gap-3">
            <h1 className="font-bold">კატეგორია *</h1>
            <div className="relative flex h-full w-full items-center justify-between rounded-xl border border-[#E4E3EB] bg-[#FCFCFD] py-2">
              <p className="px-4 text-[#85858D]">აირჩიეთ კატეგორია</p>
              <div className="pr-4">
                <IoIosArrowDown className="text-2xl text-[#292D32]" />
              </div>
              <ul className="absolute top-10 flex h-28 w-full flex-wrap gap-2 overflow-x-hidden overflow-y-scroll bg-black/10 p-2 ">
                {categories?.map((category) => (
                  <li
                    style={{
                      color: category.text_color,
                      background: category.background_color,
                    }}
                    className="w-fit cursor-pointer whitespace-nowrap rounded-full border-none px-4 py-2 outline-none duration-100 hover:brightness-95   "
                    key={category.id}
                  >
                    {category.title}
                  </li>
                ))}
              </ul>
            </div>
            {/* <input
              type="text"
              className="placeholer:text-[#E4E3EB] rounded-xl border border-[#E4E3EB] bg-[#FCFCFD] px-4 py-2 outline-none"
              placeholder="შეიყვანეთ სათაური"
            /> */}
          </div>
        </div>

        <div className="flex w-1/2 flex-col gap-3">
          <h1 className="font-bold">ელ-ფოსტა</h1>
          <input
            {...register("email", {
              required: "სავალდებულო ველი",
              pattern: {
                value: /^[\w-\.]+@redberry.ge$/g,
                message: "უნდა მთავრდებოდეს @redberry.ge-თ",
              },
            })}
            type="text"
            className={`focus:border-[#5D37F3] focus:bg-[#FCFCFD] ${
              dirtyFields.email && !errors.email
                ? "border-[#14D81C] bg-[#FCFCFD]"
                : errors?.email
                  ? "border-[#EA1919] bg-[#EA1919]/10"
                  : "bg-[#FCFCFD]"
            } placeholer:Example@redberry.ge rounded-xl border border-[#E4E3EB] px-4 py-2 outline-none`}
            placeholder="Example@redberry.ge"
          />
          {errors?.email?.message && (
            <p className="text-sm text-[#EA1919]">{errors.email.message}</p>
          )}
        </div>

        <button
          // className="ml-auto w-[288px] rounded-lg bg-[#E4E3EB] px-5 py-2.5 text-white"
          type="submit"
        >
          გამოქვეყნება
        </button>
      </form>
    </div>
  );
}

export default CreateBlogForm;
