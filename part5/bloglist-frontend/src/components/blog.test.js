import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render,fireEvent } from '@testing-library/react'
import Blog from './Blog'
import BlogForm from './blogForm'

let blog
beforeEach(() =>{
        blog = {
        title: "hello this is frontend test",
        author: "shalu",
        url: "www.google.com",
        likes: 0,
        user: {
            username: "orange"
        }
    }
})

test('blog title and author display by default', () => {
    const component = render(
        <Blog blog={blog}/>
    )
    expect(component.container).toHaveTextContent
    ('hello this is frontend test')
})

test('after clicking button blog details are visible',() => {
    const component = render(
        <Blog blog={blog}/>
    )
    const button = component.getByText('show')
    fireEvent.click(button)
    expect(component.container).toHaveTextContent("www.google.com")
    expect(component.container).toHaveTextContent('0')

})

test('when like button click twice event handler called twice',() => {
    const updateHandler = jest.fn()

    const component = render(
        <Blog blog={blog} updateblog={updateHandler}/>
    )

    let likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(updateHandler.mock.calls).toHaveLength(2)
})

test('create blog form',() =>{
    const createHandler = jest.fn()

    const component = render(<BlogForm createBlog=
        {createHandler}/>
    )
    const titleInput = component.container.querySelector('#title')
    const authorInput = component.container.querySelector('#author')
    const form = component.container.querySelector('form')

    fireEvent.change(titleInput,{
        target:{value: 'hello react framework'}
    })

    fireEvent.change(authorInput,{
        target:{value: 'shain'}
    })
    fireEvent.submit(form)
    expect(createHandler.mock.calls).toHaveLength(1)
    expect(createHandler.mock.calls[0][0].title).toBe('hello react framework')
    expect(createHandler.mock.calls[0][0].author).toBe('shain')  
})
