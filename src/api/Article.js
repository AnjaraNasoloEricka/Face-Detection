const url='http://localhost:8081/article';

export async function getAllArticle(){
    return fetch(url)
    .then(res=>res.json())
    .then(data=>data.data)
    .catch(err=>err)
}


export async function addArticle(titre,resume,categorie,contenu){
    return fetch(url, {       
        method:'POST',
        headers: {"Access-Control-Allow-Origin": "*",'Content-Type': 'application/json'},
        body: JSON.stringify({titre:titre,resume:resume,categorie:{id:categorie},contenu:contenu})
    }).then(res=>res.json())
    .then(data=>data)
    .catch(err=>err);
}