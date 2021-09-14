import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/notification'
import Error from './components/error'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [title,setTitle] = useState('')
  const [author,setAuthor]= useState('')
  const [message,setMessage] = useState(null)
  const [url,setUrl]=useState('')
  const [errormessage,setErrormessage] = useState(null)
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
  const [user,setUser]=useState(null)
 
  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username <input type="text" value={username} name="username"
        onChange={({target}) => setUsername(target.value)}/>
      </div>
      <br />
      <div>
        password <input type="password" value={password} name="password"
        onChange={({target})=> setPassword(target.value)}/>
      </div>
      <button type="submit">Login</button>
    </form> 
  )
  

  const blogForm = () => (
    <form onSubmit = {addBlog}>
     Title: <input value={title} name="title" onChange={({target})=> setTitle(target.value)}/> <br/> <br/> 
     Author: <input value={author} name="author" onChange={({target})=> setAuthor(target.value)}/> <br/> <br/> 
     Url: <input value={url} name="url" onChange={({target})=> setUrl(target.value)}/><br/> <br/> 
     <button type="submit">Add Blog</button>
    </form>
  )

  const handleLogin = async (event) =>{
    event.preventDefault()
    try{
      const user = await loginService.login({username,password})
      window.localStorage.setItem('loggedUser',JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch(exception){
      setErrormessage('wrong credentials')
      setTimeout(() => {
        setErrormessage(null)
      },5000)
    }
  }

  const addBlog = async(event) => {
    event.preventDefault()
    const blogObject = {
      title:title,
      author:author,
      url:url
    }
    setTitle('')
    setAuthor('')
    setUrl('')

    try{
      const createdBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(createdBlog))
      setMessage(`a new blog ${createdBlog.title} by ${createdBlog.author} added`)
      setTimeout(()=>{
        setMessage(null)
      },5000)
      }catch(exception){
      setErrormessage('cannot add blog')
      setTimeout(()=>{
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
      setBlogs( blogs )
    )  
  }, [])

    if(user === null){
      return(
        <div>
        <h2>login to the application</h2>
        {loginForm()}</div>
      )
    }
    return(
      <div>
      <h2>blogs</h2>
      <Notification message = {message}/>
      <Error error={errormessage}/>
      <h3> {user.username} logged-in </h3>
      <button type='submit' onClick={handleLogout}>LogOut</button> <br />
      {blogForm()}
      {blogs.map(blog =>
      <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

    

export default App