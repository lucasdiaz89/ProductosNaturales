import { Link, Navigate, useNavigate } from "react-router-dom";
import {
  ShoppingCartIcon,
  HeartIcon,
  SparklesIcon,
  HomeIcon,
  Bars4Icon,
} from "@heroicons/react/24/solid";
import Footer from "./Footer";
import { useCart } from "../context/CartContext";
import { GetCollection } from "../hooks/useFirestore";
import { useEffect, useState } from "react";
import Loading from "./Loading";
import ErrorPage from "./ErrorPage";

function NavBar() {
  const { itemsInCart } = useCart();
  const [errorData, setErrorData] = useState(null);
  const { dataBD, loadingBd, errorBd } = GetCollection("Categorias");
  const [data, setData] = useState(dataBD || []);
  const [searcherWord, setSearcherWord] = useState("");
  const loadingType = "NavBar";
  const navigate = useNavigate();

  
  
  useEffect(() => {
    setData(dataBD || []);
  }, [dataBD]);

  useEffect(() => {
    setErrorData(errorBd);
  }, [errorBd]);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/resultado/${searcherWord}`);
    setSearcherWord("");
  };

  return (
    <>
      <div id="sidebar" className="max-w-xl mx-auto mt-20">
        <div>
        <form id="search-form" role="search" className="mt-2 flex" onSubmit={handleSearch}>
            <input
              id="q"
              aria-label="Search contacts"
              placeholder="Buscar productos"
              type="search"
              name="q"
              value={searcherWord}
              onChange={(e) => setSearcherWord(e.target.value)}
              className="border p-2 rounded-l outline-none w-full"
            />
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r">
              Buscar
            </button>
          </form>
        </div>
        <div className="mb-4">
          <Link
            to="/Favoritos"
            className="flex items-center space-x-2 p-2 border-b"
          >
            <HeartIcon className="w-6 h-6" />
            Favoritos
          </Link>
          <Link
            to="/carrito"
            className="flex items-center space-x-2 p-2 border-b"
          >
            <ShoppingCartIcon className="w-6 h-6" />
            Mi Carrito
            {itemsInCart > 0 && (
              <div className=" bg-red-500 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                {itemsInCart}
              </div>
            )}
          </Link>
        </div>
        <nav>
          {loadingBd ? (
            <div key="loadingNavBar">{<Loading type={loadingType} />}</div>
          ) : errorData ? (
            <div key="NotFoundNavBar">{<ErrorPage error={errorData} />}</div>
          ) : (
            <ul>
              <li key="home" className="flex justify-start p-2 border-b">
                <Link to="/">
                <span style={{ fontSize: "20px" }}>
                      <HomeIcon className="w-4 h-4" />
                    </span>
                    <span style={{ fontSize: "16px", color: "black" }}>
                      Inicio
                    </span>
                </Link>
              </li>

              {data.map((category) => (
                <li key={category.id} className="flex justify-start p-2 border-b">
                  <Link
                    to={`/productos/${category.id}`}                    
                  >
                    <span style={{ fontSize: "20px" }}>
                      <SparklesIcon className="w-4 h-4" />
                    </span>
                    <span style={{ fontSize: "16px", color: "black" }}>
                      {category.descripcion}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </nav>
        <Footer />
      </div>
    </>
  );
}

export default NavBar;
