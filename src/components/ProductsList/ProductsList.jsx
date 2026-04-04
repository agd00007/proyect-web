import { useEffect, useState } from "react";
import ProductFilter from "../ProductFilter/ProductFilter";
import { useCart } from "../context/CartContext";

function ProductsList({ type }) {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({ brand: "", maxPrice: "" });
  const [loading, setLoading] = useState(true);

  // 🔥 comprobar imagen sin bloquear UI
  const checkImage = (url) =>
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
        const res = await fetch(
          `https://makeup-api.herokuapp.com/api/v1/products.json?product_type=${type}`
        );
        const data = await res.json();

        if (!Array.isArray(data)) {
          setLoading(false);
          return;
        }

        // ⚡ filtro rápido inicial
        const basic = data
          .filter(
            (p) =>
              p.product_type &&
              p.product_type.toLowerCase().includes(type.toLowerCase()) &&
              p.image_link &&
              p.image_link.startsWith("http")
          )
          .slice(0, 30); // equilibrio velocidad/calidad

        // 🔥 validación en paralelo (rápida)
        const checks = await Promise.all(
          basic.map(async (p) => ({
            product: p,
            valid: await checkImage(p.image_link),
          }))
        );

        const validProducts = checks
          .filter((item) => item.valid)
          .map((item) => item.product);

        setProducts(validProducts);
        setFilteredProducts(validProducts);
      } catch (err) {
        console.error(err);
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

  if (loading)
    return (
      <p className="p-6 text-center text-lg animate-pulse">
        Cargando productos...
      </p>
    );

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
              className="w-full h-60 object-cover rounded-lg mb-4 bg-gray-100"
              loading="lazy"
            />

            <h3 className="font-bold text-lg line-clamp-2">
              {product.name}
            </h3>

            <p className="text-gray-600">{product.brand || "Sin marca"}</p>

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