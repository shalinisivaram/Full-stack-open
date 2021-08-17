import React from 'react'

const Name = ({person,deleteContact}) => (
    <div>
       <h3> {person.name}:{person.number}</h3> 
       <button onClick = {()=>deleteContact(person.id)}>Delete</button>    </div>
)

export default Name;