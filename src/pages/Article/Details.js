import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ReactDOM from 'react-dom';
import { Helmet } from "react-helmet";


const Details=()=>{
    const[article,setArticle]=useState(null);
    const location=useLocation();

    useEffect(()=>{
        setArticle(location.state.article);
    },[])

    return (
        <div>
            <Helmet>
                <title>{article?.titre}</title>
                <meta name="description" content={article?.resume} />
            </Helmet>
            <h6>{article?.categorie.typecategorie}</h6>
            <h1>{article?.titre}</h1>
            <small>{article?.resume}</small>
            <div dangerouslySetInnerHTML={{ __html: article?.contenu }}></div>
        </div>
    )
}

export default Details;