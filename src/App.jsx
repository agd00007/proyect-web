
import Catalog from './components/Catalog';
import './index.css'; 
import head from "./assets/head.jpg";
import ProductsList from "./components/ProductsList"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Carousel from './components/Carousel';
import ProductsListPage from './components/ProductsListPage';



function App() {
  

  return (
     <div >
      <div className='bg-amber-100 w-full'>
      <img src={head} className=" h-30 w-80 object-cover rounded-lg p-2 " />
      </div>

      <Router>
        <Routes>
           <Route path="/"
            element={
              <>
              <Catalog /> <Carousel/>
              </>
            
          } >

          </Route>
          
            <Route path="/products/:type" element={<ProductsListPage />} />
        </Routes>
      </Router>
     
    </div>
   
  )
}

export default App
