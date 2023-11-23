import { useState } from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

function Card({ product, categoryId }) {
  const { cartStorage,isInCart,itemInACart,addToCart, updateQuantity } = useCart();
  const cartItem =itemInACart(product.id);
  const [quantity, setQuantity] = useState(isInCart(product.id) ? cartItem.productCount : 1);

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

  const handleAddToCart = (newProduct, quantity) => {
    const newItemCart={
      productId:newProduct.id,
      productCount:quantity
    }
    console.log(newItemCart);
    isInCart(newItemCart.productId)
      ? updateQuantity(newItemCart)
      : addToCart(newItemCart);
  };

  return (
    <div className="w-full w-52 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 text-center">      <img
        className="p-0.5 rounded-t-lg w-38 h-60 mx-auto"
        src={product.url}
        alt={product.Producto}
      />
      <div className="px-5 py-2">
        <Link to={`/productos/${categoryId}/${product.id}`}>
          <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white no-underline hover:underline">
            {product.Producto}
          </h5>
        </Link>
        <div className="text-sm text-gray-700 dark:text-white">
          {product.marca}
        </div>
        <div className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
          {product.disponible === 0
            ? "SIN STOCK"
            : "$" + product.precio.toFixed(2)}
        </div>
        {product.disponible > 0 && (
          <div className="flex items-center justify-center m-5">
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
        {product.disponible > 0 && (
          <div className="w-36 mx-auto">
            <button
              className="text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={() => handleAddToCart(product, quantity)}
            >
              Añadir al carrito
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Card;
