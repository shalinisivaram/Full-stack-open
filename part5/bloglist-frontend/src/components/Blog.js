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
      <div className="blogList">
        {blog.title} -{blog.author} <button id="fullBlog" onClick={toggleVisibility}>{buttonLabel}</button>
      </div>
      <div style={blogDetailsVisible} className={'blogDetails'}>
        {blog.url} <br/>
        <div id="like">
        Likes: {blogObject.likes} <button id="likes" onClick={increaseLikes}>like</button>
        </div>
      </div>
      <div>
        {blogUser === blog.user.username && (<button id="remove-button" onClick={removeBlog}>Remove</button>)}

      </div>

    </div>
  )
}

export default Blog