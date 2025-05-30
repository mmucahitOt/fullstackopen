import { useState } from 'react'
import { createBlog } from '../../../../services/blogService'
import BlogForm from './components/BlogForm'

const BlogCreate = ({ user, refetchBlogs, handleNotification }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreateBlog = async(event) => {
    event.preventDefault()
    try {
      const response = await createBlog({ token: user.token, title, author, url })
      console.log(response)
      await refetchBlogs()
      handleNotification({ message: 'Blog created successfully', type: 'success' })
    } catch (error) {
      console.log(error)
      handleNotification({ message: error.response.data.error, type: 'error' })
    }
  }
  return <BlogForm formTitle='Create Blog' formProps={{ onSubmit: handleCreateBlog }} buttonText='Create Blog' buttonProps={{ type: 'submit' }} title={title} author={author} url={url} setTitle={setTitle} setAuthor={setAuthor} setUrl={setUrl} />
}

export default BlogCreate