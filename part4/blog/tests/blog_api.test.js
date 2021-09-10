const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test-helper')
const api = supertest(app)


beforeEach(async() => {
    await Blog.deleteMany({})

    let blogObject = new Blog(helper.intialBlogs[0])
    await blogObject.save()

    blogObject = new Blog(helper.intialBlogs[1])
    await blogObject.save()
})

test('blogs are returned as json',async() => {
    await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type',/application\/json/)
})

test('all blogs are returned',async() => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.intialBlogs.length)
})

test('unique validator for blog is defined', async() => {
    const blogs = await Blog.find({})
    expect(blogs[0]._id).toBeDefined()
})


test('a valid blog is added', async() => {
    const newBlog = {
        title: "new blogs to add test",
        author: "viyas",
        url: "https://www.mozilla.org/en-US/firefox/new/",
        likes: 19,
    }
    await api 
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const response = await helper.blogsInDb()
       
    const contents = response.map(b => b.title)
    expect(response).toHaveLength(helper.intialBlogs.length+1)
    expect(contents).toContain('new blogs to add test')
})

test('like property set default to zero', async() => {
    const newBlog = {
        title: "like property",
        author: "viyas",
        url: "https://www.google.com",
    }
    await api 
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const response = await helper.blogsInDb()  
    const contents = await response.find(b => b.title === 'like property')
    expect(contents.likes).toBe(0)

}) 

test('title and url is required ', async() => {
    const newBlog = {
        author: "harshith",
        likes:20
    }
    await api 
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

    const response = await helper.blogsInDb()  
    expect(response).toHaveLength(helper.intialBlogs.length)

}) 

afterAll(() => {
    mongoose.connection.close()
})