const http = require('http')
const express = require('express')
const { response } = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
app.use(express.json())
app.use(cors())

app.use(express.static('build'))

const requestLogger = morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms',
      JSON.stringify(req.body)
    ].join(' ')
  })
app.use(requestLogger)

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

const unknownEndpoint = (request,response) => {
    response.status(404).send({
        Error:'unknown endpoint'
    })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT,() => {
  console.log(`server running in the port ${PORT}`)
})
