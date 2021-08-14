import { useState } from "react";
import Countryinformation from "./countryinformation";


const Country = ({country}) => {
    const[show,setShow] = useState(false);
    if(show){
        return(
            <div>
            <h2>{country.name}</h2>
            <button onClick={()=> setShow(!show)}>{show === false ? 'show':'hide'}</button>
            <Countryinformation country={country}/>
            </div>     
        );
    }
    return(
        <di>
            <h2>{country.name}</h2>
            <button onClick={() => setShow(!show)}>{show === false ? 'show':'hide'}</button>
        </di>
    )
    
}

export default Country;