import { Link } from "react-router-dom";
import { GetCollection, fetchItems } from "../hooks/useFirestore";
import Loading from "../componentsUI/Loading";
import { useEffect, useState } from "react";
import ErrorPage from "../componentsUI/ErrorPage";
import { ProductsSelled } from "../components/dataBaseSelled";
import SideBar from "../componentsUI/SideBar";

function Home() {
  const [errorData, setErrorData] = useState(null);
  const { dataBD, loadingBd, errorBd } = GetCollection("Categorias");
  const [data, setData] = useState(dataBD || []);
  const [fetchSearchItems, setFetchSearchItems] = useState([]);
  const loadingType = "General";

  useEffect(() => {
    setData(dataBD || []);
  }, [dataBD]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchItems(ProductsSelled);
        setFetchSearchItems(result);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchData();
  }, [ProductsSelled]);

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
    <>
      <div className="hidden md:flex md:flex-col p-4">
        <SideBar
          category=""
          orientation="horizontal"
          productsSeller={fetchSearchItems}
        />
      </div>

      <div className="flex flex-wrap justify-center items-center space-x-4 p-4">
        {data.map((category) => (
          <div
            key={category.id}
            className="relative w-full md:w-1/4 lg:w-1/4 xl:w-1/5 h-[400px] overflow-hidden mb-4"
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
              <div className="text-center py-2 px-4 border border-white text-white hover:bg-white hover:text-black transition-all duration-300 ease-in-out">
                {category.id}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}

export default Home;
