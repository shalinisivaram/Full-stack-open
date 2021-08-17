import axios from "axios"
import { useEffect, useState } from "react"
const key = process.env.REACT_APP_API_KEY

const Weather = ({country})=>{
  console.log(country)
 const [weather,setWeather] = useState({})
 useEffect(()=>{
     axios.get(`http://api.weatherstack.com/current?access_key=${key}&query=${country.name}`)
     .then((response) => setWeather(response.data.current));
 },[country]);
     return(
         <div>
             <h2> Weather in {country.name}</h2>
             <p><h3> Temperature:</h3>{weather.temperature} celcius</p>
             <img src={weather.weather_icons} width="100" alt="icon"/>
             <p><h3>Wind:</h3>{weather.wind_speed} mph direction {weather.wind_dir}</p>
         </div>
     )
 }

export default Weather;