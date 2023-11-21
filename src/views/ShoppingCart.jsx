import React, { useEffect, useState, useRef } from "react";
import { useCart } from "../context/CartContext";
import { TrashIcon } from "@heroicons/react/24/solid";
import {
  AddDocument,
  GetDocumentById,
} from "../hooks/useFirestore";
import Loading from "../componentsUI/Loading";
import { useForm } from "react-hook-form";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/config";

function ShoppingCart() {
  const { cart, updateQuantity, removeFromCart } = useCart();
  const [total, setTotal] = useState(0);
  const [dataMO, setDataMO] = useState({});
  const [cartItems, setCartItems] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const [errorData, setErrorData] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const formRef = useRef(null);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

console.log(cart);

  useEffect(() => {
    const getCartItemsData = () => {
      try {
        const updatedCartItems = [];

        for (const item of cart) {
          const { dataBD, loadingBd, errorBd } = GetDocumentById(
            "Productos",
            item.productId
          );
          console.log("Paso 2");

          if (loadingBd) {
            setLoadingData(true);
          }

          if (errorBd) {
            setErrorData(errorBd);
          }

          updatedCartItems.push(dataBD);
        }

        console.log("Updated Cart Items:", updatedCartItems);
        setCartItems(updatedCartItems);
        setLoadingData(false);
      } catch (error) {
        setErrorData(error.message);
      }
    };

    if (cart.length > 0) {
      setLoadingData(true);
      setErrorData(null);
      getCartItemsData();
    }
  }, [cart]);

  const handleUpdateQuantity = (product, newQuantity) => {
    const prodCart = {
      productId: product.id,
      productCount: newQuantity,
    };
    updateQuantity(prodCart);
    updateTotal();
  };

  const handleRemoveFromCart = (product) => {
    const prodCart = {
      productId: product.id,
      productCount: product.disponible,
    };
    removeFromCart(prodCart);
    updateTotal();
  };

  const updateTotal = () => {
    const newTotal = cartItems.reduce((acc, item) => {
      return acc + item.productCount * item.precio;
    }, 0);
    setTotal(newTotal);
  };

  useEffect(() => {
    updateTotal();
  }, [cartItems]);

  const handleMakeAnOrder = () => {
    setShowForm(true);
    setTimeout(() => {
      if (formRef.current) {
        formRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 0);
  };

      
  const submitClick = handleSubmit(async (data) => {
    const order = {
      Nombre: data.nombreApellido,
      Email:  data.email,
      items: cartItems,
      totalPrice: total,
    };


    const itemsRef = collection(db, "Pedidos");


    addDoc(itemsRef, order)
        .then((res) => {
          if (res) {
            setDataMO({ id: res.id, ...res });
          } else {
            setErrorMO("No se encontró " + filter + " en " + collectionName);
          }
        })

  });

  return (
    <>
      <div className="flex p-12 border my-4">
        <div className="flex flex-col w-2/3 pr-4 border-r">
          <h2 className="text-2xl font-semibold mb-4 bg-gray-200 p-2">
            Productos
          </h2>
          {cartItems.length === 0 ? (
            <p className="text-gray-700">El carrito está vacío</p>
          ) : errorData ? (
            <div>{<ErrorPage error={errorData} />}</div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b py-2"
              >
                <div className="flex items-center">
                  <img
                    src={item.url}
                    alt={item.Producto}
                    className="w-12 h-12 object-cover mr-4"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{item.Producto}</h3>
                    <p className="text-gray-700">Marca: {item.marca}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    className="bg-gray-400 hover:bg-silver-600 text-white font-bold py-1 px-2 rounded"
                    onClick={() =>
                      handleUpdateQuantity(item, item.productCount - 1)
                    }
                  >
                    -
                  </button>
                  <span className="text-base font-semibold mx-4">
                    {item.productCount}
                  </span>
                  <button
                    className="bg-gray-400 hover:bg-silver-600 text-white font-bold py-1 px-2 rounded"
                    onClick={() =>
                      handleUpdateQuantity(item, item.productCount + 1)
                    }
                  >
                    +
                  </button>
                  <button
                    className="text-red-600 p-0"
                    onClick={() => handleRemoveFromCart(item)}
                  >
                    <TrashIcon className="w-8 h-8" title="Eliminar Producto" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="flex flex-col w-1/3 pl-4">
          <h2 className="text-2xl font-semibold mb-4 bg-gray-200 p-2">Total</h2>
          <div className="mb-2">
            <div className="flex justify-between border-b py-2">
              <span>Subtotal:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between border-b py-2">
              <span>Envío:</span>
              <span>$0.00</span>
            </div>
          </div>
          <div className="border-t py-2">
            <div className="flex justify-between">
              <span className="font-semibold">Total:</span>
              <span className="font-semibold">${(total + 0).toFixed(2)}</span>
            </div>
          </div>
          <button
            className="mt-4 bg-blue-500 text-white font-bold py-2 px-4 rounded"
            onClick={handleMakeAnOrder}
          >
            Realizar Pedido
          </button>
        </div>
      </div>

      {showForm && (
        <div className=" p-12 border my-16" ref={formRef}>
          <h2 className="text-2xl font-semibold mb-4 bg-gray-200 p-2 text-center my-4">
            Finalizar pedido
          </h2>
          <form onSubmit={submitClick}>
            <div className="mb-4">
              <label
                className="block text-sm font-semibold mb-1"
                htmlFor="nombreApellido"
              >
                Nombre y Apellido:
              </label>
              <input
                className="block w-full p-2 border rounded"
                {...register("nombreApellido", {
                  required: true,
                  minLength: 8,
                })}
                placeholder="Nombre y Apellido"
              />
              {errors.nombreApellido && (
                <span className="text-sm text-red-600">
                  Nombre y Apellido requeridos (mínimo 8 caracteres)
                </span>
              )}
            </div>
            <div className="mb-4">
              <label
                className="block text-sm font-semibold mb-1"
                htmlFor="email"
              >
                Email:
              </label>
              <input
                className="block w-full p-2 border rounded"
                {...register("email", { required: true })}
                placeholder="Ingrese su email"
                type="text"
              />
            </div>
            {errors.email && (
              <span className="text-sm text-red-600">Email requerido</span>
            )}

            <input
              className="block w-full p-2 border bg-blue-500 text-white font-bold pt-2"
              type="submit"
              value="Confirmar Pedido"
            />
          </form>
        </div>
      )}
    </>
  );
}

export default ShoppingCart;
