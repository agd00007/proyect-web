import { useEffect, useState } from "react";
import ProductFilter from "../ProductFilter/ProductFilter";
import { useCart } from "../context/CartContext";

function ProductsList({ type }) {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({ brand: "", maxPrice: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        await fetch(`http://localhost:3000/products?productType=${type}&refresh=true`);
        const response = await fetch(`http://localhost:3000/products?productType=${type}`);
        const data = await response.json();

        if (!Array.isArray(data)) {
          setProducts([]);
          setFilteredProducts([]);
          setLoading(false);
          return;
        }

        // Filtramos productos que tengan image_link válido
        const validProducts = data.filter(
          (p) =>
            p.product_type &&
            p.product_type.toLowerCase().includes(type.toLowerCase()) &&
            p.image_link &&
            (p.image_link.startsWith("http://") || p.image_link.startsWith("https://"))
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
    if (filters.brand) copy = copy.filter((p) => p.brand === filters.brand);
    if (filters.maxPrice)
      copy = copy.filter((p) => parseFloat(p.price) <= parseFloat(filters.maxPrice));
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
            key={product._id}
            className="border border-gray-300 p-4 rounded-lg hover:scale-105 transition flex flex-col"
          >
            <img
              src={product.image_link}
              alt={product.name}
              className="w-full h-60 object-cover rounded-lg mb-4"
              onError={() => {
                // Eliminamos el producto si la imagen falla
                setFilteredProducts((prev) => prev.filter((p) => p._id !== product._id));
                setProducts((prev) => prev.filter((p) => p._id !== product._id));
              }}
            />

            <h3 className="font-bold text-lg">{product.name}</h3>
            <p className="text-gray-600">{product.brand}</p>
            <p className="font-semibold mt-2">{parseFloat(product.price) || 0} €</p>

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