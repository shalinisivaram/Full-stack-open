//import logo from './logo.svg';
import './App.css';
import React,{useState,useEffect} from 'react';
import axios from 'axios';
import Name from './components/name';
import Filter from './components/filter';
import AddForm from './components/addform';
//import { names } from 'debug';

const App = () => {
  const [persons,setPersons] = useState([]);
  const [newName,setNewName] =useState('');
  const [newNumber,setNewNumber] =useState('');
  const [search,setSearch] =useState('');

  useEffect(() => {
    console.log("Effect")
    axios.get("http://localhost:3001/persons")
    .then(response => {
      console.log('promise fulfilled')
      setPersons(response.data)
    })
  },[])
  const addPerson = (event) => {
    event.preventDefault();
    const namesMatch = (name1,name2) =>
     name1.toLowerCase() === name2.toLowerCase();

    const match = persons.find((person) => namesMatch(person.name,newName))
    if(match){
      window.alert(`${newName} is already added to phonebook`)
    }
    const nameObject = {
      name:newName,
      number:newNumber
    }
    setPersons(persons.concat(nameObject))
    setNewName('')
    setNewNumber('')
  }

  const addNewName = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const addNewNumber = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  
    const nameToShow = search === ''? persons:persons.filter((person)=>
      person.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter setSearch={setSearch}/>
      <AddForm onSubmit={addPerson} newName={newName} addNewName={addNewName} newNumber={newNumber} addNewNumber={addNewNumber}/>
      <h2> Numbers </h2>
      {nameToShow.map ((person) => <Name key={person.name} person={person}/>)}
    </div>
  )
}


export default App;
