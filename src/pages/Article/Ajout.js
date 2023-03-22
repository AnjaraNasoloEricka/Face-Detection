import Input from "../../components/Input";
import MySelect from "../../components/MySelect";
import { getAllCategorie } from "../../api/Categorie";
import { addArticle } from "../../api/Article";
import { useEffect, useRef, useState } from "react";
import Area from "../../components/Area";
import Button from "../../components/Button";
import {CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const Ajout=()=>{
    const [allcat,setAllcat]=useState([]);
    const[message,setMessage]=useState();
    const [editorData, setEditorData] = useState('');

    const handleEditorChange = (event, editor) => {
        const data = editor.getData();
        setEditorData(data);
    }

    useEffect(()=>{
        getAllCategorie().then((data)=>setAllcat(data));
    },[message])

    const checkSuccess=(data)=>{
        if(data.succes!=undefined){
            setMessage(data.succes);
            return;
        }
        setMessage(data.erreur);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        addArticle(event.target.titre.value,event.target.resume.value,
            event.target.categorie.value,editorData)
            .then((res)=>checkSuccess(res));
    }

    return(
        <div>
            <h1>Ajout Article</h1>
            <form onSubmit={handleSubmit}>
                <Input label="Titre" type="text" nom="titre"/>
                <Area label="Resumé" nom="resume"/>
                <MySelect label="Catégorie" nom="categorie" column="typecategorie" tab={allcat}/>
                <CKEditor
                    name="contenu"
                    editor={ClassicEditor}
                    data={editorData}
                    onChange={handleEditorChange}
                />
                <Button type="submit" label="Ajouter" color="primary"/>
            </form>
            <p>{message}</p>
        </div>
    )
}

export default Ajout;