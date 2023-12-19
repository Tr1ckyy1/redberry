import CategoryItem from "./CategoryItem";
import { useCategories } from "./useCategories";

function Categories() {
  const { categories, isLoading } = useCategories();

  console.log(categories);
  if (isLoading) return <h1>Spinning...</h1>;
  return (
    <ul className="mb-20 mt-14 flex items-center justify-center gap-4 overflow-x-auto py-2">
      {categories.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </ul>
  );
}

export default Categories;
