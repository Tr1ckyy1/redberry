import { useRef } from "react";
import { MdOutlineClose } from "react-icons/md";
import useLogin from "./useLogin";

function Login({ setOpenModal }) {
  const innerDivRef = useRef(null);

  const { login, isLoading } = useLogin();

  function handleClickOutside(e) {
    if (!innerDivRef?.current?.contains(e.target)) setOpenModal(false);
  }

  function authorize() {
    login("something@redberry.ge");
  }

  return (
    <div
      onClick={handleClickOutside}
      className="absolute inset-0 flex h-screen w-full items-center justify-center bg-black/20"
    >
      <div
        ref={innerDivRef}
        className="h-[300px] w-[480px] gap-10 rounded-xl bg-white p-6 shadow-lg"
      >
        <div
          onClick={() => setOpenModal(false)}
          className="ml-auto flex h-8 w-8 cursor-pointer items-center justify-center rounded-full duration-100 hover:bg-black/5"
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
              id="email"
              type="text"
              placeholder="Example@redberry.ge"
              className="rounded-xl border-none bg-[#F7F7FF] px-4 py-2 text-[#85858D] outline-none ring-2 ring-[#5D37F3] placeholder:text-[#85858D]"
              // IF EMAIL IS WRONG BG - #FAF2F3 RING - #EA1919
            />
            {/* IF EMAIL IS WRONG */}
            {/* <div className="flex gap-2">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#EA1919] text-white">
                <h1>!</h1>
              </div>
              <p className="text-[#EA1919]">ელ-ფოსტა არ მოიძებნა</p>
            </div> */}
          </div>
          <button
            onClick={authorize}
            className="w-full rounded-lg bg-[#5D37F3] px-5 py-2.5 text-white duration-100 hover:brightness-90"
          >
            შესვლა
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
