import React from 'react';

const Filter = ({setSearch}) => {
    return(
        <div>
           Filter shown with: <input onChange={({target})=>setSearch(target.value)}/>
        </div>
        
    );
}

export default Filter;
   

