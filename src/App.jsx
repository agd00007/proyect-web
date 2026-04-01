import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Catalog from "./components/Catalog/Catalog";
import Carousel from "./components/Carousel/Carousel";
import ProductsListPage from "./components/ProductsListPage/ProductsListPage";
import Cart from "./components/Cart/Cart";
import Header from "./components/Header/Header";
import Register from "./components/Register/Register";        // Login + botón registro
import RegisterPage from "./components/RegisterPage/RegisterPage"; // Formulario registro completo

import { CartProvider } from "./components/context/CartContext";

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
          <Route path="/login" element={<Register />} /> 
          <Route path="/registerPage" element={<RegisterPage />} /> 
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;