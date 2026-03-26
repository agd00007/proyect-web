import { useNavigate } from "react-router-dom";

function Catalog() {
  const navigate = useNavigate();

  const categories = [
    { name: "Coloretes", type: "blush", image: "https://tse1.mm.bing.net/th/id/OIP.N_cRZxy5NBMxABeEWNbN9AHaEM?pid=Api&P=0&h=180" },
    { name: "Bases", type: "foundation", image: "https://tse3.mm.bing.net/th/id/OIP.tHA4o2QaKiNRI65_msCAzgHaEJ?pid=Api&P=0&h=180" },
    { name: "Sombras", type: "eyeshadow", image: "https://tse1.mm.bing.net/th/id/OIP.LLSjZCI7mgPpdq8Q83q0OQHaGF?pid=Api&P=0&h=180" },
    { name: "Labiales", type: "lipstick", image: "https://tse3.mm.bing.net/th/id/OIP.iGIgpNCBOOmZu_1ay-q2DAHaHa?pid=Api&P=0&h=180" },
    { name: "Máscara", type: "mascara", image: "https://tse2.mm.bing.net/th/id/OIP.rYLAnc54yKyc7WKTsx2QkAHaHa?pid=Api&P=0&h=180" },
    { name: "Delineador", type: "eyeliner", image:"https://tse4.mm.bing.net/th/id/OIP.J3A3bbIrhbgGg9mePGphuAHaHa?pid=Api&P=0&h=180" },
  ];

  const pushClick = (type) => {
    console.log("👉 NAVEGANDO A:", type);
    navigate(`/products/${type}`);
  };

  return (
    <div className="flex flex-wrap gap-4 p-10 justify-center">
      {categories.map((category, index) => (
        <div
          key={index}
          className="transition-transform duration-300 hover:scale-110 text-center"
        >
          <img
            src={category.image}
            className="h-40 w-40 object-cover rounded-full cursor-pointer"
            onClick={() => pushClick(category.type)}
          />

          <p className="font-bold mt-4">{category.name}</p>

          <button
            className="border px-6 py-2 mt-4 rounded-lg hover:bg-gray-200"
            onClick={() => pushClick(category.type)}
          >
            Descubrir
          </button>
        </div>
      ))}
    </div>
  );
}

export default Catalog;