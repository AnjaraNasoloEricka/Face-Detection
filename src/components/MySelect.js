import { useEffect, useState } from "react";

const MySelect=({nom,label,tab,column})=>{
    const[array,setArray]=useState();

    return (
        <p>
            {label+ "   : "}
            <select name={nom}>
                {tab?.map((item)=>{
                    return(
                        <option value={item.id}>{item[column]}</option>
                    )
                })}
            </select>
        </p>
    );
}
export default MySelect;