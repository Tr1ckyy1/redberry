import { useState } from "react";
import Login from "../features/authorization/Login";

function Header() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <header className="sticky top-0 flex justify-between border-b border-[#E4E3EB] bg-[#FFFFFF] px-14 py-6 text-sm">
      <img
        className="cursor-pointer object-none"
        src="../../public/redberry-logo.jpg"
        onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "smooth" })}
      />
      <button
        onClick={() => setOpenModal(true)}
        className="rounded-lg bg-[#5D37F3] px-5 py-2.5 text-white"
      >
        შესვლა
      </button>
      {openModal &&  <Login setOpenModal={setOpenModal}/>}
    </header>
  );
}

export default Header;
