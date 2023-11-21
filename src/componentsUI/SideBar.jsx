import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronUpIcon, ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import { FilterCollectionLimit } from "../hooks/useFirestore";
import { data } from "autoprefixer";

function SideBar({ category, orientation }) {
  const { dataBD, loadingBd, errorBd }=FilterCollectionLimit("Productos","categoria",category,"==",6);
  const [productsToShow,setProductsToShow]=useState([]);

  const [currentIndex, setCurrentIndex] = useState(0);
  

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 2);
    }
  };

  const handleNext = () => {
    if (currentIndex + 2 < dataBD.length) {
      setCurrentIndex(currentIndex + 2);
    }
  };

useEffect(()=>{
   setProductsToShow(dataBD.slice(currentIndex, currentIndex + 2));
},[dataBD,currentIndex]);

  return (
    <div className={`sidebar rounded p-4 border border-gray-300 mt-4 mb-4 relative ${orientation === "horizontal" ? "w-full flex h-[150px]" : "w-[300px] h-[400px]"}`}>
      <h2 className="text-xl font-semibold mb-4 border-b pb-2">Productos Relacionados</h2>
      {productsToShow.map((product) => (
        <Link to={`/productos/${category}/${product.id}`} key={product.id}>
          <div className={`flex ${orientation === "horizontal" ? "h-full" : "items-center"} mb-4 p-4 border-b`}>
            <img
              src={product.url}
              alt={product.Producto}
              className="w-16 h-16 mr-4 rounded"
            />
            <div>
              <Link
                to={`/productos/${category}/${product.id}`}
                className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white no-underline hover:underline"
              >
                {product.Producto}
              </Link>
              <p className="text-gray-700">{product.marca}</p>
            </div>
          </div>
        </Link>
      ))}
      {orientation === "vertical" && (
        <>
          <ChevronUpIcon className="absolute top-4 right-4 h-8 w-8 cursor-pointer" onClick={handlePrev} />
          <ChevronDownIcon className="absolute bottom-4 right-4 h-8 w-8 cursor-pointer" onClick={handleNext} />
        </>
      )}
      {orientation === "horizontal" && (
        <>
          <ChevronLeftIcon className="absolute top-20 left-6 transform h-8 w-8  cursor-pointer" onClick={handlePrev} />
          <ChevronRightIcon className="absolute top-20 right-4 transform h-8 w-8  cursor-pointer" onClick={handleNext} />
        </>
      )}
    </div>
  );
}

export default SideBar;
