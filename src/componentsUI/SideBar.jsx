import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronUpIcon, ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import { FilterCollectionLimit, fetchItems } from "../hooks/useFirestore";

function SideBar({ category, orientation ,productsSeller}) {
  const { dataBD}=FilterCollectionLimit("Productos","categoria",category,"==",6);
  const [productsToShow,setProductsToShow]=useState([]);
  const [dataSideBar,setDataSideBar]=useState([])
  const [currentIndex, setCurrentIndex] = useState(0);
  

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 2);
    }
  };

  const handleNext = () => {
    if (currentIndex + 2 < 6) {
      setCurrentIndex(currentIndex + 2);
    }
  };


useEffect(()=>{
if(dataBD.length!==0){
  setProductsToShow(dataBD.slice(currentIndex, currentIndex + 2));
}

},[dataBD,currentIndex]);

useEffect(()=>{
  if(productsSeller.length!==0){
  setProductsToShow(productsSeller.slice(currentIndex, currentIndex + 2));
  }
},[productsSeller,currentIndex]);

  return (
    <div className={`sidebar rounded p-4 border border-gray-300 mt-4 mb-4 relative ${orientation === "horizontal" ? "w-full flex h-[150px]" : "w-[300px] h-[400px]"}`}>
      <h2 className="text-xl font-semibold mb-4 pb-2 ">{productsSeller.length===0?"Productos Relacionados":"Productos más vendidos"}</h2>
      {productsToShow.map((product) => (
        <div>
          <Link to={`/productos/${productsSeller.length===0? category:product.categoria}/${product.id}`} key={product.id}>
          <div className={`flex ${orientation === "horizontal" ? "h-full divide-x-[4px]" : "items-center divide-y-[8px]"} mb-4 p-4`}>
            <img
              src={product.url}
              alt={product.Producto}
              className="w-16 h-16 mr-4 rounded"
            />
            <div>
              <Link
                to={`/productos/${productsSeller.length===0? category:product.categoria}/${product.id}`}
                className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white no-underline hover:underline"
              >
                {product.Producto}
              </Link>
              <p className="text-gray-700">{product.marca}</p>
            </div>
          </div>
        </Link>
        </div>
        
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
