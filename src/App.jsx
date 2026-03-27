import Catalog from "./components/Catalog/Catalog";
import "./index.css";
import ProductsListPage from "./components/ProductsListPage/ProductsListPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Carousel from "./components/Carousel/Carousel";

import { CartProvider } from "./components/context/CartContext";
import Cart from "./components/Cart/Cart";
import Register from "./components/Register/Register";
import Header from "./components/Header/Header"; 
import ProductsList from "./components/ProductsList/ProductsList";

function App() {
  return (
    <CartProvider>
      <Router>
       
        <Header />

       
        <Routes>
         
          <Route
            path="/"
            element={
              <>
                <Catalog />
                <Carousel />
              </>
            }
          />
          <Route path="/products/:type" element={<ProductsListPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;