import { useState } from "react";
import Login from "../features/authorization/Login";
import logo from "../../public/redberry-logo.jpg";

import Spinner from "./Spinner";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthentication } from "./useAuthentication";

function Header() {
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { isLoading, isLoggedIn, logOut } = useAuthentication();

  if (isLoading) return <Spinner />;

  return (
    <header className="sticky top-0 z-10 flex justify-between border-b border-[#E4E3EB] bg-[#FFFFFF] px-14 py-6 text-sm">
      <img
        className="cursor-pointer object-none"
        src={logo}
        onClick={() => {
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
          if (pathname && pathname !== "/") navigate("/");
        }}
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
            onClick={() => {

              logOut()
            navigate("/")}}
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
