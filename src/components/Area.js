const Area=({nom,label})=>{
    return (
        <p>
            {label+ "   : "}
            <textarea name={nom} ></textarea>
        </p>
    );
}
export default Area;