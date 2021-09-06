const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const url = process.env.MONGODB_URI
console.log('Connecting to', url)

mongoose.connect(url, { })
  .then(result => {
    console.log('Connected to mongoDB')
  })
  .catch(error => {
    console.log('Error Connecting to Database')
  })

const contactSchema = new mongoose.Schema({
  name:{
    type:String,
    minlength:3,
    required:true,
    unique:true
  } ,
  number:{
    minlength:8,
    type:Number,
    required:true
  }
})

contactSchema.set('toJSON',{
  transform: (document,returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

contactSchema.plugin(uniqueValidator)
module.exports = mongoose.model('Person',contactSchema)