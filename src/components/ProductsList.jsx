import { getProducts } from "../moocks/products";
import { useEffect, useState } from "react";
import ProductFilter from "./ProductFilter";

function ProductList({ type }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({ brand: "", maxPrice: "" });

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();

      const filteredByType = data.filter(
        (product) => product.product_type === type
      );

      setProducts(filteredByType);
      setFilteredProducts(filteredByType);
    };

    fetchProducts();
  }, [type]);

  useEffect(() => {
    let copy = [...products];

    if (filters.brand) {
      copy = copy.filter((product) => product.brand === filters.brand);
    }

    if (filters.maxPrice) {
      copy = copy.filter(
        (product) => product.price <= parseFloat(filters.maxPrice)
      );
    }

    setFilteredProducts(copy);
  }, [filters, products]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const brands = [...new Set(products.map((product) => product.brand))];

  return (
    <div className="flex">

      
      <ProductFilter
        brands={brands}
        onFilterChange={handleFilterChange}
      />

      {/* PRODUCTOS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 w-full">

        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="border border-gray-300 p-4 rounded-lg hover:scale-105 transition flex flex-col"
          >
            <img
              src={product.image}
              className="w-full h-60 object-cover rounded-lg mb-4"
            />

            <h3 className="font-bold text-lg">{product.name}</h3>
            <p className="text-gray-600">{product.description}</p>
            <p className="font-semibold mt-2">{product.price} €</p>

            <button className="mt-auto border px-4 py-2 rounded-lg hover:bg-gray-200 bg-black text-white">
              Añadir al carrito
            </button>
          </div>
        ))}

      </div>
    </div>
  );
}

export default ProductList;