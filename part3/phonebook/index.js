require('dotenv').config()
const http = require('http')
const express = require('express')
const { response, request } = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
app.use(express.json())
app.use(cors())

app.use(express.static('build'))
const Person = require('./models/contact')
const { nextTick } = require('process')


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

app.get("/api/persons",(request,response) => {
    Person.find({}).then(people => {
        response.json(people)
    })
})


const d = new Date()
app.get("/info",(request,response) =>{
    persons = Person.find({}).then(persons =>{
        response.send(`
                <p>Phonebook has info for ${persons.length} people</p>
                <p> ${d}</p>
        `)
    })   
})

app.get("/api/persons/:id",(request,response,next) => {
    Person.findById(request.params.id)
        .then(person =>{
            if(person){
                response.json(person)
            } else {
                response.status(404).end()
            } 
        })
        .catch(error => next(error))
        })

app.delete("/api/persons/:id",(request,response, next) => {
    Person.findByIdAndRemove(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
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
    
    const newPerson = new Person({
        id:generateId,
        name:body.name,
        number:body.number,
    })
    newPerson.save().then(savedContact => {
        response.json(savedContact)
    })
})  

app.put("/api/persons/:id",(request,response,next) => {
    const body = request.body

    const person = {
        name:body.name,
        number:body.number
    }
    Person.findByIdAndUpdate(request.params.id,person,{new:true})
        .then(updatedPerson => {
            response.json(updatedPerson.toJSON())
        })
        .catch(error => next(error))
})

const unknownEndpoint = (request,response) => {
    response.status(404).send({
        Error:'unknown endpoint'
    })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) =>{
    console.log(error.message)

    if (error.name === 'CastError'){
        return response.status(400).send({error:"malformatted id"})
    }
    next(error)
}
    

app.use(errorHandler)

const PORT = process.env.PORT 
app.listen(PORT,() => {
  console.log(`server running in the port ${PORT}`)
})
