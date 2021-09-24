import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/notification'
import Error from './components/error'
import BlogForm from './components/blogForm'
import Togglable from './components/togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message,setMessage] = useState(null)
  const [errormessage,setErrormessage] = useState(null)
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
  const [user,setUser]=useState(null)

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username <input type="text" value={username} id="username"
          onChange={({ target }) => setUsername(target.value)}/>
      </div>
      <br />
      <div>
        password <input type="password" value={password} id="password"
          onChange={({ target }) => setPassword(target.value)}/>
      </div>
      <button id="login-button" type="submit">Login</button>
    </form>
  )

  const blogForm = () => (
    <Togglable buttonLabel='create a blog'>
      <BlogForm createBlog={addBlog}/>
    </Togglable>
  )

  const handleLogin = async (event) => {
    event.preventDefault()
    try{
      const user = await loginService.login({ username,password })
      window.localStorage.setItem('loggedUser',JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    }
    catch(exception){
      setErrormessage('wrong credentials')
      setTimeout(() => {
        setErrormessage(null)
      },5000)
    }
  }
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  const addBlog = async (blogObject) => {
    try{
      const createdBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(createdBlog))
      setMessage(`a new blog ${createdBlog.title} by ${createdBlog.author} added`)
      setTimeout(() => {
        setMessage(null)
      },5000)
    }catch(exception){
      setErrormessage('cannot add blog')
      setTimeout(() => {
        setErrormessage(null)
      },5000)
    }
  }

  const updateBlog = async(blogToUpdate) => {
    try{
      const updatedBlog = await blogService.update(blogToUpdate)
      setMessage(`${blogToUpdate.title} is updated successfully`)
      setBlogs(blogs.map(blog => blog.id !== blogToUpdate.id?blog:updatedBlog))
      setTimeout(() => {
        setMessage(null)
      },5000)
    }catch(exception){
      setErrormessage(`cannot update ${blogToUpdate.title}`)
      setTimeout(() => {
        setErrormessage(null)
      },5000)
    }
  }

  const deleteBlog = async(blogToDelete) => {
    try{
      if(window.confirm(` are you sure want to delete ${blogToDelete.title}`)){
        blogService.remove(blogToDelete.id)
        setBlogs(blogs.filter(blog => blog.id !== blogToDelete.id))
        setMessage(`${blogToDelete.title} is deleted successfully`)
        setTimeout(() => {
          setMessage(null)
        },5000)
      }
    }catch(exception){
      setErrormessage(`${blogToDelete.title} is not deleted`)
      setTimeout(() => {
        setErrormessage(null)
      },5000)
    }
  }

  const handleLogout = async(event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort((a,b) => b.likes - a.likes))
    )
  }, [])

  if(user === null){
    return(
      <div>
        <h2>login to the application</h2>
        <Error error={errormessage}/>
        {loginForm()}</div>
    )
  }
  return(
    <div>
      <h2>blogs</h2>
      <Notification message = {message}/>
      <Error error={errormessage}/>
      <h3> {user.username} logged-in </h3>
      <button id="logOut" type='submit' onClick={handleLogout}>LogOut</button> <br />
      {blogForm()}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} updateblog={updateBlog} deleteblog={deleteBlog}
          blogUser={user.username}/>
      )}
    </div>
  )
}



export default App