import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import SideBar from "../componentsUI/SideBar";
import { GetDocumentById } from "../hooks/useFirestore";
import Loading from "../componentsUI/Loading";
import ErrorPage from "../componentsUI/ErrorPage";

function Product() {
  const { productId } = useParams();
  const { cart, addToCart, updateQuantity } = useCart();
  const { dataBD, loadingBd, errorBd } = GetDocumentById("Productos", productId);

  const cartItem = cart.find((ls) => ls.productId === productId);
  const cartItemCount = cartItem?.productCount || 0;

  const [productPage, setProductPage] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const loadingType = "General";

  const product = (productPg) => {
    if (cartItem) {
      productPg.productCount = cartItemCount;
    }
    return productPg;
  };

  const increment = () => {
    if (quantity < 10) {
      setQuantity(quantity + 1);
    }
  };

  const decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    const newItemCart = {
      productId: productPage.id,
      productCount: cartItemCount,
    };

    const existingItem = cart.find(
      (item) => item.productId === newItemCart.productId
    );

    if (existingItem) {
      updateQuantity(newItemCart);
    } else {
      addToCart(newItemCart);
    }
  };

  useEffect(() => {
    if (dataBD) {
      const newPrd = {
        ...dataBD,
        productCount: 1,
      };
      const productView = product(newPrd);
      setQuantity(productView.productCount);
      setProductPage(productView);
    }
  }, [dataBD]);

  if (loadingBd) {
    return <Loading type={loadingType} />;
  }

  if (errorBd) {
    return <ErrorPage error={errorBd} />;
  }

  return (
    <div className="flex flex-col md:flex-row p-4">
      <div className="w-[36rem] mt-2 mb-2 ml-1 mr-1">
        <div className="w-3/4p-4">
          <h1 className="text-3xl font-semibold mb-2">
            {productPage.Producto}
          </h1>
          <p className="text-lg text-gray-700 mb-2">{productPage.marca}</p>
          <p className="text-lg text-gray-700 mb-4">
            {productPage.descripcion}
          </p>
          <div className="text-2xl font-bold mb-2">
            {productPage.disponible === 0
              ? "SIN STOCK"
              : `$${productPage.precio}`}
          </div>
          {productPage.disponible > 0 && (
            <div className="flex items-center mb-4">
              <button
                className="bg-gray-400 hover:bg-silver-600 text-white font-bold py-1 px-2 rounded"
                onClick={decrement}
              >
                -
              </button>
              <span className="text-base font-semibold mx-4">{quantity}</span>
              <button
                className="bg-gray-400 hover:bg-silver-600 text-white font-bold py-1 px-2 rounded"
                onClick={increment}
              >
                +
              </button>
            </div>
          )}
          {productPage.disponible > 0 && (
            <button
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm py-2.5 w-full"
              onClick={handleAddToCart}
            >
              Agregar al carrito
            </button>
          )}
        </div>
        <div className="w-1/4 ml-4 mt-4 ">
          <img
            src={productPage.url}
            alt={productPage.Producto}
            className="w-full h-auto md:float-right"
          />
        </div>
      </div>

      {productPage.id && !loadingBd && (
        <SideBar
          category={productPage.categoria}
          orientation="vertical"
        />
      )}
    </div>
  );
}

export default Product;
