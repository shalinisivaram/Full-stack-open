const mongoose = require("mongoose")

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://shaliniFOP:${password}@cluster0.u4rmj.mongodb.net/contact?retryWrites=true&w=majority`

mongoose.connect(url, { })

const contactSchema = new mongoose.Schema({
    name: String,
    number: Number
})

const Person = mongoose.model('Person',contactSchema)

if(process.argv.length === 5){
    const person = new Person({
        name: name,
        number : number
    })
    person.save().then(result => {
        console.log(`added ${person.name} number ${person.number} to phonebook`)
        mongoose.connection.close()
    })
}


else if(process.argv.length === 3){
    Person.find({})
    .then(result => {
        console.log('phonebook:')
        result.forEach(person => {
            console.log( 
                 `${person.name} ${person.number}` )   
        });
        mongoose.connection.close()
    })
}