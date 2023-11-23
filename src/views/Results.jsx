import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FilterAllCollection } from "../hooks/useFirestore";

function Results(){
    
    const {searcherWord}=useParams();
    const { dataBD, loadingBd, errorBd } = FilterAllCollection(
        "Productos",
        "Producto",
        searcherWord,"<="
      );
    const [dataConsult,setDataConsult]=useState(dataBD||[])

    useEffect(()=>{
        setDataConsult(dataBD);
    },[searcherWord])

    return(
        <>
        <p>Resultado de Busqueda</p>
        </>
    );
}

export default Results;