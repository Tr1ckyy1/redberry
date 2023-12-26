import { useSearchParams } from "react-router-dom";

function CategoryItem({ category }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const { title, text_color, background_color, id } = category;

  function categoryClicked(id, name) {
    setSearchParams((oldParams) => {
      if (oldParams.get(`id${id}`) === name.split(" ").join("")) {
        oldParams.delete(`id${id}`);
      } else {
        oldParams.set(`id${id}`, name.split(" ").join(""));
      }
      return oldParams;
    });
  }
  return (
    <li
      style={{
        color: text_color,
        background: `${background_color}`,
      }}
      className={`cursor-pointer whitespace-nowrap rounded-full border-none px-4 py-2 outline-none duration-100 hover:brightness-95 ${
        searchParams.get(`id${id}`) && "ring-2 ring-black"
      }`}
      onClick={() => categoryClicked(id, title)}
    >
      {title}
    </li>
  );
}

export default CategoryItem;
