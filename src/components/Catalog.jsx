import { categories } from "../moocks/categories";
import { useNavigate } from "react-router-dom";

function Catalog() {

  const navigate = useNavigate();

  const pushClick = (type) => {
    navigate(`/products/${type}`);
  };

  return (
    <div className="flex flex-wrap gap-4 p-10 justify-center">
      {categories.map((category) => (
        <div
          key={category.id}
          className="transition-transform duration-300 hover:scale-110 text-center"
        >
          <img
            src={category.image}
            className="h-40 w-40 object-cover rounded-full cursor-pointer"
            onClick={() => pushClick(category.name)}
          />

          <p className="font-bold mt-4">{category.description}</p>

          <button
            className="border px-6 py-2 mt-4 rounded-lg hover:bg-gray-200 cursor-pointer"
            onClick={() => pushClick(category.name)}
          >
            Descubrir
          </button>

        </div>
      ))}
    </div>
  );
}

export default Catalog;