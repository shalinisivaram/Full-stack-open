const bcrypt = require('bcrypt')
const { response } = require('express')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/',async(request,response) => {
    const users = await User.find({}).populate('blogs')
    response.json(users)
})
usersRouter.post('/', async(request,response) => {
    const body = request.body
    const passwordHash = await bcrypt.hash(body.password,10)

    const user = new User({
        username:body.username,
        name:body.name,
        passwordHash
    })

    const savedUser = await user.save()
    response.json(savedUser)
})
module.exports = usersRouter