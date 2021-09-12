const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { userExtracter } = require('../utils/middleware')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user',{username:1,name:1})
        response.json(blogs)
  })
  
blogRouter.post('/', userExtracter,async(request, response, next) => {
    const body = request.body
    const userobj = request.user
    const user = await User.findById(userobj.id)

    if(!body.likes){
      body.likes = 0
    }

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user:user._id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.json(savedBlog)
  })

blogRouter.delete('/:id',async(request,response) => {
  const token = request.token
  const decodedToken = jwt.verify(token,process.env.SECRET)
  const user = await User.findById(decodedToken.id)

  const blog = await Blog.findById(request.params.id)
  
  if(blog.user._id.toString() === user._id.toString()){
    try{
      await Blog.findByIdAndRemove(request.params.id)
      response.status(204).end()
    }catch(exception){
      next(exception)
    }
  }else{
    return response.status(401).json({error:`unauthorized`})
  }
})

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