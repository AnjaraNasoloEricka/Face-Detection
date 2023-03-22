const Input=({nom,type,label})=>{
    return (
        <p>
            {label+ "   : "}
            <input type={type} name={nom}/>
        </p>
    );
}
export default Input;