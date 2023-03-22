const url='http://localhost:8081/categorie';


export async function getAllCategorie(){
    return fetch(url)
    .then(res=>res.json())
    .then(data=>data.data)
    .catch(err=>err)
}
