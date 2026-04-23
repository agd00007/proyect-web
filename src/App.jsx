import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Catalog from "./components/Catalog/Catalog";
import Carousel from "./components/Carousel/Carousel";
import ProductsListPage from "./components/ProductsListPage/ProductsListPage";
import Cart from "./components/Cart/Cart";
import Header from "./components/Header/Header";
import Register from "./components/Register/Register";
import RegisterPage from "./components/RegisterPage/RegisterPage";
import AdminApp from "./admin/AdminApp";

import { CartProvider } from "./components/context/CartContext";

function MainApp() {
  return (
    <>
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
    </>
  );
}

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/admin/*" element={<AdminApp />} />
          <Route path="/*" element={<MainApp />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;