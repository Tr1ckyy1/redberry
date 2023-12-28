import Spinner from "../../ui/Spinner";
import { LuDot } from "react-icons/lu";

function SingleBlogPage({
  blog: {
    author,
    categories,
    description,
    email,
    image,
    publish_date,
    title,
  } = {},
  isLoading,
}) {
  if (isLoading) return <Spinner />;

  return (
    <div className="space-y-7">
      <img src={image} className="h-[328px] w-full rounded-xl object-cover" />
      <div className="space-y-1">
        <h1 className="font-bold">{author}</h1>
        <div className="flex items-center text-sm text-[#85858D]">
          <p>{publish_date}</p>
          <LuDot className="text-lg" />
          <p>{email}</p>
        </div>
      </div>
      <h1 className="text-4xl font-bold">{title}</h1>
      <ul className="flex flex-wrap gap-x-4 gap-y-2">
        {categories.map((category) => (
          <li
            key={category.id}
            style={{
              color: category.text_color,
              background: category.background_color,
            }}
            className={`whitespace-nowrap rounded-full border-none px-2.5 py-1.5 outline-none duration-100`}
          >
            {category.title}
          </li>
        ))}
      </ul>
      <div className="space-y-10">
        {description.split("\n").map((stroke, index) => (
          <p key={index}>{stroke}</p>
        ))}
      </div>
    </div>
  );
}

export default SingleBlogPage;
