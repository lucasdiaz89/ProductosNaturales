import { Route, Routes } from "react-router-dom";
import Home from "../views/Home";
import Category from "../views/Category";
import ComingSoon from "../views/ComingSoon";
import Favorites from "../views/Favorites";
import NotFound from "../views/NotFound";
import Product from "../views/Product";
import Results from "../views/Results";
import ShoppingCart from "../views/ShoppingCart";
import OrderMade from "../views/OrderMade";
import NavBarMobile from "./NavBarMobile";
import Footer from "./Footer";

function AppDesktop() {
  return (
    <div className="flex min-h-screen ">
      <NavBarMobile />
      <div  className="flex-1 flex flex-col w-full pt-20">
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
          <Route path="/favoritos" element={<ComingSoon />} />
          <Route path="/muyPronto" element={<ComingSoon />} />
          <Route path="/miPedido/:idOrder" element={<OrderMade />} />
        </Routes>
        <Footer />
      </div>
    
    </div>
  );
}
export default AppDesktop;
