import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import head from "../../assets/head.jpg";
import UserIcon from "../UserIcon/UserIcon";
import CartIcon from "../CartIcon/CartIcon";

export default function Header() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <header className="p-4">
      <div className="flex items-center">
        
        <Link to="/">
          <img src={head} alt="Logo" className="h-20 w-80 object-cover" />
        </Link>

        <div className="flex items-center gap-4 ml-auto p-4">

          
          {user ? (
            <span className="text-lg font-semibold">
              Hola, {user.name}
            </span>
          ) : (
            <Link to="/login">
              <UserIcon />
            </Link>
          )}

          <Link to="/cart">
            <CartIcon />
          </Link>

        </div>
      </div>
    </header>
  );
}