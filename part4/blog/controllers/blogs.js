const blogRouter = require('express').Router()
const { response } = require('express')
const { request } = require('../app')
const Blog = require('../models/blog')


blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
        response.json(blogs)
  })
  
blogRouter.post('/', async(request, response, next) => {
    const body = request.body
    
    if(!body.likes){
      body.likes = 0
    }

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes
    })

    try { 
        const savedBlog = await blog.save()
        response.json(savedBlog)
    }   catch(exception) {
        next(exception)
      }
  })

blogRouter.delete('/:id',async(request,response) => {
  await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
} )

blogRouter.put('/:id',async (request,response,next) =>{
  const body = request.body

    const blog = {
      title:body.title,
      author:body.author,
      url:body.url,
      likes:body.likes
  }

    try{
       const updateBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
        response.json(updateBlog)
    }catch(exception){
        next(exception)
  }
})

  module.exports = blogRouter