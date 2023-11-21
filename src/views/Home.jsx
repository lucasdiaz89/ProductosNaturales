import { Link } from "react-router-dom";
import { GetCollection } from "../hooks/useFirestore";
import Loading from "../componentsUI/Loading";
import { useEffect, useState } from "react";
import ErrorPage from "../componentsUI/ErrorPage";

function Home() {
  const [errorData, setErrorData] = useState(null);
  const { dataBD, loadingBd, errorBd } = GetCollection("Categorias");
  const [data, setData] = useState(dataBD || []);
  const loadingType = "General";
  useEffect(() => {
    setData(dataBD || []);
  }, [dataBD]);

  useEffect(() => {
 
    setErrorData(errorBd);
  }, [errorBd]);
  
  if (loadingBd) {
    return <Loading type={loadingType} />;
  }
  
  if (errorBd) {
    return <ErrorPage error={errorBd} />;
  }
  return (
    <div className="flex flex-wrap justify-center items-center space-x-4 p-4">
      {
        data.map((category) => (
          <div
            key={category.id}
            className="relative w-[300px] h-[400px] overflow-hidden mb-4"
          >
            <div
              className="w-full h-full bg-cover bg-center rounded-lg"
              style={{
                backgroundImage: `url(${category.url})`,
                pointerEvents: "none",
              }}
            ></div>
            <Link
              className="absolute inset-0 flex items-center justify-center text-white bg-gray-500 bg-opacity-0 hover:bg-opacity-50 transition-all duration-300 ease-in-out"
              to={`/productos/${category.id}`}
            >
              <div className="text-center py-2 px-4  border border-white text-white hover:bg-white hover:text-black transition-all duration-300 ease-in-out">
                {category.id}
              </div>
            </Link>
          </div>
        ))
      }
    </div>
  );
}

export default Home;
