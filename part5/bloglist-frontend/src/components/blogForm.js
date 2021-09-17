import React,{ useState } from'react'

const BlogForm = ({ createBlog }) => {
  const [title,setTitle] = useState('')
  const [author,setAuthor]= useState('')
  const [url,setUrl]=useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title:title,
      author:author,
      url:url
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }
  return(
    <form onSubmit = {addBlog}>
    Title: <input value={title} name="title" onChange={({ target }) => setTitle(target.value)}/> <br/> <br/>
    Author: <input value={author} name="author" onChange={({ target }) => setAuthor(target.value)}/> <br/> <br/>
    Url: <input value={url} name="url" onChange={({ target }) => setUrl(target.value)}/><br/> <br/>
      <button type="submit">Add Blog</button>
    </form>
  )}

export default BlogForm