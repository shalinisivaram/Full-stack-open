import Weather from './weather';

const Countryinformation = ({country}) => {
    return(
        <div>
             <h2>{country.name}</h2>
             <p>Capital: {country.capital} </p>
              <p>  Population: {country.population}</p>
            <p><h2>Languages</h2>
            <ul>
                {country.languages.map((language,i) =>(
                    <li key={i}>{language.name}</li>
                ))}</ul></p>
            <img src={country.flag} width="100" alt='flag'></img>
            <Weather country={country}/>
        </div>

    )
}

export default Countryinformation;