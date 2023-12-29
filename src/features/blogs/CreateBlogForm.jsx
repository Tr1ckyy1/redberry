import { useForm } from "react-hook-form";
import {
  IoIosArrowBack,
  IoIosArrowDown,
  IoIosArrowUp,
  IoMdCheckmark,
} from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { PiDotOutlineFill } from "react-icons/pi";
import { useEffect, useRef, useState } from "react";
import { useCategories } from "../categories/useCategories";
import { IoCloseOutline } from "react-icons/io5";
import useCreateBlog from "./useCreateBlog";
import { MdOutlineClose } from "react-icons/md";
import gallery from "../.././public/gallery.jpg";

const MAX_NUM_CHARACTERS = 50;

function CreateBlogForm() {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [modalWindow, setModalWindow] = useState(false);
  const [categoriesError, setCategoriesError] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [clickedOnce, setClickedOnce] = useState(false);
  const [authorErrors, setAuthorErrors] = useState({
    twoWordsError: false,
    fourCharactersError: false,
    alphabetError: false,
  });

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isValid,
      dirtyFields,
      isSubmitted,
      isSubmitSuccessful,
      isSubmitting,
      isLoading,
    },
    getValues,
    watch,
    resetField,
    trigger,
    reset,
    setValue,
    setError,
  } = useForm({
    defaultValues: localStorage.getItem("formData")
      ? {
          ...JSON.parse(localStorage.getItem("formData")),
          image:
            JSON.stringify(
              JSON.parse(localStorage.getItem("formData")).image,
            ) === "{}"
              ? emptyFile()
              : [blobToFile()],
        }
      : {},

    mode: "onChange",
  });

  const { categories } = useCategories();
  const navigate = useNavigate();
  const imageRef = useRef(null);
  const categoriesAddedRef = useRef(null);
  const categoriesListRef = useRef(null);
  const modalRef = useRef(null);

  const { createBlog } = useCreateBlog();

  const { ref, ...rest } = register("image", {
    required: "სურათი სავალდებულოა",
    validate: (value) =>
      value[0]?.type?.startsWith("image") || "ფაილი უნდა იყოს სურათი",
  });

  useEffect(() => {
    if (clickedOnce && !selectedCategories.length > 0)
      setCategoriesError("ეს ველი სავალდებულოა");
    else {
      setCategoriesError("");
    }
  }, [selectedCategories, clickedOnce]);

  useEffect(() => {
    if (localStorage.getItem("categories"))
      setSelectedCategories(JSON.parse(localStorage.getItem("categories")));

    if (
      localStorage.getItem("categories") &&
      !JSON.parse(localStorage.getItem("categories")).length > 0
    )
      localStorage.removeItem("categories");
  }, []);

  // If form exists in localStorage, trigger errors on refresh
  useEffect(() => {
    if (localStorage.getItem("formData")) {
      Object.entries(JSON.parse(localStorage.getItem("formData"))).forEach(
        (item) => {
          if (item[0] !== "image" && item[1]) {
            dirtyFields[item[0]] = true;
            trigger(item[0]);
          }
        },
      );

      if (localStorage.getItem("authorErrors") && dirtyFields.author)
        setAuthorErrors(JSON.parse(localStorage.getItem("authorErrors")));
    }
  }, [dirtyFields, trigger]);

  function handleAuthorErrors(e) {
    setAuthorErrors((oldErrors) => {
      const twoWordsError =
        e.target.value.trim().split(" ").filter(Boolean).length >= 2;
      const fourCharactersError =
        e.target.value.trim().replace(/\s+/g, "").length >= 4;
      const alphabetError = /^[\u10A0-\u10FF\s]+$/.test(e.target.value);

      localStorage.setItem(
        "authorErrors",
        JSON.stringify({
          twoWordsError: !twoWordsError,
          fourCharactersError: !fourCharactersError,
          alphabetError: !alphabetError,
        }),
      );
      return {
        ...oldErrors,
        twoWordsError: !twoWordsError,
        fourCharactersError: !fourCharactersError,
        alphabetError: !alphabetError,
      };
    });
  }

  function handleFileUpload(file = null) {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        localStorage.setItem(
          "formData",
          JSON.stringify({
            ...JSON.parse(localStorage.getItem("formData")),
            image: reader.result,
            imageName: file.name,
          }),
        );
      };

      reader.readAsDataURL(file);
    }
  }

  function blobToFile() {
    const base64 = JSON.parse(localStorage.getItem("formData")).image;

    if (typeof base64 !== "string") return;

    const splitData = base64.split(",");
    const name = JSON.parse(localStorage.getItem("formData")).imageName;
    const byteCharacters = atob(splitData[1]);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    const type = splitData[0].split(";")[0].split(":")[1];

    const file = new File([byteArray], name, {
      type,
    });

    return file;
  }

  // When image is removed, return an empty file instead of []
  function emptyFile() {
    const dataTransfer = new DataTransfer();
    const emptyFileList = dataTransfer.files;
    return emptyFileList;
  }

  function onSubmit(data) {
    const categoriesArray = selectedCategories.map((item) => item.id);

    createBlog(
      {
        ...data,
        image: data.image[0],
        categories: `[${categoriesArray}]`,
      },
      {
        onSuccess: () => {
          localStorage.removeItem("formData");
          localStorage.removeItem("categories");
          localStorage.removeItem("authErrors");
          reset();
          setSelectedCategories([]);
          setModalWindow(true);
          setClickedOnce(false);
          setExpanded(false);
        },
      },
    );
  }

  function handleClickOutside(e) {
    if (!modalRef?.current?.contains(e.target)) {
      setModalWindow(false);
    }
  }

  return (
    <div className="flex px-14 py-10">
      {modalWindow && (
        <div
          onClick={handleClickOutside}
          className="fixed inset-0 z-50 flex h-screen w-full items-center justify-center bg-black/20"
        >
          <div
            ref={modalRef}
            className="h-[300px] w-1/3 gap-10 rounded-xl bg-white p-6 shadow-lg"
          >
            <div
              onClick={() => {
                setModalWindow(false);
              }}
              className="ml-auto flex h-8 w-8 cursor-pointer items-center justify-center rounded-full duration-100 hover:bg-[#F5F4F9]"
            >
              <MdOutlineClose className="text-2xl" />
            </div>
            <div className="space-y-16">
              <div className="space-y-6">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#14D81C] text-4xl text-white">
                  <IoMdCheckmark />
                </div>
                <h1 className="text-center text-xl font-bold">
                  ჩანაწერი წარმატებით დაემატა
                </h1>
              </div>
              <button
                onClick={() => {
                  navigate("/");
                }}
                className="w-full rounded-lg bg-[#5D37F3] px-5 py-2.5 text-white duration-100 hover:brightness-90"
              >
                მთავარ გვერდზე დაბრუნება
              </button>
            </div>
          </div>
        </div>
      )}

      <div
        onClick={() => navigate(-1)}
        className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-[#E4E3EB] duration-100 hover:bg-[#D9D8E0]"
      >
        <IoIosArrowBack className="text-2xl" />
      </div>
      <form
        onChange={(e) => {
          if (e.target.name !== "image") {
            localStorage.setItem(
              "formData",
              JSON.stringify({
                ...watch(),
                [e.target.name]: e.target.value,
              }),
            );
          } else {
            handleFileUpload(e.target.files[0]);
          }
        }}
        onSubmit={handleSubmit(onSubmit)}
        className="ml-[25%] flex w-[41.6%] flex-col gap-10"
      >
        <div>
          <h1 className="text-4xl  font-extrabold">ბლოგის დამატება</h1>
          <h1 className="mb-3 mt-10 font-bold">ატვირთეთ ფოტო</h1>
          {!errors?.image?.message && getValues()?.image?.length > 0 ? (
            <div className="mt-4 flex h-14 w-full items-center justify-between  rounded-xl bg-[#F4F3FF] px-4 duration-100 hover:bg-[#F1EFFB]">
              <div className="flex items-center gap-2">
                <img src={gallery} />
                {/* If image's name length exceeds MAX_NUM_CHARACTERS, show up to MAX_NUM_CHARACTERS, otherise show full name of the image*/}
                <p>
                  {getValues().image[0]?.name?.replaceAll(" ", "").split(".")[0]
                    .length > MAX_NUM_CHARACTERS
                    ? `${getValues()
                        .image[0]?.name?.replaceAll(" ", "")
                        .split(".")[0]
                        .slice(0, MAX_NUM_CHARACTERS)}...${
                        getValues().image[0].name.split(".")[1]
                      }`
                    : getValues().image[0]?.name?.replaceAll(" ", "")}
                </p>
              </div>
              <div
                onClick={() => {
                  if (localStorage.getItem("formData")) {
                    const formData = JSON.parse(
                      localStorage.getItem("formData"),
                    );
                    formData.image = emptyFile();
                    delete formData.imageName;
                    localStorage.setItem("formData", JSON.stringify(formData));
                  }

                  resetField("image");
                  setValue("image", emptyFile());
                  setError("image", {
                    type: "required",
                    message: "სურათი სავალდებულოა",
                  });
                }}
                className="flex h-5 w-5 cursor-pointer items-center justify-center rounded-full duration-100 hover:bg-[#F5F4F9]"
              >
                <IoCloseOutline className="text-2xl text-[#1A1A1F]" />
              </div>
            </div>
          ) : (
            <div
              className={`h-[200px]  rounded-xl border border-dashed  p-10 duration-100

              ${
                errors.image
                  ? "border-[#EA1919] bg-[#EA1919]/10"
                  : "border-[#85858D]  bg-[#F4F3FF] hover:bg-[#F1EFFB]"
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
                onChange: handleAuthorErrors,
                pattern: {
                  value: /^[\u10A0-\u10FF\s]+$/,
                },
                validate: (value) =>
                  value.trim().split(" ").filter(Boolean).length >= 2 &&
                  value.trim().replace(/\s+/g, "").length >= 4,
              })}
              type="text"
              className={`${
                dirtyFields.author &&
                !authorErrors.twoWordsError &&
                !authorErrors.fourCharactersError &&
                !authorErrors.alphabetError
                  ? "border-[#14D81C] bg-[#14D81C]/10"
                  : authorErrors.twoWordsError ||
                      authorErrors.fourCharactersError ||
                      authorErrors.alphabetError
                    ? "border-[#EA1919] bg-[#EA1919]/10"
                    : "border-[#E4E3EB] bg-[#FCFCFD] focus:border-[#5D37F3] "
              } placeholer:text-[#E4E3EB] rounded-xl border  px-4 py-2 outline-none `}
              placeholder="შეიყვანეთ ავტორი"
            />
            {errors?.author?.message && errors?.author?.type === "required" && (
              <p className="text-sm text-[#EA1919]">{errors.author.message}</p>
            )}
            <div className={"flex text-sm text-[#85858D]"}>
              <PiDotOutlineFill />
              {/*

              */}
              <p
                className={`${
                  dirtyFields.author && !authorErrors.fourCharactersError
                    ? "text-[#14D81C]"
                    : authorErrors.fourCharactersError
                      ? "text-[#EA1919]"
                      : "text-[#85858D]"
                }`}
              >
                მინიმუმ 4 სიმბოლო
              </p>
            </div>
            <div className="flex text-sm text-[#85858D]">
              <PiDotOutlineFill />
              <p
                className={`${
                  dirtyFields.author && !authorErrors.twoWordsError
                    ? "text-[#14D81C]"
                    : authorErrors.twoWordsError
                      ? "text-[#EA1919]"
                      : "text-[#85858D]"
                }`}
              >
                მინიმუმ ორი სიტყვა
              </p>
            </div>
            <div className="flex text-sm text-[#85858D]">
              <PiDotOutlineFill />
              <p
                className={`${
                  dirtyFields.author && !authorErrors.alphabetError
                    ? "text-[#14D81C]"
                    : authorErrors.alphabetError
                      ? "text-[#EA1919]"
                      : "text-[#85858D]"
                }`}
              >
                მხოლოდ ქართული სიმბოლოები
              </p>
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
              className={`placeholer:text-[#E4E3EB] $ rounded-xl  border   px-4 py-2 outline-none ${
                dirtyFields.title && !errors.title
                  ? "border-[#14D81C] bg-[#14D81C]/10"
                  : errors?.title
                    ? "border-[#EA1919] bg-[#EA1919]/10"
                    : "border-[#E4E3EB] bg-[#FCFCFD] focus:border-[#5D37F3]"
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
            className={` ${
              dirtyFields.description && !errors.description
                ? "border-[#14D81C] bg-[#14D81C]/10"
                : errors?.description
                  ? "border-[#EA1919] bg-[#EA1919]/10"
                  : "border-[#E4E3EB] bg-[#FCFCFD] focus:border-[#5D37F3]"
            } placeholer:text-[#E4E3EB] h-[124px] resize-none rounded-xl border  px-4 py-2 outline-none`}
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
              {...register("publish_date", {
                required: "ეს ველი სავალდებულოა",
              })}
              type="date"
              className={`placeholer:text-[#E4E3EB] rounded-xl border  px-4 py-2 outline-none ${
                dirtyFields.publish_date && !errors.publish_date
                  ? "border-[#14D81C] bg-[#14D81C]/10"
                  : errors?.publish_date
                    ? "border-[#EA1919] bg-[#EA1919]/10"
                    : "border-[#E4E3EB] bg-[#FCFCFD] focus:border-[#5D37F3]"
              }`}
            />
            {errors?.publish_date?.message && (
              <p className="text-sm text-[#EA1919]">
                {errors.publish_date.message}
              </p>
            )}
          </div>
          <div className="flex h-fit w-1/2 flex-col gap-3">
            <h1 className="font-bold">კატეგორია *</h1>
            <div
              onClick={(e) => {
                setClickedOnce(true);
                if (
                  !categoriesAddedRef?.current?.contains(e.target) &&
                  !categoriesListRef?.current?.contains(e.target)
                )
                  setExpanded((old) => !old);
              }}
              className={`relative flex h-full w-full items-center justify-between rounded-xl ${
                selectedCategories.length > 0
                  ? "border-[#14D81C] bg-[#14D81C]/10"
                  : categoriesError
                    ? "border-[#EA1919] bg-[#EA1919]/10"
                    : "border-[#E4E3EB] bg-[#FCFCFD] "
              } border  ${
                selectedCategories.length > 0 ? "px-1 py-0.5" : "px-4 py-2"
              }`}
            >
              {selectedCategories.length > 0 ? (
                <div className="flex gap-1 overflow-x-scroll  scrollbar-none">
                  {selectedCategories.map((cat) => (
                    <div
                      ref={categoriesAddedRef}
                      key={cat.title}
                      style={{
                        color: cat.text_color,
                        background: cat.background_color,
                      }}
                      className="h-fit w-fit whitespace-nowrap rounded-full border-none px-3 py-2 outline-none duration-100"
                    >
                      <div className="flex items-center gap-2">
                        {cat.title}
                        <MdOutlineClose
                          onClick={() =>
                            setSelectedCategories((oldCategories) => {
                              const data = oldCategories.filter(
                                (item) => item.id !== cat.id,
                              );
                              localStorage.setItem(
                                "categories",
                                JSON.stringify(data),
                              );
                              return data;
                            })
                          }
                          className="cursor-pointer rounded-xl duration-100 hover:brightness-95 "
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className=" text-[#85858D]">აირჩიეთ კატეგორია</p>
              )}
              <div className="text-2xl text-[#292D32]">
                {expanded ? <IoIosArrowUp /> : <IoIosArrowDown />}
              </div>
              {expanded && (
                <ul
                  ref={categoriesListRef}
                  className={`absolute left-0 ${
                    categoriesError ? "top-[80px]" : "top-[50px]"
                  } flex h-28 w-full flex-wrap gap-2 overflow-x-hidden overflow-y-scroll rounded-xl  p-2 shadow-md scrollbar-thin scrollbar-track-slate-200 scrollbar-thumb-slate-300`}
                >
                  {categories?.map((category) => (
                    <li
                      onClick={() => {
                        setSelectedCategories((oldCategories) => {
                          const categoryExists = oldCategories.find(
                            (cat) => cat.id === category.id,
                          );
                          if (!categoryExists) {
                            localStorage.setItem(
                              "categories",
                              JSON.stringify([...oldCategories, category]),
                            );
                            return [...oldCategories, category];
                          }

                          return oldCategories;
                        });
                      }}
                      style={{
                        color: category.text_color,
                        background: category.background_color,
                      }}
                      className="w-fit cursor-pointer whitespace-nowrap rounded-full border-none px-3 py-2 outline-none duration-100 hover:brightness-95"
                      key={category.id}
                    >
                      {category.title}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {categoriesError && (
              <p className="text-sm text-[#EA1919]">{categoriesError}</p>
            )}
          </div>
        </div>
        <div className="flex  w-full flex-col gap-3">
          <h1 className="font-bold">ელ-ფოსტა</h1>
          <input
            {...register("email", {
              pattern: {
                value: /^[\w-\.]+@redberry.ge$/g,
                message: "უნდა მთავრდებოდეს @redberry.ge-თ",
              },
            })}
            type="text"
            className={`${
              dirtyFields.email && !errors.email
                ? "border-[#14D81C] bg-[#14D81C]/10"
                : errors?.email
                  ? "border-[#EA1919] bg-[#EA1919]/10"
                  : "border-[#E4E3EB] bg-[#FCFCFD] focus:border-[#5D37F3] "
            } placeholer:Example@redberry.ge w-[48%] rounded-xl border px-4 py-2 outline-none`}
            placeholder="Example@redberry.ge"
          />
          {errors?.email?.message && (
            <p className="text-sm text-[#EA1919]">{errors.email.message}</p>
          )}
        </div>
        <button
          disabled={
            !isValid ||
            !selectedCategories.length > 0 ||
            categoriesError ||
            Object.keys(errors).length > 0
          }
          className={`ml-auto w-[288px] rounded-lg bg-[#4721DD] px-5 py-2.5 text-white disabled:cursor-not-allowed disabled:bg-[#E4E3EB] ${
            isValid &&
            selectedCategories.length > 0 &&
            !categoriesError &&
            !Object.keys(errors).length > 0 &&
            "duration-100 hover:brightness-90"
          }`}
          type="submit"
        >
          გამოქვეყნება
        </button>
      </form>
    </div>
  );
}

export default CreateBlogForm;
