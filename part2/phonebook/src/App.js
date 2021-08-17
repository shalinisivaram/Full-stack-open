//import logo from './logo.svg';
import './App.css';
import React,{useState,useEffect} from 'react';
import Name from './components/name';
import Filter from './components/filter';
import AddForm from './components/addform';
import nameService from './services/communication';
//import { names } from 'debug';

const App = () => {
  const [persons,setPersons] = useState([]);
  const [newName,setNewName] =useState('');
  const [newNumber,setNewNumber] =useState('');
  const [search,setSearch] =useState('');

  useEffect(() => {
    nameService
    .getAll()
    .then(intialData => {
      setPersons(intialData)
    })
  },[])

  const addPerson = (event) => {
    event.preventDefault();
    const match = persons.find((person) =>(person.name === newName))
    if(match){
      const confirm = window.confirm
      (`${newName} is already added to phonebook,do you want to replace old number with new number`)
      if(confirm){
        const updatePerson = {...match,number:newNumber}
        const id = match.id
        nameService.update(id,updatePerson)
        .then((returnedData) =>{
        console.log(`${returnedData.name} is updated`)
        setPersons(persons.map(person => person.id !== id? person: returnedData))
        setNewName('')
        setNewNumber('')
      })
    } }

    const nameObject = {
      name:newName,
      number:newNumber
    }
    nameService.create(nameObject)
    .then(returnedData => {
      setPersons(persons.concat(returnedData))
      setNewName('')
      setNewNumber('')
    })    
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

    const deleteContact = (id) => {
      const person = persons.filter(person => person.id === id)
      const personName = person[0].name
      if(window.confirm(`Are you sure want to delete contact ${personName}`))
      {
        nameService.remove(id)  
        console.log(`${id} is deleted`)
        setPersons(persons.filter(person => person.id !== id))     }
      }

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter setSearch={setSearch}/>
      <AddForm onSubmit={addPerson} newName={newName} addNewName={addNewName} newNumber={newNumber} addNewNumber={addNewNumber}/>
      <h2> Numbers </h2>
      {nameToShow.map ((person) => <Name key={person.name} person={person} deleteContact={deleteContact}/>)}
    </div>
  )
}


export default App;
