
const config = require('./utils/config')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
const express = require('express')
require('express-async-errors')
const app = express()
const blogRouter = require('./controllers/blogs')
const cors = require('cors')
const middleWare = require('./utils/middleware')


logger.info("Connecting to",config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, {})
    .then(result => {
        logger.info("connected to mongodb")
    })
    .catch(error => {
        logger.error("Error connecting to mongodb")
        console.log(error);
    })

app.use(cors())
app.use(express.json())
app.use(middleWare.requestLogger)
app.use('/api/blogs',blogRouter)
app.use(middleWare.unKnownEndpoint)
app.use(middleWare.errorHandler)

module.exports = app