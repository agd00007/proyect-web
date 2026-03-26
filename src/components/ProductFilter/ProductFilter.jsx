import { useEffect, useState } from "react";
import { MdMenu } from "react-icons/md";

export default function ProductFilter({ brands, onFilterChange }) {
  const [brand, setBrand] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [showFilters, setShowFilters] = useState(true);

  useEffect(() => {
    onFilterChange({ brand, maxPrice });
  }, [brand, maxPrice]);

  return (
    <div className="w-60  p-4 min-h-screen">

      
      <button
        className="flex items-center mt-3 gap-2 border px-4 py-2 rounded hover:bg-gray-100 mb-4 w-full"
        onClick={() => setShowFilters(!showFilters)}
      >
        <MdMenu size={22} />
        Filtros
      </button>

      
      {showFilters && (
        <div className="flex flex-col gap-4">

          <div>
            <p className="font-bold mb-1">Marca</p>
            <select
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="border p-2 rounded w-full"
            >
              <option value="">Todas las marcas</option>
              {brands.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>

          <div>
            <p className="font-bold mb-1">Precio máximo</p>
            <input
              type="number"
              placeholder="Ej: 30"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="border p-2 rounded w-full"
            />
          </div>

        </div>
      )}
    </div>
  );
}