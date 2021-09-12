const logger = require('./logger')
const jwt = require('jsonwebtoken')
const { request, response } = require('express')

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
    else if(error.name === 'JsonWebTokenError'){
      return response.status(401).json({error:"invalid token"})
    }
    else if(error.name === "TokenExpiredError"){
      return response.status(401).json({error:'token expired'})
    }
    next(error)
}

const tokenExtracter = (request,response,next) => {
  const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      request["token"]=authorization.substring(7)
    }
    next()
  }

const tokenValidator = (request,response,next) => {
  const token = request.token
  const decodedToken =jwt.verify(token,process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  next()
}

const userExtracter = (request,response,next) => {
  const token = request.token
  const decodedToken = jwt.verify(token,process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }else{
    request.user = decodedToken
  }
  next()
}


module.exports = {
    requestLogger,unKnownEndpoint,errorHandler,tokenExtracter,tokenValidator,
    userExtracter
}