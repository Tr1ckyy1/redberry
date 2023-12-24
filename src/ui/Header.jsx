import { useState } from "react";
import Login from "../features/authorization/Login";

import Spinner from "./Spinner";
import { Link } from "react-router-dom";
import { useAuthentication } from "./useAuthentication";

function Header() {
  const [openModal, setOpenModal] = useState(false);

  const { isLoading, isLoggedIn, logOut } = useAuthentication();

  // console.log(isLoading);
  // WHOLE PAGE SPINNING
  if (isLoading) return <Spinner />;

  return (
    <header className="sticky top-0 flex justify-between border-b border-[#E4E3EB] bg-[#FFFFFF] px-14 py-6 text-sm">
      <img
        className="cursor-pointer object-none"
        src="../../public/redberry-logo.jpg"
        onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "smooth" })}
      />
      {isLoggedIn ? (
        <div className="space-x-4">
          <Link
            to="/createblog"
            className="rounded-lg bg-[#5D37F3] px-5 py-2.5 text-white hover:brightness-95"
          >
            დაამატე ბლოგი
          </Link>
          <button
            onClick={logOut}
            className="rounded-lg bg-slate-200 px-5 py-2.5 hover:brightness-95"
          >
            გამოსვლა
          </button>
        </div>
      ) : (
        <button
          onClick={() => setOpenModal(true)}
          className="rounded-lg bg-[#5D37F3] px-5 py-2.5 text-white hover:brightness-95"
        >
          შესვლა
        </button>
      )}
      {openModal && <Login closeModal={() => setOpenModal(false)} />}
    </header>
  );
}

export default Header;
