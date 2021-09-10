const { request, response } = require('express')
const logger = require('./logger')

const requestLogger = (request, response, next) => {
    logger.info('Method:', request.method)
    logger.info('Path:  ', request.path)
    logger.info('Body:  ', request.body)
    logger.info('---')
    next()
  }

const unKnownEndpoint = (request,response) => {
    response.status(404).send({'error':'unkown endpoint'})
}

const errorHandler = (error,request,response,next)=> {
    logger.error(error.message)

    if(error.name === 'ValidationError'){
        return response.status(400).json({error:error.message})
    }
    next(error)
}


module.exports = {
    requestLogger,unKnownEndpoint,errorHandler
}