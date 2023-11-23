import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import NavBar from "./componentsUI/NavBar";
import NavBarHorizontal from "./componentsUI/NavBarHorizontal";
import Home from "./views/Home";
import Category from "./views/Category";
import ComingSoon from "./views/ComingSoon";
import Favorites from "./views/Favorites";
import NotFound from "./views/NotFound";
import Product from "./views/Product";
import Results from "./views/Results";
import ShoppingCart from "./views/ShoppingCart";
import OrderMade from "./views/OrderMade";

function App() {
  return (
    <>
      <CartProvider>
        <BrowserRouter>
          <div className="flex min-h-screen ">
            <NavBar />
            <div
              id="detail"
              className="flex-1 flex flex-col w-full"
            >
              <NavBarHorizontal />
              <div className="bg-green-100/25 p-12 min-h-screen ">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/productos/:categoryId" element={<Category />} />
                  <Route
                    path="/productos/:categoryId/:productId"
                    element={<Product />}
                  />
                  <Route path="/carrito" element={<ShoppingCart />} />
                  <Route path="/resultado/:searcherWord" element={<Results />} />
                  <Route path="*" element={<NotFound />} />
                  <Route path="/favoritos" element={<Favorites />} />
                  <Route path="/muyPronto" element={<ComingSoon />} />
                  <Route path="/miPedido/:idOrder" element={<OrderMade />} />                  
                </Routes>
              </div>
            </div>
          </div>
        </BrowserRouter>
      </CartProvider>
    </>
  );
}

export default App;
