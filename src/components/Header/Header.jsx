import { Link } from "react-router-dom";
import head from "../../assets/head.jpg";
import UserIcon from "../UserIcon/UserIcon";
import CartIcon from "../CartIcon/CartIcon";

export default function Header() {
  return (
    <header className="p-4">
      <div className="flex items-center ">
        
        <Link to="/" className="">
          <img
            src={head}
            alt="Logo"
            className="h-20 w-80 object-cover "
          />
        </Link>

        
        <div className="flex items-center gap-3 ml-auto p-4 ">
          <UserIcon  />
          <CartIcon />
        </div>
      </div>
    </header>
  );
}
