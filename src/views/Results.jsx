import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FilterAllCollection, GetCollection } from "../hooks/useFirestore";
import Loading from "../componentsUI/Loading";
import ErrorPage from "../componentsUI/ErrorPage";
import Card from "../componentsUI/Card";

function Results() {
  const { searcherWord } = useParams();
  const { dataBD, loadingBd, errorBd } = GetCollection("Productos");
  const [dataConsult, setDataConsult] = useState(dataBD || []);
  const loadingType="General";

  useEffect(() => {
    const filteredProducts = dataBD.filter((item) =>
      item.Producto.toLowerCase().includes(searcherWord.toLowerCase())
    );
    const filteredCategory = dataBD.filter((item) =>
    item.categoria.toLowerCase().includes(searcherWord.toLowerCase())
  );
  const filteredProductId = dataBD.filter((item) =>
  item.id.toLowerCase().includes(searcherWord.toLowerCase())
);
const combinedFilteredData = [...filteredProducts, ...filteredCategory, ...filteredProductId];

// Elimina duplicados
const uniqueCombinedFilteredData = Array.from(new Set(combinedFilteredData));

    setDataConsult(uniqueCombinedFilteredData);
  }, [dataBD,searcherWord]);

  if (loadingBd) {
    return <Loading type={loadingType} />;
  }

  if (errorBd) {
    return <ErrorPage error={errorBd} />;
  }
  return (
    <div className="container mx-auto mt-8 p-4 bg-gray-200 rounded-lg">
      <h1 className="text-2xl font-semibold mb-4 text-center">
        RESULTADO PARA: {searcherWord}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {dataConsult.map((item) => (
          <div key={item.id} className="relative">
            {item.oferta === 1 && (
              <div className="absolute top-0 right-0 mt-2 mr-2 bg-yellow-200 py-1 px-2 rounded">
                🔥 OFERTA
              </div>
            )}
            <Card product={item} categoryId={item.categoria} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Results;
