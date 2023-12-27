import MiniSpinner from "../../ui/MiniSpinner";
import CategoryItem from "./CategoryItem";
import { useCategories } from "./useCategories";

function Categories() {
  const { categories, isLoading } = useCategories();

  if (isLoading)
    return (
      <div className="flex items-center justify-center">
        <MiniSpinner />;
      </div>
    );
  return (
    <ul className="my-20 flex items-center gap-4 overflow-x-scroll  px-0.5 py-4 scrollbar-thin scrollbar-track-neutral-500/10 scrollbar-thumb-neutral-300">
      {categories.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </ul>
  );
}

export default Categories;
