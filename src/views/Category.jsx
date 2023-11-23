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
  const [searchProd, setSearchProd] = useState("");
  const loadingType = "Productos";

  useEffect(() => {
    setProducts(dataBD || []);
    //TODO paginado
    // if (products.length > 12) {
    //   const paginas = Math.ceil(products.length / 3);
    // }
  }, [dataBD]);

  const filteredProducts = products.filter((item) =>
    item.Producto.toLowerCase().includes(searchProd.toLowerCase())
  );

  if (loadingBd) {
    return <Loading type={loadingType} />;
  }

  if (errorBd) {
    return <ErrorPage error={errorBd} />;
  }

  return (
    <>
      <div className="flex flex-col md:flex-row justify-center my-4">
        <input
          type="text"
          placeholder="Buscar productos aquí"
          className="border p-2 rounded-l outline-none mb-2 md:mb-0 md:mr-2"
          value={searchProd}
          onChange={(e) => setSearchProd(e.target.value)}
        />        
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {loadingBd ? (
          <div key="loadingCategory">{<Loading type={loadingType} />}</div>
        ) : errorBd ? (
          <div key="NotFoundCategory">{<ErrorPage error={errorBd} />}</div>
        ) : (
          filteredProducts.map((item) => (
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
