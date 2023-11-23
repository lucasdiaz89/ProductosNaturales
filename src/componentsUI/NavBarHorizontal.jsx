import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

function NavBarHorizontal() {
  const { itemsInCart } = useCart();
console.log("navBarHorizontal");
  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div className="flex justify-between items-center p-2 border-b bg-lime-50 text-green-900 w-full">
        <div className="flex items-center">
          <img src="/logoCompany.svg" alt="Logo" className="w-16 h-16 mb-2 mr-4" />
        </div>
        <div className="flex items-center">
        <Link to="/"><h1 className="text-2xl font-bold">PRODUCTOS NATURALES NORMA</h1></Link>
          
        </div>
        <div className="flex items-center space-x-4">
          <Link to="/carrito">
            <div className="relative group">
              <ShoppingCartIcon className="w-8 h-8" title="Mi Carrito" />
              {itemsInCart > 0 && (
                <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                  {itemsInCart}
                </div>
              )}
            </div>
          </Link>
          <button className="text-blue-500 hover:text-blue-700">Iniciar sesión</button>
        </div>
      </div>
    </div>
  );
}

export default NavBarHorizontal;
