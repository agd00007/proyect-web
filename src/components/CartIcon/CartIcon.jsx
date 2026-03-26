import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function CartIcon() {
  const { cartItems } = useCart();
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Link to="/cart" className="flex items-center gap-1 text-black text-3xl">
      <FaShoppingCart />
      <span>{totalItems}</span>
    </Link>
  );
}