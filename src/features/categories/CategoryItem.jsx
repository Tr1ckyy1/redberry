import { useState } from "react";
import { useSearchParams } from "react-router-dom";

function CategoryItem({ category }) {
  const [clicked, setClicked] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const { title, text_color, background_color, id } = category;
  //   focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2

  //   function handleFilterChange(key, value) {
  //     setSearchParams((prevParams) => {
  //       if (value === null) {
  //         prevParams.delete(key);
  //       } else {
  //         prevParams.set(key, value);
  //       }
  //       return prevParams;
  //     });
  //   }

  function categoryClicked(id, name) {
    setClicked((old) => !old);
    setSearchParams((oldParams) => {
      if (oldParams.get(`cat${id}`) === name.split(" ").join("")) {
        oldParams.delete(`cat${id}`);
      } else {
        oldParams.set(`cat${id}`, name.split(" ").join(""));
      }
      return oldParams;
    });
    //  ADD searchParams later
    // searchParams.set("category", name.split(" ").join(""));
    // setSearchParams(searchParams);
  }
  return (
    <li
      style={{
        color: text_color,
        background: `${background_color}20`,
      }}
      className={`cursor-pointer whitespace-nowrap rounded-full border-none px-4 py-2 text-[11px] outline-none ${
        clicked && "ring-2 ring-black"
      }`}
      onClick={() => categoryClicked(id, title)}
    >
      {title}
    </li>
  );
}

export default CategoryItem;
