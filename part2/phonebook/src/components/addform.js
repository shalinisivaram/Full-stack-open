import React from 'react'

const AddForm = ({onSubmit,newName,addNewName,newNumber,addNewNumber}) => 
    <form onSubmit = {onSubmit}>
        <h2>Add Contact</h2>
        Name:<input value={newName} onChange={addNewName}/> <br/> <br/>
        Number:<input value={newNumber} onChange={addNewNumber}/>
        <button type="submit">Save</button>
      </form>


export default AddForm;



