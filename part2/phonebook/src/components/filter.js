import React from 'react';

const Filter = ({setSearch}) => {
    return(
        <input onChange={({target})=>setSearch(target.value)}/>
    );
}

export default Filter;
   

