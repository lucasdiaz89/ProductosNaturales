import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/config";

export const GetCollection = (collectionName) => {
  const [dataBD, setDataBD] = useState([]);
  const [loadingBd, setLoadingBd] = useState(true);
  const [errorBd, setErrorBd] = useState(null);

  useEffect(() => {
    const itemsRef = collection(db, collectionName);
    getDocs(itemsRef)
      .then((res) => {
        if (res.size === 0) {
          setErrorBd("No se encontraron elementos para " + collectionName);
        }
        setDataBD(res.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      })
      .catch((error) => {
        setErrorBd(error);
      })
      .finally(() => {
        setLoadingBd(false);
      });
  }, [collectionName]);

  return { dataBD, loadingBd, errorBd };
};

export const GetDocumentById = (collectionName, id) => {
  const [dataBD, setDataBD] = useState({});
  console.log("GetDocumentById", id);
  const [loadingBd, setLoadingBd] = useState(true);
  const [errorBd, setErrorBd] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingBd(true);
        setErrorBd(null);

        const itemRef = doc(db, collectionName, id);
        const res = await getDoc(itemRef);

        if (res.exists()) {
          setDataBD({ id: res.id, ...res.data() });
        } else {
          setErrorBd(`No se encontró ${id} en ${collectionName}`);
        }
      } catch (error) {
        setErrorBd(error.message);
      } finally {
        setLoadingBd(false);
      }
    };

    fetchData();
  }, [collectionName, id]);

  return { dataBD, loadingBd, errorBd };
};

export const FilterCollectionLimit = (
  collectionName,
  filterDocument,
  filter,
  operator,
  limitArray
) => {
  const [dataBD, setDataBD] = useState([]);
  const [loadingBd, setLoadingBd] = useState(true);
  const [errorBd, setErrorBd] = useState(null);

  useEffect(() => {
    if (filter === "") {
      setDataBD([]);
      setErrorBd(null);
      setLoadingBd(false);
    } else {
      const queryFilter = query(
        collection(db, collectionName),
        where(filterDocument, operator, filter),
        limit(limitArray)
      );

      getDocs(queryFilter)
        .then((res) => {
          if (res.size !== 0) {
            setDataBD(res.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
          } else {
            setErrorBd("No se encontró " + filter + " en " + collectionName);
          }
        })
        .catch((error) => {
          setErrorBd(error);
        })
        .finally(() => {
          setLoadingBd(false);
        });
    }
  }, [filter]);

  return { dataBD, loadingBd, errorBd };
};

export const FilterAllCollection = (
  collectionName,
  filterDocument,
  filter,
  operator
) => {
  const [dataBD, setDataBD] = useState([]);
  const [loadingBd, setLoadingBd] = useState(true);
  const [errorBd, setErrorBd] = useState(null);

  useEffect(() => {
    const queryFilter = query(
      collection(db, collectionName),
      where(filterDocument, operator, filter)
    );

    getDocs(queryFilter)
      .then((res) => {
        if (res.size !== 0) {
          setDataBD(res.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        } else {
          setErrorBd(
            "No se pudo realizar el pedido, intentelo nuevamente mas tarde, dispculpe las molestias"
          );
        }
      })
      .catch((error) => {
        setErrorBd(error);
      })
      .finally(() => {
        setLoadingBd(false);
      });
  }, [filter]);

  return { dataBD, loadingBd, errorBd };
};

export const AddDocument = (collectionName, order) => {
  const [dataMO, setDataMO] = useState({});
  const [loadingMO, setLoadingMO] = useState(true);
  const [errorMO, setErrorMO] = useState(null);

  const itemsRef = collection(db, collectionName);

  addDoc(itemsRef, order)
    .then((res) => {
      if (res.exists()) {
        setDataMO({ id: res.id, ...res.data() });
      } else {
        setErrorMO("No se encontró " + filter + " en " + collectionName);
      }
    })
    .catch((error) => {
      setErrorMO(error);
    })
    .finally(() => {
      setLoadingMO(false);
    });
  return { dataMO, loadingMO, errorMO };
};

export const FilterCollectionWord = (
  collectionName,
  filterDocument,
  filter
) => {
  const [dataRes, setDataRes] = useState([]);
  const [loadingRes, setLoadingRes] = useState(true);
  const [errorRes, setErrorRes] = useState(null);

  useEffect(() => {
    const queryFilter = query(
      collection(db, collectionName),
      where(filterDocument, ">=", filter)
    );
  }, [filter]);

  addDoc(itemsRef, order)
    .then((res) => {
      if (res.exists()) {
        setDataMO({ id: res.id, ...res.data() });
      } else {
        setErrorMO("No se encontró " + filter + " en " + collectionName);
      }
    })
    .catch((error) => {
      setErrorMO(error);
    })
    .finally(() => {
      setLoadingMO(false);
    });

  return { dataMO, loadingMO, errorMO };
};

export const fetchItems = async (ItemsSearch) => {
  try {
    console.log(ItemsSearch);
    const promises = ItemsSearch.map(async (item) => {
      const itemRef = doc(db, "Productos", item.productId);

      const res = await getDoc(itemRef);

      if (res.exists()) {
        return { id: res.id, ...res.data() };
      } else {
        throw new Error();
      }
    });
    const itemsData = await Promise.all(promises);
    return itemsData;
  } catch (error) {
    throw new Error(error);
  }
};
