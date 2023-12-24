import Spinner from "../../ui/Spinner";
import CategoryItem from "./CategoryItem";
import { useCategories } from "./useCategories";

function Categories() {
  const { categories, isLoading } = useCategories();

  if (isLoading) return <Spinner />;
  return (
    <ul className="mb-20 mt-14 flex items-center gap-4 overflow-x-scroll  py-4 scrollbar-thin scrollbar-thumb-cyan-700/50">
      {categories.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </ul>
  );
}

export default Categories;
