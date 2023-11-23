import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ShoppingCartIcon,
  SparklesIcon,
  Bars4Icon,
} from "@heroicons/react/24/solid";
import { createPortal } from "react-dom";
import { useCart } from "../context/CartContext";
import { GetCollection } from "../hooks/useFirestore";

function NavBarMobile() {
  const { itemsInCart } = useCart();
  const [errorData, setErrorData] = useState(null);
  const { dataBD, loadingBd, errorBd } = GetCollection("Categorias");
  const [data, setData] = useState(dataBD || []);
  const [searcherWord, setSearcherWord] = useState("");
  const [menuVisible, setMenuVisible] = useState(false);
  const navigate = useNavigate();
  const viewCategory = () => {
    setMenuVisible(!menuVisible);
  };

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

  const portalRoot = document.getElementById("portal-root");

  const handleCategoryClick = () => {
    setMenuVisible(false);
  };
  const dropdown = createPortal(
    <div
      className={`${
        menuVisible ? "block" : "hidden"
      } fixed top-16 left-0 right-0 bg-white z-50 overflow-y-auto max-h-64`}
    >
      <ul>
        {data.map((category) => (
          <li
            key={category.id}
            className="flex justify-start p-2 border-b hover:bg-gray-100"
          >
            <Link
              to={`/productos/${category.id}`}
              onClick={handleCategoryClick}
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
    </div>,
    portalRoot
  );

  const handleLogin =()=>{
    navigate("/muyPronto");
  }
  return (
    <>
    <div className="fixed top-0 left-0 right-0 z-50 bg-lime-50 text-green-900">
      <div className="flex justify-between items-center p-2 border-b">
        <div className="flex items-center">
          <button onClick={() => setMenuVisible(!menuVisible)}>
            <Bars4Icon className="w-8 h-8" title="Menú" />
          </button>
        </div>
        <div className="flex items-center flex-grow">
          <Link to="/">
            <h1 className="text-xl font-bold">PRODUCTOS NATURALES NORMA</h1>
          </Link>
        </div>
        <form
          id="search-form"
          role="search"
          className="flex items-center"
          onSubmit={handleSearch}
        >
          <input
            id="q"
            aria-label="Search contacts"
            placeholder="Buscar productos"
            type="search"
            name="q"
            value={searcherWord}
            onChange={(e) => setSearcherWord(e.target.value)}
            className="border p-2 rounded-l outline-none"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r"
          >
            Buscar
          </button>
        </form>
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
          <button
            className="text-blue-500 hover:text-blue-700"
            onClick={handleLogin}
          >
            Iniciar sesión
          </button>
        </div>
      </div>
    </div>
    {dropdown}
  </>
  );
}

export default NavBarMobile;
