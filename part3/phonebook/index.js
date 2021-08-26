const http = require('http')
const express = require('express')
const app = express()

app.use(express.json())
let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get("/api/persons",(request,response) => {
    response.json(persons)
})

const totalPerson =persons.length
const d = new Date()
app.get("/info",(request,response) =>{
    response.send(`Phonebook has info for ${totalPerson} people 
    ${d}`) 
    
})

app.get("/api/persons/:id",(request,response) => {
    const id = Number(request.params.id)
    const person = persons.find(p => p.id === id)

    if(person){
        response.json(person)
    }
    else{
        response.status(404).end()
    }
})

app.delete("/api/persons/:id",(request,response) => {
    const id = request.params.id
    persons = persons.filter(p => p.id !== id)
    response.status(204).end()
})

const generateId = Math.floor(Math.random()*1000)

app.post("/api/persons",(request,response) =>{
    const body = request.body

    if(!body.number) {
        return response.status(400).json({
            Error:"Contact number missing"
    })
    }else if(!body.name){
        return response.status(400).json({
            Error:"Person name missing"
    })
}
    
    const newPerson = {
        id:generateId,
        name:body.name,
        number:body.number,
    } 
    const match = persons.find
    (p => p.name.toLowerCase() === newPerson.name.toLowerCase())
    
    if(match){
        return response.status(400).json({
            Error:"Person name already exist"
        })
    }
    persons = persons.concat(newPerson)
    response.json(newPerson)
})  


const PORT = 3000
app.listen(PORT)
console.log(`app running in the port ${PORT}`)