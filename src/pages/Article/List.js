import { useEffect, useState } from "react";
import { getAllArticle } from "../../api/Article";
import ArticleList from "../../components/ArticleList";

const List=()=>{
    const [allarticle,setAllarticle]=useState([]);

    useEffect(()=>{
        getAllArticle().then((data)=>setAllarticle(data));
    },[])

    return (
        <div>
            <h1>Liste des articles</h1>
            <ArticleList tab={allarticle}/>
        </div>
    )
}

export default List;