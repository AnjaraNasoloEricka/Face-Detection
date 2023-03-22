import { Link } from "react-router-dom";

function slugTitre(titre){
    return titre.toString().toLowerCase()
    .replace(/[\s,.;:?!]/,'-')
    .replace(/\s+/g,'-');
}

function lienDetailArticle(titre){
    return "/detail/"+slugTitre(titre);
}

const ArticleList=({tab})=>{
    return (
        <table border={1}>
            <tr>
                <th>Id</th>
                <th>Categorie</th>
                <th>Titre</th>
                <th>Détails</th>
            </tr>
            {tab?.map((item)=>{
                return (
                    <tr>
                        <td>{item?.id}</td>
                        <td>{item?.categorie.typecategorie}</td>
                        <td>{item?.titre}</td>
                        <td><Link to={lienDetailArticle(item?.titre)} state={{article:item}}>Détails</Link></td>
                    </tr>
                )
            })}
        </table>
    )
}

export default ArticleList;