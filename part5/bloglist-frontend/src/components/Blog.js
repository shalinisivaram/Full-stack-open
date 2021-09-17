import React, { useState } from 'react'

const Blog = ({ blog,updateblog,deleteblog,blogUser }) => {
  const[blogObject,setBlogObject] = useState(blog)
  const [Visible,setVisible]= useState(false)
  const blogDetailsVisible = { display:Visible?'':'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleVisibility =() => {
    setVisible(!Visible)
  }

  const removeBlog = () => {
    deleteblog(blog)
  }

  const increaseLikes = () => {
    const updatedblog = ({
      ...blog,
      likes:blog.likes+1
    })
    updateblog(updatedblog)
    setBlogObject(updatedblog)
  }
  const buttonLabel = Visible?'hide':'show'

  console.log('bloguser',blog.user)
  return(
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author} <button onClick={toggleVisibility}>{buttonLabel}</button>
      </div>
      <div style={blogDetailsVisible}>
        {blog.url} <br/>
       Likes: {blogObject.likes} <button onClick={increaseLikes}>like</button>
      </div>
      <div>
        {blogUser === blog.user.username && (<button onClick={removeBlog}>Remove</button>)}

      </div>

    </div>
  )
}

export default Blog