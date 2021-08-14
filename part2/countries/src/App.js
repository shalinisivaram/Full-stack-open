import { useState,useEffect } from 'react';
import './App.css';
import axios from 'axios';
import Countryinformation from './components/countryinformation';
import Country from './components/country';

const App = () => {
  const [countries,setCountries] = useState([])
  const [search,setSearch] = useState('')
  
  useEffect(()=>{ 
    axios.get("https://restcountries.eu/rest/v2/all")
    .then(response => {
      setCountries(response.data)
    })
  },[])

  const handleSearchChange = (event) => setSearch(event.target.value)

  const countriesToShow = search === "" ? [] :countries.filter((country) => country.name.toLowerCase().includes(search.toLowerCase())
  );

  if (countriesToShow.length === 1){
    return(
      <div>
        <input onChange = {handleSearchChange}/>
        <Countryinformation country = {countriesToShow[0]}/>
      </div>
    )
  }
  else if(countriesToShow.length >= 10){
    return(
      <div>
         Find Countries: <input onChange={handleSearchChange}/>
         <p>
           Too many matches , enter specific country
         </p>
      </div>
    
    )
  }
  else{
    return (
      <div>
          Find Countries: <input onChange={handleSearchChange}/>
          {countriesToShow.map((country) => (<Country key={country.id} country={country}/>))}
      </div>
    )
  }
  
}


export default App;
