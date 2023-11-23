import { useParams } from "react-router-dom";
import ErrorPage from "../componentsUI/ErrorPage";
import Card from "../componentsUI/Card";
import { useEffect, useState } from "react";
import { FilterAllCollection } from "../hooks/useFirestore";
import Loading from "../componentsUI/Loading";

function Category() {
  const { categoryId } = useParams();
  const { dataBD, loadingBd, errorBd } = FilterAllCollection(
    "Productos",
    "categoria",
    categoryId,
    "=="
  );
  const [products, setProducts] = useState(dataBD || []);
  const loadingType = "Productos";

  useEffect(() => {
    setProducts(dataBD || []);
    if (products.length > 12) {
      const paginas = Math.ceil(products.length / 3);
      console.log(paginas);
    }
  }, [dataBD]);

  if (loadingBd) {
    return <Loading type={loadingType} />;
  }

  if (errorBd) {
    return <ErrorPage error={errorBd} />;
  }

  return (
    <>
      <div className="flex justify-center my-4">
        <input
          type="text"
          placeholder="Buscar productos"
          className="border p-2 rounded-l outline-none"
        />
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r">
          Buscar
        </button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {loadingBd ? (
          <div key="loadingCategory">{<Loading type={loadingType} />}</div>
        ) : errorBd ? (
          <div key="NotFoundCategory">{<ErrorPage error={errorBd} />}</div>
        ) : (
          products.map((item) => (
            <div key={item.id} className="relative">
              {item.oferta === 1 && (
                <div className="absolute top-0 right-0 mt-2 mr-2 bg-yellow-200 py-1 px-2 rounded">
                  🔥 OFERTA
                </div>
              )}
              <Card product={item} categoryId={categoryId} />
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default Category;
