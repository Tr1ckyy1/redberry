import { MdOutlineClose } from "react-icons/md";
import { IoMdCheckmark } from "react-icons/io";
import useLogin from "./useLogin";
import { useForm } from "react-hook-form";
import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Login({ closeModal }) {
  const [success, setSuccess] = useState(false);
  const { register, handleSubmit, formState, setError } = useForm({
    mode: "onChange",
  });

  const { pathname } = useLocation();

  const navigate = useNavigate();

  const divRef = useRef(null);
  const { errors } = formState;

  function handleClickOutside(e) {
    if (!divRef?.current?.contains(e.target)) {
      closeModal();
    }
  }

  const { login } = useLogin();

  function onSubmit(data) {
    login(data.email, {
      onSuccess: () => setSuccess(true),
      onError: (err) => setError("email", { message: err.message }),
    });
  }

  return (
    <div
      onClick={handleClickOutside}
      className="fixed inset-0 flex h-screen w-full items-center justify-center bg-black/20"
    >
      <div
        ref={divRef}
        className="h-[300px] w-1/3 gap-10 rounded-xl bg-white p-6 shadow-lg"
      >
        {success ? (
          <>
            <div
              onClick={() => {
                closeModal();
                if (pathname !== "/") navigate("/");
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
                  წარმატებული ავტორიზაცია
                </h1>
              </div>
              <button
                onClick={() => {
                  closeModal();

                  if (pathname !== "/") navigate("/");
                }}
                className="w-full rounded-lg bg-[#5D37F3] px-5 py-2.5 text-white duration-100 hover:brightness-90"
              >
                კარგი
              </button>
            </div>
          </>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div
              onClick={closeModal}
              className="ml-auto flex h-8 w-8 cursor-pointer items-center justify-center rounded-full duration-100 hover:bg-[#F5F4F9]"
            >
              <MdOutlineClose className="text-2xl" />
            </div>
            <div className="flex flex-col gap-6">
              <h1 className="text-center text-xl font-bold">შესვლა</h1>
              <div className="flex flex-col gap-3">
                <label htmlFor="email" className="font-bold">
                  ელ-ფოსტა
                </label>
                <input
                  {...register("email", {
                    required: "სავალდებულო ველი",
                    pattern: {
                      value: /^[\w-\.]+@redberry.ge$/g,
                      message: "უნდა მთავრდებოდეს @redberry.ge-თ",
                    },
                  })}
                  id="email"
                  type="text"
                  placeholder="Example@redberry.ge"
                  className={`rounded-xl ring-2  ${
                    errors?.email?.message
                      ? "bg-[#EA1919]/10 ring-[#EA1919]"
                      : "bg-[#F7F7FF] ring-[#5D37F3]"
                  } px-4 py-2 text-[#1A1A1F] outline-none  placeholder:text-[#85858D] `}
                />

                {errors?.email?.message && (
                  <div className="flex gap-2">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#EA1919] text-white">
                      <h1>!</h1>
                    </div>
                    <p className="text-[#EA1919]">{errors?.email?.message}</p>
                  </div>
                )}
              </div>
              <button className="w-full rounded-lg bg-[#5D37F3] px-5 py-2.5 text-white duration-100 hover:brightness-90">
                შესვლა
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default Login;
