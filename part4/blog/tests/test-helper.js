const Blog = require('../models/blog')
const User = require('../models/user')

const intialBlogs = [
    {
        title: "blogs for test",
        author: "shalini",
        url: "https://www.google.co.in/",
        likes: 9,
    },
    {
        title: "intialblogs to add",
        author: "sivaram",
        url: "https://www.mozilla.org/en-US/firefox/new/",
        likes: 12,
    }
]
const blogsInDb = async () => {
    const blogs = await Blog.find({}) 
    return blogs.map(blog => blog.toJSON())
}

const userInDb = async() => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

module.exports={
    intialBlogs,
    blogsInDb,
    userInDb
}
