const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const app = require('../app')
const supertest = require('supertest')
const helper = require('./test-helper')
const api = supertest(app)
const User = require('../models/user')

beforeEach(async() => {
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('secret',10)
    const user = new User({username:'shalini',passwordHash})
    await user.save()
})
jest.setTimeout(10000000)

describe('when there is intially one user in db',() =>{
    test('creation of successfull user',async() => {
        userAtStart = await helper.userInDb()

        const newUser ={
            username:"sivaram",
            name:"sivaramSB",
            password:'shalins'
        } 
        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const userAtEnd = await helper.userInDb()
        expect(userAtEnd).toHaveLength(userAtStart.length+1)

        const usernames = userAtEnd.map(u => u.username)
        expect (usernames).toContain(newUser.username)
    })

    test('creation of username have to unique',async() => {
        const userAtStart = await helper.userInDb()

        newuser={
            username:'shalini',
            name:'shalinS',
            password:'dhjkbcn'
        }
        const result = await api
            .post('/api/users')
            .send(newuser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        expect(result.body.error).toContain('`username` to be unique')

        const userAtEnd = await helper.userInDb()
        expect(userAtEnd).toHaveLength(userAtStart.length)
    })

    test('creation of username less than min length',async() => {
        const userAtStart = await helper.userInDb()

        newuser={
            username:'sh',
            name:'shalinS',
            password:'dhjkbcn'
        }
        const result = await api
            .post('/api/users')
            .send(newuser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        expect(result.body.error).toContain('Path `username` (`sh`) is shorter than the minimum allowed length (3)')

        const userAtEnd = await helper.userInDb()
        expect(userAtEnd).toHaveLength(userAtStart.length)
    })
})
