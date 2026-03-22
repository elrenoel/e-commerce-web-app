import axios from "axios";
import { useEffect, useState } from "react";
import { getCategories } from "../api/categoriesAPI";

const CategoriesSidebar = () => {
  const [categories, setCategories] = useState([]);
  const style =
    "hover:bg-gray-200 cursor-pointer text-center py-2 px-2 rounded";

  useEffect(() => {
    handleGetCategories();
  }, []);

  const handleGetCategories = async () => {
    await getCategories(setCategories);
  };

  const handleGetProductsByCategory = (categoryName) => {
    console.log(categoryName);
  };

  return (
    <div className="w-[15%]">
      <h1 className="text-xl font-bold">Category Product</h1>
      <ul className="mt-5 flex flex-col gap-3">
        {categories.map((category) => (
          <li
            key={category._id}
            className={style}
            onClick={() => handleGetProductsByCategory(category.name)}
          >
            {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoriesSidebar;
