import { useEffect, useState } from "react";
import ProductFilter from "../ProductFilter/ProductFilter";
import { useCart } from "../context/CartContext";

function ProductsList({ type }) {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({ brand: "", maxPrice: "" });
  const [loading, setLoading] = useState(true);

  
  const validateImage = (url) =>
    new Promise((resolve) => {
      const img = new Image();
      img.src = url;
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
    });

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      try {
        const response = await fetch(
          `http://makeup-api.herokuapp.com/api/v1/products.json?product_type=${type}`
        );
        const data = await response.json();

        if (!Array.isArray(data)) {
          setProducts([]);
          setFilteredProducts([]);
          setLoading(false);
          return;
        }

        
        const basicFiltered = data
          .filter(
            (product) =>
              product.product_type &&
              product.product_type.toLowerCase().includes(type.toLowerCase()) &&
              product.image_link &&
              (product.image_link.startsWith("http://") ||
                product.image_link.startsWith("https://"))
          )
          .slice(0, 30); 

 
        const validProducts = [];

        await Promise.all(
          basicFiltered.map(async (p) => {
            const isValid = await validateImage(p.image_link);
            if (isValid) validProducts.push(p);
          })
        );

        setProducts(validProducts);
        setFilteredProducts(validProducts);
      } catch (error) {
        console.error("Error al cargar productos:", error);
        setProducts([]);
        setFilteredProducts([]);
      }

      setLoading(false);
    };

    fetchProducts();
  }, [type]);

  useEffect(() => {
    let copy = [...products];

    if (filters.brand) {
      copy = copy.filter((p) => p.brand === filters.brand);
    }

    if (filters.maxPrice) {
      copy = copy.filter(
        (p) => parseFloat(p.price) <= parseFloat(filters.maxPrice)
      );
    }

    setFilteredProducts(copy);
  }, [filters, products]);

  const handleFilterChange = (newFilters) => setFilters(newFilters);
  const brands = [...new Set(products.map((p) => p.brand))];

  if (loading) return <p className="p-6 text-center">Cargando productos...</p>;

  return (
    <div className="flex">
      <ProductFilter brands={brands} onFilterChange={handleFilterChange} />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 w-full">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="border border-gray-300 p-4 rounded-lg hover:scale-105 transition flex flex-col"
          >
            <img
              src={product.image_link}
              alt={product.name}
              className="w-full h-60 object-cover rounded-lg mb-4"
              loading="lazy"
            />

            <h3 className="font-bold text-lg">{product.name}</h3>
            <p className="text-gray-600">{product.brand}</p>
            <p className="font-semibold mt-2">
              {parseFloat(product.price) || 0} €
            </p>

            <button
              className="mt-auto border px-4 py-2 rounded-lg hover:bg-gray-200 bg-black text-white"
              onClick={() => addToCart(product)}
            >
              Añadir al carrito
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductsList;