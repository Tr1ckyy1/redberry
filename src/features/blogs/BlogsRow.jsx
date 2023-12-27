import { MdArrowOutward } from "react-icons/md";
import { Link } from "react-router-dom";

function BlogsRow({
  blog: { id, author, title, description, image, publish_date, categories },
}) {
  return (
    <div className="space-y-4">
      <img src={image} className="h-[328px] w-full rounded-xl object-cover" />
      <div className="space-y-1 text-sm">
        <p className="font-bold">{author}</p>
        <p className="text-[#85858D]">{publish_date.replaceAll("-", ".")}</p>
      </div>
      <h1 className="font-bold">{title}</h1>
      <ul className="flex flex-wrap gap-x-4 gap-y-2">
        {categories.map((category) => (
          <li
            key={category.id}
            style={{
              color: category.text_color,
              background: category.background_color,
            }}
            className={`cursor-pointer whitespace-nowrap rounded-full border-none px-2.5 py-1.5 outline-none duration-100 hover:brightness-95 `}
          >
            {category.title}
          </li>
        ))}
      </ul>
      <p>
        {description.length > 80
          ? `${description.substring(0, 80)}...`
          : description}
      </p>
      <Link
        to={`blogs/${id}`}
        className="flex items-center gap-2 font-bold text-[#5D37F3] duration-100 hover:opacity-90"
      >
        სრულად ნახვა
        <span>
          <MdArrowOutward />
        </span>
      </Link>
    </div>
  );
}

export default BlogsRow;
